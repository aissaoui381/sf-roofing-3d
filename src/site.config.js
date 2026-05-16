// Single source of truth for brand + city strings.
//
// To clone this site for a new roofing domain:
//   1. Edit every field in this file.
//   2. Edit `index.html` — the static LCP shell contains the brand H1
//      and the JSON-LD schema. Vite cannot inject runtime config into
//      static HTML, so the two-line brand name, email, license #,
//      coordinates, and canonical URL must be updated by hand.
//   3. (Optional) edit `src/components/sections/Portfolio.jsx` and
//      ServicePage FAQ copy — those contain city-specific neighborhood
//      stories that don't follow a template.
//   4. Replace `public/hero-2.mp4` and `public/projects/*.webp` with
//      assets for the new city.
//   5. Update `public/sitemap.xml` and `public/robots.txt` host.
//
// Fields marked OPTIONAL are referenced in a subset of pages and can be
// safely changed without risk of broken references.

export const site = {
  brand: {
    name:        'San Francisco Roofing Service',
    shortBadge:  'SF',                             // Two-letter chip in the footer logo
    tagline:     'Complete Roofing Solutions',
    descriptor:  "San Francisco's trusted roofing specialists. Transparent pricing, premium materials, and results built to last.",
    metaTitle:   'San Francisco Roofing Service | Licensed Roofing Contractors SF',
    metaDesc:    "San Francisco's trusted roofing specialists. Roof replacement, repair, inspection & storm damage. Licensed (CSLB), insured, transparent pricing. Free itemised estimate.",
    // Brand name split for the two-line hero H1 — keep each line under ~18 chars.
    headlineLineOne: 'San Francisco',
    headlineLineTwo: 'Roofing Service',
  },

  domain: {
    host: 'sanfranciscoroofingservice.com',
    url:  'https://sanfranciscoroofingservice.com',
  },

  contact: {
    email:        'INFO@SanFranciscoRoofingService.com',
    serviceArea: 'San Francisco & Bay Area',
    responseTime: 'Within 2 business hours',
  },

  city: {
    name:     'San Francisco',
    short:    'SF',
    region:   'Bay Area',
    state:    'CA',
    slug:     'san-francisco',                      // Used to build /roof-replacement-{slug} routes
    coords:   { lat: 37.7749, lng: -122.4194 },
    // One-line hero blurb that namechecks two recognisable neighborhoods.
    blurb:    'From Victorian flats in the Mission to hillside homes in Twin Peaks',
    // OPTIONAL — used by Portfolio if you regenerate per-city projects.
    neighborhoods: ['Mission District', 'Twin Peaks', 'Noe Valley', 'Sunset', 'Richmond', 'Pacific Heights'],
  },

  license: {
    cslbNumber:    '1045782',
    cslbLabel:     'CSLB Licensed #1045782',
    insurance:     '$2M Liability',
    insuranceShort:'$2M Insured',
    warranty:      '25-Year Workmanship Warranty',
  },

  stats: {
    projectsCompleted:    847,
    yearsInBusiness:      15,
    clientSatisfactionPct: 98,
    emergencyResponseHrs: 24,
    insurance:           '$2M',
  },

  social: {
    facebook:  'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter:   'https://twitter.com',
    youtube:   'https://youtube.com',
  },

  copyrightYear: 2025,

  // Service slug template — the slug is used as the URL path AND as the
  // canonical filename. Always end with the city slug for SEO.
  services: [
    { id: 'replacement', label: 'Roof Replacement', slug: 'roof-replacement-san-francisco' },
    { id: 'repair',      label: 'Roof Repair',       slug: 'roof-repair-san-francisco' },
    { id: 'inspection',  label: 'Roof Inspection',   slug: 'roof-inspection-san-francisco' },
    { id: 'storm',       label: 'Storm Damage',      slug: 'storm-damage-roofing-san-francisco' },
  ],
};

// Convenience helpers — keeps callers from repeating boilerplate.
export const serviceHref = (id) => {
  const s = site.services.find((x) => x.id === id);
  return s ? `/${s.slug}` : '/#services';
};

export const mailto = `mailto:${site.contact.email}`;
