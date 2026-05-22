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
    metaTitle:   'San Francisco Roofing Services | Licensed Contractors SF',
    metaDesc:    "Trusted San Francisco roofing services. Expert flat roof replacement, emergency repair & inspections. CSLB licensed & insured. Get a free itemized estimate today.",
    // Brand name split for the two-line hero H1 — keep each line under ~18 chars.
    // H1 reads "San Francisco Roofing Services" — the primary keyword target.
    headlineLineOne: 'San Francisco',
    headlineLineTwo: 'Roofing Services',
  },

  domain: {
    host: 'sanfranciscoroofingservices.com',
    url:  'https://sanfranciscoroofingservices.com',
  },

  contact: {
    email:        'Contact@SanFranciscoRoofingService.com',
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
    { id: 'replacement', label: 'Roof Replacement',      slug: 'roof-replacement-san-francisco' },
    { id: 'flatRoof',    label: 'Flat Roof Replacement', slug: 'flat-roof-replacement-san-francisco' },
    { id: 'repair',      label: 'Roof Repair',           slug: 'roof-repair-san-francisco' },
    { id: 'inspection',  label: 'Roof Inspection',       slug: 'roof-inspection-san-francisco' },
    { id: 'storm',       label: 'Storm Damage',          slug: 'storm-damage-roofing-san-francisco' },
  ],

  // SF service-area entities used by Footer + JSON-LD for geographic
  // entity reinforcement. Keep these in sync with index.html schema.
  serviceArea: {
    // Each neighborhood maps to a dedicated landing page in the mini-silo.
    // slug pattern: /roofing-{slug}-san-francisco
    neighborhoods: [
      { name: 'Mission District',  slug: 'roofing-mission-district-san-francisco' },
      { name: 'Twin Peaks',        slug: 'roofing-twin-peaks-san-francisco' },
      { name: 'Sunset District',   slug: 'roofing-sunset-district-san-francisco' },
      { name: 'Richmond District', slug: 'roofing-richmond-district-san-francisco' },
      { name: 'SOMA',              slug: 'roofing-soma-san-francisco' },
      { name: 'Pacific Heights',   slug: 'roofing-pacific-heights-san-francisco' },
      { name: 'Noe Valley',        slug: 'roofing-noe-valley-san-francisco' },
    ],
    zipCodes: ['94102', '94103', '94110', '94112', '94114', '94116', '94122', '94124'],
  },
};

// Convenience helpers — keeps callers from repeating boilerplate.
export const serviceHref = (id) => {
  const s = site.services.find((x) => x.id === id);
  return s ? `/${s.slug}` : '/#services';
};

export const mailto = `mailto:${site.contact.email}`;
