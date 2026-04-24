# Parkside Advisory Group — Web Integration Guide

This document provides developers with the technical specifications needed to implement the Parkside brand identity on the web.

## 1. Global CSS Variables
Add these to your primary stylesheet (e.g., `globals.css` or `index.css`) to maintain color consistency across the site.

```css
:root {
  /* Brand Primary Colors */
  --parkside-burgundy: #7A1F2B;
  --parkside-gold: #B08A3E;
  --parkside-gold-light: #C9A765; /* Optimal for dark-mode accents */

  /* Neutral Palette */
  --parkside-ink: #1A1613;       /* Primary Body Text */
  --parkside-ink-soft: #3A3430;  /* Secondary Text / Captions */
  --parkside-cream: #F6F1E8;     /* Primary Background / Paper */
  --parkside-cream-deep: #EEE7D7; /* Deeper cream for card surfaces and alternating sections */
  --parkside-dark: #141210;      /* Dark Mode / Inverted Background */
}
```

## 2. Typography Specification
The Parkside brand utilizes a high-contrast pairing of a classic serif and a high-legibility sans-serif.

### Import
Add this import at the top of your CSS file:
```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Usage
- **Wordmark & Primary Headings**: Use `Newsreader` (Weight 500). Never italic in headlines.
- **UI, Taglines, & Labels**: Use `Inter Tight` (Weight 500 or 600) with `text-transform: uppercase` and `letter-spacing: 0.22em`.
- **Captions, Metadata & Document References**: Use `JetBrains Mono` (Weight 400 or 500). Reserved for footnotes, timestamps, case references, and data labels. Never for body copy.

## 3. Brand Assets (SVG)
Vector assets are located in the following directories. Use them as `<img>` tags or inline SVGs.

- **Primary Logo**: `/02_Primary_Logos/parkside-horizontal-light.svg` (Top navigation)
- **Secondary Logo**: `/02_Primary_Logos/parkside-stacked-light.svg` (Footer / Centered hero)
- **Favicon**: `/06_App_Icons_and_Metadata/favicon.svg`
- **Social Media Icon**: `/06_App_Icons_and_Metadata/apple-touch-icon.png` (Draft from legacy assets)

## 4. Logo Scaling Protocol
All SVGs in this kit are optimized with embedded styles.
- **Horizontal Lockups**: Best used at heights between `32px` and `56px`.
- **Favicons**: The 3-bar "Mark" remains legible at sizes as small as `16px`.
- **Safety Margin**: Always maintain a clear space around the logo equal to the x-height of the wordmark "Parkside".
