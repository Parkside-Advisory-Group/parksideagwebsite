import { BOOKING_LABEL, getBookingUrl } from "../lib/booking";

interface BookingLinkProps {
  className?: string;
  children?: string;
}

/** Renders nothing until NEXT_PUBLIC_BOOKING_URL is a real http(s) link. */
export function BookingLink({ className, children = BOOKING_LABEL }: BookingLinkProps) {
  const href = getBookingUrl();
  if (!href) return null;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${children}, opens scheduling in a new tab`}
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
