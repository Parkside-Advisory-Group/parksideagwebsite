// Parkside Advisory Group — refined logo directions
// Each direction: { mark, horizontal, stacked, wordmarkOnly, notes }
// Palette (lifted and slightly tuned from original):
//   Burgundy:  #7A1F2B (original was close to #7F1D27 — warmed slightly)
//   Gold:      #B08A3E (original ~#B5944D — desaturated for quiet luxury)
//   Ink:       #1A1613 (warm near-black, not pure #000)
//   Cream:     #F6F1E8 (warm paper)
//   Dark:      #141210 (for dark mode bg)

const PAL = {
  burgundy: '#7A1F2B',
  burgundyDeep: '#5E141D',
  gold: '#B08A3E',
  goldLight: '#C9A765',
  ink: '#1A1613',
  inkSoft: '#3A3430',
  cream: '#F6F1E8',
  dark: '#141210',
  paper: '#FFFFFF',
};

// Google font families we use, grouped
const FONTS = {
  serifDisplay: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  serifClassic: "'Libre Caslon Text', 'Caslon', Georgia, serif",
  sansGeometric: "'Manrope', 'Helvetica Neue', Arial, sans-serif",
  sansGrotesk: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  sansNeo: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
};

// ─────────────────────────────────────────────────────────────
// Direction 01 — "Refined Original"
// Keeps the 3-bar growth mark but:
//   - uniform slanted bars (not tapered perspective)
//   - tighter, architectural proportions
//   - serif wordmark (Cormorant) with open-spaced sans tagline
//   - divider removed (was fussy at small sizes)
// ─────────────────────────────────────────────────────────────

function Mark01({ burgundy = PAL.burgundy, gold = PAL.gold, size = 100 }) {
  // 3 bars ascending, unified slant, gold baseline
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <g>
        {/* bars with consistent slant — top edge slopes up at same angle */}
        <path d="M 18 88 L 18 62 L 36 56 L 36 88 Z" fill={burgundy}/>
        <path d="M 46 88 L 46 50 L 64 44 L 64 88 Z" fill={burgundy}/>
        <path d="M 74 88 L 74 38 L 92 32 L 92 88 Z" fill={burgundy}/>
        {/* gold baseline */}
        <rect x="14" y="94" width="82" height="3" fill={gold}/>
      </g>
    </svg>
  );
}

function Horizontal01({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Mark01 burgundy={burg} gold={gold} size={86}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 44, lineHeight: 1, color: textColor, letterSpacing: '-0.01em' }}>Parkside</div>
          <div style={{ fontFamily: FONTS.sansGeometric, fontWeight: 500, fontSize: 10.5, letterSpacing: '0.28em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
        </div>
      </div>
    </div>
  );
}

function Stacked01({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Mark01 burgundy={burg} gold={gold} size={96}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 38, lineHeight: 1, color: textColor, letterSpacing: '-0.01em' }}>Parkside</div>
        <div style={{ fontFamily: FONTS.sansGeometric, fontWeight: 500, fontSize: 9.5, letterSpacing: '0.28em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
      </div>
    </div>
  );
}

function Wordmark01({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 52, lineHeight: 1, color: textColor, letterSpacing: '-0.01em' }}>Parkside</div>
      <div style={{ fontFamily: FONTS.sansGeometric, fontWeight: 500, fontSize: 11, letterSpacing: '0.3em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction 02 — "Monogram P"
// A burgundy serif 'P' capital in a gold square frame.
// Growth idea is retained via ascending gold serifs on a simplified bar.
// ─────────────────────────────────────────────────────────────

function Mark02({ burgundy = PAL.burgundy, gold = PAL.gold, size = 100 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* gold rule frame */}
      <rect x="6" y="6" width="108" height="108" fill="none" stroke={gold} strokeWidth="2"/>
      {/* burgundy serif P */}
      <text x="60" y="86" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500" fontSize="92" fill={burgundy} fontStyle="italic">P</text>
    </svg>
  );
}

function Horizontal02({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Mark02 burgundy={burg} gold={gold} size={82}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 32, lineHeight: 1, color: textColor, letterSpacing: '0.02em' }}>PARKSIDE</div>
          <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 11, letterSpacing: '0.24em', color: tag, textTransform: 'uppercase', fontStyle: 'italic' }}>Advisory Group</div>
        </div>
      </div>
    </div>
  );
}

function Stacked02({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <Mark02 burgundy={burg} gold={gold} size={90}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 28, lineHeight: 1, color: textColor, letterSpacing: '0.02em' }}>PARKSIDE</div>
        <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 10, letterSpacing: '0.24em', color: tag, textTransform: 'uppercase', fontStyle: 'italic' }}>Advisory Group</div>
      </div>
    </div>
  );
}

function Wordmark02({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 38, lineHeight: 1, color: textColor, letterSpacing: '0.04em' }}>PARKSIDE</div>
      <div style={{ width: 40, height: 1, background: gold }}/>
      <div style={{ fontFamily: FONTS.serifClassic, fontWeight: 400, fontSize: 11, letterSpacing: '0.3em', color: tag, textTransform: 'uppercase', fontStyle: 'italic' }}>Advisory Group</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction 03 — "Three Bars, Refined"
// Stays closest to the original. Replaces the slanted-perspective
// bars with clean rectangles of ascending height. Gold underline
// integrated. Modern grotesk wordmark (Space Grotesk) tightens everything.
// ─────────────────────────────────────────────────────────────

function Mark03({ burgundy = PAL.burgundy, gold = PAL.gold, size = 100 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* three solid rectangles, ascending; tops trace a 15° slope visually */}
      <rect x="18" y="62" width="18" height="28" fill={burgundy}/>
      <rect x="46" y="48" width="18" height="42" fill={burgundy}/>
      <rect x="74" y="34" width="18" height="56" fill={burgundy}/>
      <rect x="14" y="94" width="82" height="2.5" fill={gold}/>
    </svg>
  );
}

function Horizontal03({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <Mark03 burgundy={burg} gold={gold} size={76}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 500, fontSize: 36, lineHeight: 1, color: textColor, letterSpacing: '-0.02em' }}>Parkside</div>
          <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 400, fontSize: 10.5, letterSpacing: '0.22em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
        </div>
      </div>
    </div>
  );
}

function Stacked03({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Mark03 burgundy={burg} gold={gold} size={88}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 500, fontSize: 32, lineHeight: 1, color: textColor, letterSpacing: '-0.02em' }}>Parkside</div>
        <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.22em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
      </div>
    </div>
  );
}

function Wordmark03({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 500, fontSize: 46, lineHeight: 1, color: textColor, letterSpacing: '-0.02em' }}>Parkside</div>
      <div style={{ fontFamily: FONTS.sansGrotesk, fontWeight: 400, fontSize: 11, letterSpacing: '0.24em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction 04 — "Archway"
// Mark becomes an abstract "park-side" — a gold arch over a burgundy
// rectangle, suggesting both a park pavilion and steady growth.
// More distinctive; less literal than bars. Warmer, boutique feel.
// ─────────────────────────────────────────────────────────────

function Mark04({ burgundy = PAL.burgundy, gold = PAL.gold, size = 100 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* burgundy circle background */}
      <circle cx="60" cy="60" r="48" fill={burgundy}/>
      {/* gold ascending bars inside the circle */}
      <g fill={gold}>
        <rect x="36" y="68" width="8" height="18"/>
        <rect x="50" y="58" width="8" height="28"/>
        <rect x="64" y="48" width="8" height="38"/>
        <rect x="78" y="38" width="8" height="48"/>
      </g>
      {/* gold baseline */}
      <rect x="34" y="90" width="54" height="2" fill={gold}/>
    </svg>
  );
}

function Horizontal04({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? (inverted ? PAL.dark : PAL.gold) : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <Mark04 burgundy={inverted ? PAL.burgundy : PAL.burgundy} gold={PAL.gold} size={80}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 34, lineHeight: 1, color: textColor, letterSpacing: '-0.025em' }}>Parkside</div>
          <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 400, fontSize: 11, letterSpacing: '0.2em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
        </div>
      </div>
    </div>
  );
}

function Stacked04({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <Mark04 size={94}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 30, lineHeight: 1, color: textColor, letterSpacing: '-0.025em' }}>Parkside</div>
        <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 400, fontSize: 10, letterSpacing: '0.2em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
      </div>
    </div>
  );
}

function Wordmark04({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.7)' : PAL.inkSoft;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 46, lineHeight: 1, color: textColor, letterSpacing: '-0.025em' }}>Parkside</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 24, height: 1, background: gold }}/>
        <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 400, fontSize: 11, letterSpacing: '0.26em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
        <div style={{ width: 24, height: 1, background: gold }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Direction 05 — "Editorial"
// Most different: ditches the mark for a typographic solution.
// A burgundy serif "P." monogram (with period) + refined wordmark.
// For the growth idea: a single gold ascending underline beneath PARKSIDE.
// Feels like a private-advisory letterhead.
// ─────────────────────────────────────────────────────────────

function Mark05({ burgundy = PAL.burgundy, gold = PAL.gold, size = 100 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* cream circle with burgundy ring */}
      <circle cx="60" cy="60" r="54" fill="none" stroke={burgundy} strokeWidth="2.5"/>
      <circle cx="60" cy="60" r="44" fill="none" stroke={gold} strokeWidth="0.8"/>
      <text x="60" y="80" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500" fontSize="62" fill={burgundy}>P</text>
      <text x="92" y="80" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="500" fontSize="62" fill={gold}>.</text>
    </svg>
  );
}

function Horizontal05({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Mark05 burgundy={burg} gold={gold} size={78}/>
        <div style={{ width: 1, height: 54, background: inverted ? 'rgba(246,241,232,0.25)' : 'rgba(26,22,19,0.18)' }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 38, lineHeight: 1, color: textColor, letterSpacing: '0.005em', fontStyle: 'italic' }}>Parkside</div>
          <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 10, letterSpacing: '0.3em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
        </div>
      </div>
    </div>
  );
}

function Stacked05({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const burg = inverted ? PAL.goldLight : PAL.burgundy;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Mark05 burgundy={burg} gold={gold} size={90}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 34, lineHeight: 1, color: textColor, fontStyle: 'italic' }}>Parkside</div>
        <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 9.5, letterSpacing: '0.3em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
      </div>
    </div>
  );
}

function Wordmark05({ inverted = false }) {
  const bg = inverted ? PAL.dark : PAL.cream;
  const textColor = inverted ? PAL.cream : PAL.ink;
  const tag = inverted ? 'rgba(246,241,232,0.72)' : PAL.inkSoft;
  const gold = inverted ? PAL.goldLight : PAL.gold;
  return (
    <div style={{ background: bg, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <div style={{ fontFamily: FONTS.serifDisplay, fontWeight: 500, fontSize: 56, lineHeight: 1, color: textColor, fontStyle: 'italic' }}>Parkside<span style={{ color: gold }}>.</span></div>
      <div style={{ fontFamily: FONTS.sansNeo, fontWeight: 500, fontSize: 11, letterSpacing: '0.32em', color: tag, textTransform: 'uppercase' }}>Advisory Group</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────

const DIRECTIONS = [
  {
    id: '01',
    title: 'Refined Original',
    tagline: 'Serif wordmark · Unified 3-bar mark',
    notes: 'Closest to your current identity. Replaces the tapered/perspective bars with clean ascending bars under a gold baseline. Swaps the blocky sans for Cormorant (warmer, more advisory). Tagline letterspacing dialed in so it holds at small sizes.',
    Mark: Mark01,
    Horizontal: Horizontal01,
    Stacked: Stacked01,
    Wordmark: Wordmark01,
  },
  {
    id: '02',
    title: 'Bordered Monogram',
    tagline: 'Italic serif P · Gold-ruled frame',
    notes: 'Most classical, private-bank feel. The italic P evokes signature and stewardship. Framed mark reads as a seal or wax stamp — excellent on letterhead and business cards.',
    Mark: Mark02,
    Horizontal: Horizontal02,
    Stacked: Stacked02,
    Wordmark: Wordmark02,
  },
  {
    id: '03',
    title: 'Architectural Bars',
    tagline: 'Modern grotesk · Vertical rectangles',
    notes: 'Keeps your growth/bar-chart concept but squares it up — clean verticals, no perspective. Space Grotesk gives a contemporary, confident voice. Best at small sizes of the five.',
    Mark: Mark03,
    Horizontal: Horizontal03,
    Stacked: Stacked03,
    Wordmark: Wordmark03,
  },
  {
    id: '04',
    title: 'Circle Seal',
    tagline: 'Burgundy disc · Gold growth',
    notes: 'The mark becomes a contained seal — gold growth bars inside a burgundy disc. Distinctive silhouette at favicon size; photographs well on walls/signage.',
    Mark: Mark04,
    Horizontal: Horizontal04,
    Stacked: Stacked04,
    Wordmark: Wordmark04,
  },
  {
    id: '05',
    title: 'Editorial Mark',
    tagline: 'Italic serif with punctuation',
    notes: 'Most boutique / most editorial. The period after “Parkside” is a quiet declaration. Double-ring medallion for the mark reads as heritage without being ornate.',
    Mark: Mark05,
    Horizontal: Horizontal05,
    Stacked: Stacked05,
    Wordmark: Wordmark05,
  },
];

Object.assign(window, {
  PAL, FONTS, DIRECTIONS,
  Mark01, Horizontal01, Stacked01, Wordmark01,
  Mark02, Horizontal02, Stacked02, Wordmark02,
  Mark03, Horizontal03, Stacked03, Wordmark03,
  Mark04, Horizontal04, Stacked04, Wordmark04,
  Mark05, Horizontal05, Stacked05, Wordmark05,
});
