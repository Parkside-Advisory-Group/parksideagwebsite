"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

interface TrackedLinkProps extends LinkProps {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean>;
}

export function TrackedLink({ eventName, eventProperties, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, {
          href: typeof props.href === "string" ? props.href : props.href.toString(),
          ...eventProperties
        });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
