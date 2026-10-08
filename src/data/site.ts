/**
 * Site-wide data.
 * Edit copy here only — page components hold no hardcoded marketing text.
 */

/**
 * Search engine indexing switch
 *
 * `false` = block all crawling (current)
 * `true`  = restore normal indexing
 */
export const INDEXING_ENABLED = false as const;

export const ROBOTS_META = INDEXING_ENABLED
  ? 'index, follow'
  : 'noindex, nofollow, noarchive, nosnippet, noimageindex';

export const SITE = {
  name: 'HCS',
  title: 'HCS — Continuous Industrial Heat Treatment Furnaces',
  tagline: 'Continuous Heat Treatment Furnaces',
  description:
    'HCS designs and manufactures continuous heat treatment furnaces — mesh belt, roller hearth, car bottom and pusher types — with documented temperature uniformity, full commissioning support and worldwide delivery.',
  /** Production domain, used for canonical / sitemap */
  url: 'https://www.jins.mokc.top',
  locale: 'en_US',
  lang: 'en',
  author: 'HCS',
  /** Email */
  email: 'jinstop365@gmail.com',
  /** 备案/统计用，无则留空 */
  icp: '',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Articles', href: '/notes' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL = [
  { label: 'Email', href: 'mailto:jinstop365@gmail.com', external: false },
] as const;

/** Home hero bullet points */
export const HERO_HIGHLIGHTS = [
  'Standard operating temperature up to 950 °C',
  'Work zone uniformity within ±5 °C, documented on request',
  'Four continuous furnace platforms, one engineering team',
  'Commissioning, operator training and lifetime spare parts support',
] as const;
