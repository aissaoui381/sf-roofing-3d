import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, MapPin, ShieldCheck } from 'lucide-react';
import { site, mailto } from '../site.config.js';

// Each neighborhood entry is a hyper-local long-tail landing page. The content
// is unique per neighborhood (housing stock, microclimate, common failure
// modes) and links back to the four main service pages for internal-link juice.
const NEIGHBORHOODS = {
  mission: {
    slug: 'roofing-mission-district-san-francisco',
    name: 'Mission District',
    zips: ['94110', '94103'],
    metaTitle: 'Roofing Mission District San Francisco | 94110 SF Roofers',
    metaDesc: 'Licensed roofing services in the Mission District San Francisco (94110, 94103). Victorian flat re-roofing, TPO membranes, emergency leak repair. Free itemized estimate.',
    intro: 'Roofing services across the Mission District (94110, 94103) — Victorian and Edwardian flats, mixed-use buildings, and converted warehouses. Flat-roof replacements with TPO and modified bitumen are our most common Mission project, followed by emergency leak repair after every atmospheric river.',
    sections: [
      {
        heading: 'Mission District housing stock and what fails first',
        body: 'The Mission is dominated by two-, three-, and four-unit Victorian flats built between 1880 and 1910. The shallow-pitched and dead-flat roofs that crown these buildings were originally finished in coal tar or rolled asphalt — materials that have not been manufactured for half a century. When a Mission flat starts leaking, the culprit is almost always the parapet flashing, the scupper drain, or a failed membrane seam that has separated in the last big wind event. Replacement is usually the right call once the underlying membrane is past 25 years.',
      },
      {
        heading: 'TPO, modified bitumen, and Victorian flat re-roofing',
        body: 'For Mission flat roof replacement we install 60-mil or 80-mil reinforced TPO from GAF EverGuard or Carlisle Sure-Weld, heat-welded at every seam. Modified bitumen torch-down with a granulated cap is the budget alternative and still performs well over solid wood decks on older flats. Every replacement includes new tapered insulation to eliminate ponding water, rebuilt parapet caps in bent metal coping, and replacement scuppers tied back to the membrane with reinforced flashing.',
      },
      {
        heading: 'Permits, staging, and the back-to-back-lot reality',
        body: 'Mission lot lines are tight. We coordinate with neighbors before any tear-off, schedule crane lifts during low-traffic windows on Valencia, 24th, and Mission Street, and pull a sidewalk-occupancy permit when needed. Every flat roof replacement is permitted through SF DBI; same-material replacements usually qualify for an over-the-counter permit, and we handle the application, the field inspection, and the final permit closeout.',
      },
    ],
    services: ['flatRoof', 'repair', 'replacement', 'inspection'],
  },

  'twin-peaks': {
    slug: 'roofing-twin-peaks-san-francisco',
    name: 'Twin Peaks',
    zips: ['94114', '94131'],
    metaTitle: 'Roofing Twin Peaks San Francisco | Hillside Roof Replacement SF',
    metaDesc: 'Roofing services in Twin Peaks San Francisco (94114, 94131). Hillside roof replacement, Spanish tile, wind-exposure repair. Licensed SF contractors. Free estimate.',
    intro: 'Roofing services across Twin Peaks (94114, 94131) — hillside single-family homes, mid-century moderns, and luxury remodels. Steep-pitch shingle and tile replacement, wind-exposure repair, and ridge-cap rebuilds after every winter storm. Hillside staging is its own craft and we have it dialed.',
    sections: [
      {
        heading: 'Hillside roofs, wind exposure, and the Twin Peaks microclimate',
        body: 'Twin Peaks sits high enough above the marine layer to catch wind nearly every afternoon, which is great for views and brutal for poorly fastened roofing. The most common Twin Peaks repair we handle is wind-lifted shingle tabs along the windward side of the roof, displaced ridge caps, and torn flashing on chimneys. When we replace a Twin Peaks roof, we always upgrade the wind-uplift specification: ring-shank nails, six-nail patterns, and reinforced ridge fastening regardless of what the previous installer did.',
      },
      {
        heading: 'Spanish tile, asphalt shingles, and metal — material choices for the hill',
        body: 'Twin Peaks homes split roughly evenly between asphalt shingles (the majority on mid-century houses) and Spanish tile (on the Mediterranean Revival and Spanish Eclectic homes that ring the upper streets). Tile replacement requires a structural check of the original rafters because tile weighs three times what shingles do. Standing-seam metal is increasingly popular on modern Twin Peaks remodels — it sheds wind-driven rain instantly and dramatically reduces fire risk in the wildland-urban interface zone.',
      },
      {
        heading: 'Staging, safety, and the steep-street logistics',
        body: 'Most Twin Peaks driveways are too steep for a standard dump truck, so we stage tear-off debris in roll-off bins placed at the curb cut and shuttle materials up the property in smaller loads. Safety harnesses are non-negotiable on any pitch over 6:12. We never schedule a Twin Peaks job when high-wind advisories are active — the safety risk and the work-quality risk both spike. SF DBI permits are pulled for every replacement and we handle the inspection coordination.',
      },
    ],
    services: ['replacement', 'repair', 'inspection', 'storm'],
  },

  sunset: {
    slug: 'roofing-sunset-district-san-francisco',
    name: 'Sunset District',
    zips: ['94122', '94116'],
    metaTitle: 'Roofing Sunset District San Francisco | 94122 SF Roof Repair',
    metaDesc: 'Roofing services across the Sunset District San Francisco (94122, 94116). Fog-belt residential roof replacement, flat roof repair, marine-grade materials. Free estimate.',
    intro: 'Roofing services across the Sunset District (94122, 94116) — Inner Sunset bungalows, Outer Sunset stucco homes with garage-down designs, and the long blocks of Edwardian flats that line the avenues. The Sunset sits in the fog belt year-round, which dictates everything we specify on a roof here.',
    sections: [
      {
        heading: 'Fog, salt air, and the marine environment',
        body: 'The Outer Sunset is essentially a marine environment. Persistent surface moisture from the daily fog cycle accelerates failure of any cheap underlayment, corrodes uncoated steel fasteners within five years, and degrades the rubber boots around plumbing vents faster than anywhere else in the city. When we replace a roof in the Sunset, we always upgrade to stainless or copper fasteners around penetrations, premium synthetic underlayment, and marine-grade primer on any exposed metal flashing.',
      },
      {
        heading: 'Sunset housing stock — shingles, flats, and the garage-down design',
        body: 'Most Sunset single-family homes were built between 1925 and 1955 with shallow-pitched composition-shingle roofs over a one-story house above a ground-floor garage. The shallow pitch is forgiving for shingle work but punishing if water ever finds the underlayment — by the time you see a stain inside, the deck is often already saturated. We always pull a sample of the underlayment before quoting a re-roof so the homeowner knows whether deck repairs are likely.',
      },
      {
        heading: 'Wind-uplift, flat roof transitions, and the long view',
        body: 'Sunset roofs catch the same Pacific wind that batters the Richmond. Every Sunset replacement we do uses upgraded wind-uplift fastening — ring-shank nails, six-per-shingle patterns, and reinforced edge metal. Where a pitched roof transitions to a flat porch or addition (extremely common on Sunset homes), we rebuild the transition with a proper step-flashing and base-flashing assembly rather than the asphalt-and-prayer detail most original builders used. Replacement, repair, and inspection — all permit-pulled through SF DBI.',
      },
    ],
    services: ['replacement', 'repair', 'inspection', 'flatRoof'],
  },

  richmond: {
    slug: 'roofing-richmond-district-san-francisco',
    name: 'Richmond District',
    zips: ['94121', '94118'],
    metaTitle: 'Roofing Richmond District San Francisco | 94121 SF Roofers',
    metaDesc: 'Roofing services in the Richmond District San Francisco (94121, 94118). Wind-driven rain repair, fog-belt replacement, emergency leak response. Licensed SF roofers.',
    intro: 'Roofing services across the Richmond District (94121, 94118) — Inner Richmond Edwardians, Outer Richmond bungalows, and the streets that catch the wind tunnel running from Lone Mountain straight to the ocean. Wind-driven rain repairs dominate our Richmond service calls every winter.',
    sections: [
      {
        heading: 'The Richmond wind tunnel and what it does to roofs',
        body: 'The Richmond District sits in one of San Francisco\'s most consistent wind corridors. Sustained 25-35 mph westerlies are normal here from May through October, and winter storms regularly push wind-driven rain horizontally into roofing assemblies that were never designed for it. The repairs we make most often in the Richmond are wind-lifted shingle tabs, water intrusion at chimney step-flashings, and failed sealant at skylight perimeters where the wind has worked the joint loose over a decade.',
      },
      {
        heading: 'Emergency leak repair and rapid response across 94121 and 94118',
        body: 'When a Richmond roof starts leaking during an atmospheric river, hours matter. Our emergency leak response crew dispatches within two hours, day or night, with 6-mil reinforced tarp on the truck for any exposed deck and an infrared camera for tracing moisture migration into the assembly. Permanent repairs are scheduled as soon as the storm passes — we do not send crews onto wet steep roofs because the safety risk and the workmanship risk both compound.',
      },
      {
        heading: 'Replacement choices for fog-belt Richmond homes',
        body: 'For full replacements in the Richmond we recommend Class A architectural asphalt shingles (CertainTeed Landmark or GAF Timberline HDZ) with synthetic underlayment, ice-and-water shield at every valley and penetration, and stainless ring-shank nails. Standing-seam metal is increasingly popular on Outer Richmond remodels — wind-uplift performance is excellent and the lifespan beats shingles by two decades. Every replacement is permitted through SF DBI and we handle the inspection coordination.',
      },
    ],
    services: ['repair', 'replacement', 'storm', 'inspection'],
  },

  soma: {
    slug: 'roofing-soma-san-francisco',
    name: 'SOMA',
    zips: ['94103', '94107'],
    metaTitle: 'Roofing SOMA San Francisco | 94103 Commercial TPO & PVC Roofers',
    metaDesc: 'Commercial and residential roofing in SOMA San Francisco (94103, 94107). TPO, PVC, modified bitumen flat roofs. Roof-deck rebuilds. Phased commercial scheduling.',
    intro: 'Roofing services across SOMA (94103, 94107) — converted industrial lofts, mixed-use commercial buildings, and the new generation of mid-rise residential with rooftop amenities. Commercial flat roof replacement, roof-deck integration, and HVAC/solar coordination are the SOMA specialties.',
    sections: [
      {
        heading: 'Commercial TPO and shingle roofing in SOMA',
        body: 'Most SOMA buildings are flat-roofed: converted Victorians, refurbished industrial structures, and modern mid-rises. The membrane of choice for SOMA commercial flat roof replacement is reinforced TPO (60-mil or 80-mil) with mechanical fastening on the field and bonded perimeter strips. For restaurants, laundries, and any building where rooftop equipment leaks petroleum or grease, we step up to PVC (Sika Sarnafil, IB Roof Systems) because PVC resists chemical degradation where TPO can soften.',
      },
      {
        heading: 'Roof decks, HVAC, and solar — coordinating around the rest of the system',
        body: 'SOMA buildings increasingly host roof decks, HVAC equipment, photovoltaic arrays, and even green-roof installations. A flat roof replacement on a working commercial property requires phased scheduling, equipment lifts coordinated with rooftop trades, and tight communication with tenants. We have replaced membranes under live solar arrays without taking the system offline and re-roofed restaurants overnight to avoid interrupting service. Every coordination plan is laid out in writing before the first tear-off.',
      },
      {
        heading: 'Punctures, seam separation, and parapet failure — SOMA repair patterns',
        body: 'SOMA flat-roof repairs typically fall into three categories: punctures from rooftop traffic or fallen debris, seam separation on aging TPO that has lost flexibility, and parapet flashing failures where the cap metal has lifted. We patch with manufacturer-matched membrane, heat-welded for permanence. For larger commercial buildings we offer maintenance contracts with twice-yearly inspections — small fixes prevent six-figure interior water-damage claims.',
      },
    ],
    services: ['flatRoof', 'repair', 'inspection', 'storm'],
  },

  'pacific-heights': {
    slug: 'roofing-pacific-heights-san-francisco',
    name: 'Pacific Heights',
    zips: ['94115', '94109'],
    metaTitle: 'Roofing Pacific Heights San Francisco | Historic Victorian Re-Roofing',
    metaDesc: 'Roofing services in Pacific Heights San Francisco (94115, 94109). Historic Victorian re-roofing, slate, copper, Historic Preservation Commission coordination.',
    intro: 'Roofing services across Pacific Heights (94115, 94109) — historic Victorians, grand Edwardians, and the kind of architectural detailing that demands a roofer who understands historic preservation. We coordinate with the SF Historic Preservation Commission, work in slate and copper alongside conventional materials, and document every detail for the homeowner\'s records.',
    sections: [
      {
        heading: 'Historic-district review and Certificate of Appropriateness',
        body: 'Parts of Pacific Heights fall inside designated historic districts, which means material substitutions, color changes, and any visible structural change can trigger Historic Preservation Commission review and Certificate of Appropriateness requirements. We have walked dozens of Pacific Heights homeowners through this process and know which streets require pre-approval versus administrative sign-off. The roofing scope is always coordinated with the broader permit set if a homeowner is also doing a façade restoration.',
      },
      {
        heading: 'Slate, copper, and the high-end material conversation',
        body: 'Slate roofs are rare in San Francisco generally but common on the older Pacific Heights mansions. Slate is repairable in pieces for half a century if you have a crew that knows how to flash around it, and we maintain a relationship with a slate supplier so we can match existing tile color and thickness for any patch. Copper standing-seam roofs and copper flashing are signature details on many Pacific Heights Victorians — we fabricate custom copper details on site rather than substituting cheaper materials that age poorly.',
      },
      {
        heading: 'Victorian flat re-roofing on the upstairs flats',
        body: 'Behind the elaborate cornices on most Pacific Heights Victorians is a flat roof that needs replacement on the same schedule as flats anywhere else in the city. We replace with TPO or PVC, rebuild parapet caps in bent metal coping that matches the architectural intent, and coordinate scupper rebuilds with the original drainage routing. The visible streetside detailing is preserved exactly; the working roof above is brought up to modern standards.',
      },
    ],
    services: ['replacement', 'flatRoof', 'inspection', 'repair'],
  },

  'noe-valley': {
    slug: 'roofing-noe-valley-san-francisco',
    name: 'Noe Valley',
    zips: ['94114', '94131'],
    metaTitle: 'Roofing Noe Valley San Francisco | Victorian Roof Replacement SF',
    metaDesc: 'Roofing services in Noe Valley San Francisco (94114, 94131). Victorian rowhouse re-roofing, flat-to-pitched transitions, modern remodel coordination. Free estimate.',
    intro: 'Roofing services across Noe Valley (94114, 94131) — Victorian and Edwardian rowhouses, modern remodels with rooftop additions, and the steady remodeling activity that defines the neighborhood. Roof replacement on Victorian rowhouses with shared parapet walls is the Noe Valley specialty.',
    sections: [
      {
        heading: 'Victorian rowhouses and shared parapet walls',
        body: 'Noe Valley rowhouses share parapet walls with the neighbors on both sides, which means a roof replacement on one home almost always touches the shared parapets. We coordinate with adjacent owners before any tear-off, document the existing condition with photos for both parties, and rebuild the shared parapet flashing so the assembly is watertight for both homes. This avoids the most common Noe Valley roofing dispute — water migrating along a poorly flashed shared parapet into the neighbor\'s plaster.',
      },
      {
        heading: 'Modern remodels, rooftop decks, and ADU coordination',
        body: 'Noe Valley has been a remodeling neighborhood for two decades, and we coordinate roofing scope with architects and general contractors on every active project. New rooftop decks, dormers added during a roof replacement, and ADU additions over the garage all require careful flashing design and SF DBI permit coordination. We fold the roofing into the broader permit set rather than pulling a separate roofing-only permit when other trades are working — it saves the homeowner a re-inspection cycle.',
      },
      {
        heading: 'Flat-to-pitched transitions and rear-yard additions',
        body: 'Most Noe Valley Victorians have a pitched front roof and a flat rear roof over a kitchen or laundry addition built decades after the original house. The transition between the two roofs is the single most leak-prone detail on the building. We rebuild this transition with proper step-flashing, base-flashing, and counter-flashing detailing — usually as part of a full replacement, sometimes as a targeted repair. Pull a permit, do the work right, document everything for the homeowner.',
      },
    ],
    services: ['replacement', 'flatRoof', 'repair', 'inspection'],
  },
};

export const NEIGHBORHOOD_LIST = Object.entries(NEIGHBORHOODS).map(([id, n]) => ({
  id, slug: n.slug, name: n.name,
}));

export default function NeighborhoodPage({ neighborhood }) {
  const n = NEIGHBORHOODS[neighborhood];
  if (!n) return null;

  const canonical = `${site.domain.url}/${n.slug}`;

  // Resolve service IDs to display labels + URLs for the cross-link grid.
  const linkedServices = (n.services || []).map((sid) => {
    const s = site.services.find((x) => x.id === sid);
    return s ? { label: s.label, href: `/${s.slug}` } : null;
  }).filter(Boolean);

  // BreadcrumbList helps Google show "Home › Service Areas › <Neighborhood>".
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: site.domain.url },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${site.domain.url}/#service-areas` },
      { '@type': 'ListItem', position: 3, name: n.name,          item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{n.metaTitle}</title>
        <meta name="description" content={n.metaDesc} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white">

        {/* Hero */}
        <div className="bg-[#CE9843] px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-zinc-950/60 text-sm font-medium hover:text-zinc-950 transition-colors mb-6 inline-block">
              ← Back to Home
            </Link>
            <p className="text-zinc-950/50 text-xs font-bold tracking-[0.25em] uppercase mb-4">
              {site.brand.name} · Service Areas
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight mb-6">
              Roofing in {n.name}<br />
              <span className="text-zinc-950/50">San Francisco, CA</span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-6">
              {n.zips.map((z) => (
                <span key={z} className="inline-flex items-center gap-2 bg-zinc-950/10 px-4 py-2 rounded-full text-sm font-semibold text-zinc-950">
                  <MapPin size={14} /> {z}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 bg-zinc-950/10 px-4 py-2 rounded-full text-sm font-semibold text-zinc-950">
                <ShieldCheck size={14} /> CSLB Licensed
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-4xl mx-auto">

            <p className="text-zinc-300 text-lg leading-relaxed mb-12">{n.intro}</p>

            <article className="space-y-12">
              {n.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-5 leading-tight">
                    {s.heading}
                  </h2>
                  <p className="text-zinc-300 text-base leading-relaxed">{s.body}</p>
                </section>
              ))}
            </article>

            {/* Service cross-link grid */}
            {linkedServices.length > 0 && (
              <div className="mt-20 p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                <h2 className="text-xl font-black text-white mb-2">
                  Roofing Services We Provide in {n.name}
                </h2>
                <p className="text-zinc-500 text-sm mb-6">
                  Every service below is delivered across {n.name} and the surrounding {n.zips.join(' / ')} zip codes.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {linkedServices.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="flex items-center justify-between gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-gold transition-colors group"
                    >
                      <span className="flex items-center gap-2.5">
                        <CheckCircle size={16} className="text-gold flex-shrink-0" />
                        <span className="text-zinc-200 text-sm font-semibold">{s.label}</span>
                      </span>
                      <ArrowRight size={14} className="text-zinc-500 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Get a Free Itemized Estimate for Your {n.name} Roof
              </h2>
              <p className="text-zinc-400 text-sm mb-6 max-w-xl mx-auto">
                Answer four questions and receive a full itemized roofing estimate &mdash; materials, labor, and timeline &mdash; in your inbox within minutes. No commitment.
              </p>
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-zinc-950
                           bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           transition-all duration-300 shadow-[0_6px_24px_rgba(206,152,67,0.4)]"
              >
                Get My Free Itemized Estimate <ArrowRight size={16} />
              </Link>
              <div className="mt-4">
                <a href={mailto} className="text-zinc-500 hover:text-white text-sm transition-colors">
                  Or email us directly
                </a>
              </div>
            </div>

            {/* Cross-neighborhood navigation */}
            <div className="mt-16 pt-10 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Other San Francisco Neighborhoods We Serve
              </p>
              <div className="flex flex-wrap gap-2">
                {NEIGHBORHOOD_LIST.filter((o) => o.id !== neighborhood).map((o) => (
                  <Link
                    key={o.id}
                    to={`/${o.slug}`}
                    className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-gold text-xs transition-colors"
                  >
                    {o.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-16 lg:px-24 py-8 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-zinc-600 text-sm">
            <p>© {site.copyrightYear} {site.brand.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-zinc-400 transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
              <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
