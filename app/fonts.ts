import { Playfair_Display, EB_Garamond } from 'next/font/google'
import localFont from 'next/font/local'

/**
 * Display serif. The design system substitutes Playfair Display for the brand's
 * Abril Fatface reference because Abril has no Vietnamese diacritics (verified:
 * 48 of 74 test glyphs missing). Playfair keeps the high-contrast editorial vibe
 * and ships a `vietnamese` subset.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

/**
 * Body serif. Big Caslon FB is the brand's stated body face but is also missing
 * 48 of 74 Vietnamese diacritics, so it cannot carry Vietnamese-default copy.
 * EB Garamond is the closest classic book serif with full Vietnamese coverage.
 * See `--font-body` / `--font-body-latin` in globals.css.
 */
export const ebGaramond = EB_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

/** Brand body face, kept for Latin-only surfaces. Not the default — see above. */
export const bigCaslon = localFont({
  src: './fonts/BigCaslonFB.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-big-caslon',
  display: 'swap',
})

/** Reserved strictly for the "Glow" wordmark — never headings or body. */
export const ahsing = localFont({
  src: './fonts/Ahsing.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-ahsing',
  display: 'swap',
})

export const fontVariables = [
  playfairDisplay.variable,
  ebGaramond.variable,
  bigCaslon.variable,
  ahsing.variable,
].join(' ')
