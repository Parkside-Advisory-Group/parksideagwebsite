const BOOKING_ENV = "NEXT_PUBLIC_BOOKING_URL";

/**
 * Public scheduling URL for a 20-minute conversation.
 * Set NEXT_PUBLIC_BOOKING_URL to a Cal.com, Calendly, or similar https link.
 * Returns null when the variable is empty or not an http(s) URL, so the site
 * can hide the booking action until Anthony configures it.
 */
export function getBookingUrl(): string | null {
  const raw = process.env[BOOKING_ENV]?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const BOOKING_LABEL = "Book 20 minutes";
