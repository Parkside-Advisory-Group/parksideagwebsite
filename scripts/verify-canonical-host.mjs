import dns from "node:dns/promises";
import https from "node:https";

const CANONICAL_HOST = "parksideag.com";
const WWW_HOST = "www.parksideag.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
const EXPECTED_VERCEL_A_RECORD = "76.76.21.21";
const SUCCESS_STATUS_MINIMUM = 200;
const SUCCESS_STATUS_MAXIMUM = 299;
const REDIRECT_STATUS_MINIMUM = 300;
const REDIRECT_STATUS_MAXIMUM = 399;
const REQUEST_TIMEOUT_MS = 10000;

const dnsResolvers = [
  { name: "Cloudflare", server: "1.1.1.1" },
  { name: "Google", server: "8.8.8.8" },
  { name: "Quad9", server: "9.9.9.9" },
  { name: "OpenDNS", server: "208.67.222.222" }
];

const monitoredPaths = ["/", "/robots.txt", "/sitemap.xml", "/llms.txt"];

async function resolveRecords(resolverConfig, host, recordType) {
  const resolver = new dns.Resolver();
  resolver.setServers([resolverConfig.server]);

  try {
    return await resolver.resolve(host, recordType);
  } catch (error) {
    if (error.code === "ENODATA" || error.code === "ENOTFOUND") {
      return [];
    }

    throw new Error(
      `${resolverConfig.name} (${resolverConfig.server}) failed ${recordType} lookup for ${host}: ${error.message}`
    );
  }
}

async function requestHead(url) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "HEAD",
        timeout: REQUEST_TIMEOUT_MS
      },
      (response) => {
        response.resume();
        resolve({
          statusCode: response.statusCode,
          location: response.headers.location || ""
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`));
    });

    request.on("error", reject);
    request.end();
  });
}

function assertSuccessfulResponse(url, statusCode) {
  if (statusCode < SUCCESS_STATUS_MINIMUM || statusCode > SUCCESS_STATUS_MAXIMUM) {
    throw new Error(`${url} returned HTTP ${statusCode}; expected a 2xx response.`);
  }
}

function assertRedirectToCanonical(statusCode, location) {
  if (statusCode < REDIRECT_STATUS_MINIMUM || statusCode > REDIRECT_STATUS_MAXIMUM) {
    throw new Error(`https://${WWW_HOST}/ returned HTTP ${statusCode}; expected a redirect.`);
  }

  if (location !== `${CANONICAL_ORIGIN}/`) {
    throw new Error(`https://${WWW_HOST}/ redirected to ${location}; expected ${CANONICAL_ORIGIN}/.`);
  }
}

async function verifyDns() {
  const failures = [];

  for (const resolverConfig of dnsResolvers) {
    for (const host of [CANONICAL_HOST, WWW_HOST]) {
      const [aRecords, aaaaRecords, cnameRecords] = await Promise.all([
        resolveRecords(resolverConfig, host, "A"),
        resolveRecords(resolverConfig, host, "AAAA"),
        resolveRecords(resolverConfig, host, "CNAME")
      ]);

      console.log(
        [
          `${resolverConfig.name} ${host}`,
          `A=${aRecords.join(",") || "none"}`,
          `AAAA=${aaaaRecords.join(",") || "none"}`,
          `CNAME=${cnameRecords.join(",") || "none"}`
        ].join(" ")
      );

      if (host === CANONICAL_HOST && !aRecords.includes(EXPECTED_VERCEL_A_RECORD)) {
        failures.push(
          `${resolverConfig.name} did not return Vercel A record ${EXPECTED_VERCEL_A_RECORD} for ${host}.`
        );
      }

      if (host === WWW_HOST && aRecords.length === 0 && cnameRecords.length === 0) {
        failures.push(`${resolverConfig.name} did not return A or CNAME records for ${host}.`);
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }
}

async function verifyHttp() {
  const redirectResponse = await requestHead(`https://${WWW_HOST}/`);
  assertRedirectToCanonical(redirectResponse.statusCode, redirectResponse.location);
  console.log(`https://${WWW_HOST}/ HTTP ${redirectResponse.statusCode} -> ${redirectResponse.location}`);

  for (const monitoredPath of monitoredPaths) {
    const url = `${CANONICAL_ORIGIN}${monitoredPath}`;
    const response = await requestHead(url);
    assertSuccessfulResponse(url, response.statusCode);
    console.log(`${url} HTTP ${response.statusCode}`);
  }
}

async function main() {
  await verifyDns();
  await verifyHttp();
  console.log("Canonical host, DNS, and crawler endpoints verified.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
