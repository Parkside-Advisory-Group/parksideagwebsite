import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand-link" href="/" aria-label="Parkside Advisory Group home">
          <svg className="brand-mark" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M 18 88 L 18 62 L 36 56 L 36 88 Z" />
            <path d="M 46 88 L 46 50 L 64 44 L 64 88 Z" />
            <path d="M 74 88 L 74 38 L 92 32 L 92 88 Z" />
            <rect x="14" y="94" width="82" height="3" />
          </svg>
          <span className="brand-copy">
            <span className="brand-word">Parkside</span>
            <span className="brand-tag">Advisory Group</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/services">Services</Link>
          <Link href="/blueprint">Blueprint</Link>
          <Link href="/use-cases">Use Cases</Link>
          <Link href="/about">About</Link>
          <Link className="btn" href="/intake">
            Start Blueprint
          </Link>
        </nav>
        <Link className="btn mobile-header-cta" href="/intake">
          Start
        </Link>
      </div>
    </header>
  );
}
