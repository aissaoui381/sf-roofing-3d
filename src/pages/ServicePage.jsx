import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { site, mailto } from '../site.config.js';

// Each service entry includes a longBody array rendered as the main article.
// Local hooks (neighborhoods, zip codes, DBI permits, SF coastal weather) are
// woven through every section to build geographic + topical authority.
const SERVICES = {
  replacement: {
    title: 'Residential Roof Replacement in San Francisco',
    metaTitle: 'Residential Roof Replacement San Francisco | Licensed SF Contractors',
    metaDesc: 'Residential roof replacement near me in San Francisco. Asphalt shingles, Spanish tile, metal & TPO. CSLB licensed, SF DBI permits handled. Free itemized estimate.',
    headline: 'Residential Roof Replacement',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Full residential roof replacement across San Francisco — from Victorian flats in Noe Valley and Pacific Heights to hillside homes in Twin Peaks. Asphalt shingles, Spanish tile, metal, and TPO flat membranes. SF DBI permits pulled, every cost itemized.',
    time: '2–5 days',
    price: '$8,000 – $22,000',
    features: [
      'Full structural assessment before tear-off begins',
      'SF DBI building permits pulled and inspections coordinated',
      'Asphalt shingles, Spanish tile, metal, or TPO flat roofing',
      '25-year material warranty + 5-year workmanship warranty',
      'Final San Francisco Department of Building Inspection sign-off included',
      'Daily cleanup with magnetic nail sweep across the property',
    ],
    longBody: [
      {
        heading: 'San Francisco roofing services built for your neighborhood',
        paragraphs: [
          'A residential roof replacement in San Francisco is never one job — it is the right job for the right house, on the right street, in the right microclimate. The fog-belt humidity of the Sunset District eats through cheap underlayments. The salt-laden breeze off Ocean Beach corrodes unprotected fasteners. The 25-degree pitches in Twin Peaks make standard staging dangerous. Pacific Heights Victorians demand sympathetic detailing around dormers, parapets, and crown moldings that any generic roofer will damage on day one.',
          'Our team has handled residential roof replacement near me searches from homeowners in 94114 Castro, 94110 Mission, 94117 Haight, 94122 Sunset, 94116 Parkside, and 94124 Bayview. We know which materials hold up to the wind-driven rain that rolls off the Pacific in February, which underlayments survive the long dry stretches of Indian Summer, and which fastener systems pass SF DBI inspection on the first walk-through.',
        ],
      },
      {
        heading: 'Asphalt shingles, Spanish tile, and metal — picking the right material',
        paragraphs: [
          'Asphalt architectural shingles remain the most common choice for residential roofing replacement near me in San Francisco. A Class A fire-rated, algae-resistant shingle from CertainTeed Landmark or GAF Timberline HDZ gives you a 30 to 50-year manufacturer warranty at a price most homeowners can absorb. We install with synthetic underlayment, ice-and-water shield at every valley and penetration, and ring-shank nails rated for our wind-uplift zone.',
          'Spanish tile — clay or concrete — is the signature look of hillside neighborhoods like St. Francis Wood, Forest Hill, and parts of Twin Peaks. Tile is heavy, so a tile roof replacement requires a structural review of the existing rafters. We coordinate with a licensed structural engineer when the original framing is undersized, and we handle the SF DBI permit revision that follows.',
          'Standing-seam metal roofing has surged in popularity for modern SF builds and major remodels in Noe Valley and Glen Park. Concealed-fastener metal sheds wind-driven rain instantly, lasts 50 to 70 years, and dramatically reduces fire risk in the wildland-urban interface zones west of Twin Peaks. We install Galvalume and Kynar-finished panels with custom-bent flashing for the dormers and chimneys that define San Francisco architecture.',
        ],
      },
      {
        heading: 'The roof replacement service near me process — start to final inspection',
        paragraphs: [
          'A typical residential roof replacement timeline in San Francisco runs three to five working days, weather permitting. Day one is tear-off and dry-in: every square of old roofing comes off, the deck is inspected for dry rot, damaged sheathing is replaced, and synthetic underlayment is fastened across the entire field before sundown so the house is never exposed overnight.',
          'Days two and three are installation: starter course, field shingles or tile, ridge caps, and all the penetration boots that protect plumbing vents, exhaust fans, and skylights. Day four handles flashings, gutter integration, and detail work around chimneys, parapets, and roof-to-wall transitions. Day five is final cleanup, magnetic nail sweep, and a homeowner walk-through where we photograph every detail for your records.',
          'San Francisco DBI requires a roofing permit for any full replacement, and most neighborhoods require a final inspection before the permit closes. We pull the permit in your name, schedule the inspection on our schedule rather than yours, and walk the inspector through the work ourselves. You receive the closed permit and inspection card as part of the project handoff.',
        ],
      },
      {
        heading: 'San Francisco DBI permits, planning, and historic-district rules',
        paragraphs: [
          'Every full roof replacement inside the City and County of San Francisco needs a building permit from the Department of Building Inspection at 49 South Van Ness Avenue. Same-material replacements usually qualify for an over-the-counter permit; material changes (shingle to tile, for example) and any change in roof slope require a longer plan-check process.',
          'Properties in San Francisco historic districts — including parts of Pacific Heights, Alamo Square, and Russian Hill — face additional review by the Historic Preservation Commission. Material substitutions, color changes, and any visible structural change can trigger Certificate of Appropriateness requirements. We have walked dozens of homeowners through this process and know which neighborhoods require pre-approval and which allow administrative sign-off.',
          'For ADUs, dormers, and rooftop deck additions added during a roof replacement, we coordinate with your architect or general contractor to fold the roofing scope into the broader permit set. This avoids the most common cost overrun in residential roofing replacement near me projects: a stop-work order from DBI mid-tear-off.',
        ],
      },
      {
        heading: 'Pricing, financing, and the free itemized roofing estimate',
        paragraphs: [
          'A residential roof replacement in San Francisco typically runs $8,000 to $22,000 depending on square footage, material, roof complexity (cut-up roofs with valleys and dormers cost more than simple gables), and whether structural repairs are needed under the old roof. The single largest variable is access — hillside homes in Twin Peaks and tightly packed Edwardians in the Mission both add labor cost for safe staging.',
          'Every estimate from our team is line-item itemized: tear-off and disposal, deck repair if needed, underlayment, field material, ridge and hip details, flashings, gutter work, permits, and final cleanup. No "miscellaneous" line. No "contingency" markup. If a dry-rot issue is discovered during tear-off, you receive a photo, a written change order, and a price before any additional work is performed.',
          'Ready to start? Use the quote calculator on our homepage to receive a free itemized roofing estimate in your inbox within minutes, or email us directly and we will schedule an on-site assessment at no charge. San Francisco roofing services done right, one roof at a time.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does a residential roof replacement take in San Francisco?', a: 'Most residential roof replacements take 2 to 5 working days depending on square footage, material, and roof complexity. We schedule around SF weather windows and never leave a home exposed overnight.' },
      { q: 'Do I need a permit for roof replacement in San Francisco?', a: 'Yes. Full roof replacements require a permit from the San Francisco Department of Building Inspection (DBI). Same-material replacements usually qualify for an over-the-counter permit. We handle all applications and inspections on your behalf.' },
      { q: 'What roofing materials work best in San Francisco?', a: 'For fog-belt neighborhoods like the Sunset and Richmond, modified bitumen or TPO is best on flat roofs and Class A asphalt shingles or metal on pitched roofs. Hillside homes in Twin Peaks and Pacific Heights often suit Spanish tile if the framing supports it.' },
    ],
  },

  flatRoof: {
    title: 'Flat Roof Replacement in San Francisco',
    metaTitle: 'Flat Roof Replacement San Francisco | TPO & Elastomeric SF Roofing',
    metaDesc: 'Flat roof replacement near me in San Francisco. TPO, elastomeric & modified bitumen for Mission & Sunset Victorian flats. CSLB licensed. Free itemized estimate.',
    headline: 'Flat Roof Replacement',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Flat roof replacement for San Francisco Victorian flats and commercial buildings — Mission District, Sunset District, SOMA, and Hayes Valley. Weather-tight TPO, elastomeric, and modified bitumen systems. SF DBI permits pulled, free itemized roofing estimate.',
    time: '2–4 days',
    price: '$6,000 – $18,000',
    features: [
      'Full tear-off down to the deck — no overlays on aging substrates',
      'TPO, PVC, elastomeric, or modified bitumen weather-tight systems',
      'New tapered insulation to fix ponding water permanently',
      'SF DBI permits pulled and final inspections coordinated',
      'Code-compliant parapet flashing and scupper rebuilding',
      '20-year manufacturer warranty + workmanship guarantee',
    ],
    longBody: [
      {
        heading: 'San Francisco roofing for Victorian flats and commercial flat-roof buildings',
        paragraphs: [
          'Most San Francisco housing stock is flat-roofed. Victorian and Edwardian flats in the Mission District (94110), the Sunset District (94122 and 94116), the Castro (94114), and Noe Valley sit under shallow-pitched or genuinely flat roofs that drain to internal scuppers or rear gutters. That construction is older than the seismic code, older than modern roofing membranes, and older than the climate patterns we now design around.',
          'When a homeowner searches for flat roof replacement near me, the underlying question is almost never "what color." It is "what membrane will survive 30 years of San Francisco coastal fog, salt air, occasional atmospheric-river rainfall, and 60-mph westerly wind gusts without leaking into my plaster ceilings." We answer that question first, every time.',
        ],
      },
      {
        heading: 'TPO, PVC, and elastomeric — choosing a weather-tight flat-roof membrane',
        paragraphs: [
          'TPO (thermoplastic polyolefin) is the workhorse of modern flat roof replacement in San Francisco. Heat-welded seams create a monolithic surface that cannot peel like the old asphalt-roll roofs that dominated SF rooftops for a century. We install 60-mil and 80-mil reinforced TPO from GAF EverGuard, Carlisle Sure-Weld, or Versico VersiWeld with mechanical fastening on the field and bonded perimeter strips along every parapet.',
          'PVC membranes (Sika Sarnafil, IB Roof Systems) are premium upgrades for SF restaurants, laundries, and any building where rooftop equipment leaks chemicals onto the membrane. PVC resists petroleum and grease where TPO can degrade. PVC is also the right choice for the rooftop decks that have become a defining feature of new construction in Hayes Valley and SoMa.',
          'Elastomeric coatings and modified bitumen still have a place — especially over solid wood decks on older Victorian flats where the assembly was never designed for fully adhered single-ply. Modified-bitumen torch-down with a granulated cap sheet is reliable, repairable, and budget-friendly. Liquid elastomeric coatings are excellent restoration tools when the underlying membrane has 5+ years of life left but needs UV protection.',
        ],
      },
      {
        heading: 'Victorian flat re-roofing — the architectural details that matter',
        paragraphs: [
          'Victorian flat re-roofing is its own craft. The parapet walls that ring most SF flats were built with no waterproofing inside them. A century of capillary moisture has rotted the framing, cracked the stucco, and left the cap flashing barely attached. A real flat roof replacement addresses all of that — not just the field membrane.',
          'We rebuild parapet caps with bent metal coping (24-gauge galvanized or pre-finished aluminum) and seal every joint with butyl tape and storm-resistant clips. Scuppers — the small drain openings that take water through the parapet to a downspout on the building face — are replaced with new copper or coated steel inserts and sealed back to the membrane with reinforced flashing.',
          'Roof-to-wall transitions where a flat roof meets a taller neighboring building (extremely common in SF flat-fronts) get a counter-flashing reglet cut into the masonry, base flashing turned up the wall, and a termination bar bedded in sealant. Done right, this assembly does not leak for the life of the roof.',
        ],
      },
      {
        heading: 'Mission, Sunset, SOMA — neighborhood realities of flat-roof work',
        paragraphs: [
          'Mission District flats (94110, 94103) are notorious for back-to-back lot lines that make staging tight. We coordinate with neighbors, schedule crane lifts during low-traffic windows, and pull a sidewalk-occupancy permit when needed. The reward: a properly replaced flat roof on a Mission Victorian is good for 25+ years.',
          'Sunset District flats (94122, 94116) face the fog and wind hardest. We specify thicker membranes, more aggressive fastener patterns, and always replace the underlying insulation if it shows moisture damage. The Outer Sunset is essentially a marine environment, and the roofing assembly has to acknowledge that.',
          'SOMA and Hayes Valley commercial buildings increasingly host roof decks, HVAC equipment, photovoltaic arrays, and even green roofs. A flat roof replacement on a working commercial property requires phased scheduling, equipment lifts, and tight coordination with tenants. We have replaced membranes under live solar arrays without taking the system offline and re-roofed restaurants overnight to avoid interrupting service.',
        ],
      },
      {
        heading: 'Permits, ponding water, and the long view',
        paragraphs: [
          'Every flat roof replacement in San Francisco requires a permit from SF DBI. The over-the-counter process is fast for like-for-like replacements; structural changes, slope corrections, or new tapered-insulation systems require a plan-check submittal. We handle both routes.',
          'Ponding water — standing puddles on a flat roof more than 48 hours after rain — is the single biggest reason flat roofs fail early in SF. Most existing flat roofs in the city were built dead-level on undersized framing. When we replace, we install tapered ISO insulation across the field to create slope toward the scuppers, eliminating ponding permanently. This adds cost but extends roof life by a decade.',
          'Our flat roof replacement service comes with a 20-year manufacturer membrane warranty, a 5-year workmanship warranty, and a free annual inspection for the first three years to catch any movement, fastener back-out, or coating wear before it becomes a leak. Request a free itemized roofing estimate through our homepage calculator or email us directly — we will assess your roof on-site at no cost.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does a flat roof replacement take in San Francisco?', a: 'Most residential flat roofs over Victorian flats take 2 to 4 working days. Commercial flat roofs with HVAC, solar, or tenant coordination can run 5 to 10 days, scheduled in phases to avoid disruption.' },
      { q: 'TPO or modified bitumen — which is better for an SF Victorian flat?', a: 'TPO is the modern default — heat-welded seams, 20+ year warranty, brilliant white reflective surface. Modified bitumen still works well over solid wood decks and is more forgiving on older framing that was not designed for fully adhered membranes.' },
      { q: 'Will a flat roof replacement fix my ponding-water problem?', a: 'Yes, if we install tapered insulation. The original SF Victorian flat-roof construction was dead-level on undersized framing. New tapered ISO insulation creates positive slope toward the scuppers and eliminates ponding permanently.' },
    ],
  },

  repair: {
    title: 'Emergency Roof Leak Repair in San Francisco',
    metaTitle: 'Emergency Roof Leak Repair San Francisco | 24-Hr SF Roof Repair',
    metaDesc: 'Emergency roof leak repair San Francisco. 24/7 rapid response in Richmond, SOMA, Sunset & Mission. Same-week scheduling. CSLB licensed. Free itemized estimate.',
    headline: 'Roof Repair',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Emergency roof leak repair San Francisco — 24/7 rapid response triage in the Richmond District, SOMA, Sunset, and Mission. Leaks, missing shingles, flashing failures, and storm damage. We diagnose the root cause and fix it right the first time.',
    time: '1–2 days',
    price: '$500 – $3,500',
    features: [
      '24/7 emergency response across all SF neighborhoods',
      'Same-day emergency tarping to stop active leaks',
      'Photographic diagnosis report with root-cause analysis',
      'Leak-free workmanship guarantee on every repair',
      '5-year repair warranty included',
      'Insurance claim documentation and direct adjuster support',
    ],
    longBody: [
      {
        heading: 'Emergency roof leak repair San Francisco — how rapid response works',
        paragraphs: [
          'A leaking roof at 2 a.m. during a January atmospheric river is not a problem you schedule. It is a problem that needs a tarp on it before sunrise, a real diagnosis the next business day, and a permanent fix before the next storm cell rolls off the Pacific. Our emergency roof leak repair San Francisco crew is structured around exactly that timeline.',
          'When you call after hours, a real human picks up. We dispatch a triage truck within two hours across the city — Richmond District (94121, 94118), SOMA (94103, 94107), Sunset (94122, 94116), Mission (94110), Bayview (94124), and every neighborhood in between. The first visit is always free, always documented with photos, and always focused on stopping the active leak before water reaches your finishes.',
        ],
      },
      {
        heading: 'Missing shingle repair, flashing failures, and storm-damage triage',
        paragraphs: [
          'The most common leak sources we diagnose during San Francisco roofing service calls are not the ones homeowners expect. Missing or wind-lifted shingles account for maybe 20% of leaks. The bigger culprits are failed pipe-boot seals (the rubber collars around plumbing vents that degrade in 7-10 years), step flashing along chimneys and dormers that has rusted through, and skylight perimeter flashings that were never installed correctly to begin with.',
          'For each repair we perform a full photographic diagnosis — drone aerial when accessible, ladder inspection of every penetration, attic moisture mapping if the leak has migrated, and infrared scanning on stubborn cases. You receive the photo report by email the day of the visit, with a clear root-cause explanation and a fixed-price written quote for the permanent repair.',
          'Storm-damage triage is its own protocol. After a major SF wind event we field 20-30 calls per day, and we prioritize by severity: active interior water first, exposed deck second, missing field shingles third. Insurance claims documentation begins on day one — every photo timestamped, every measurement recorded, every damage line item itemized so your adjuster has no reason to delay.',
        ],
      },
      {
        heading: 'Richmond District and SOMA — neighborhood-specific roof repair patterns',
        paragraphs: [
          'The Richmond District faces the Pacific wind tunnel between Lone Mountain and the ocean. Most roof repairs we perform in the Richmond are wind-driven: lifted shingle tabs on the windward side of the roof, displaced ridge caps, and torn flashing on chimneys. Repairs here often include wind-uplift upgrades — ring-shank nails, 6-nail patterns, and reinforced ridge fastening.',
          'SOMA presents a different repair profile. Most SOMA buildings are flat-roofed Victorians or converted industrial structures with single-ply membranes. The repairs we perform are typically punctures (rooftop traffic, fallen debris, HVAC service damage), seam separation on aging TPO, and parapet flashing failures where the cap metal has lifted. We patch with manufacturer-matched membrane, heat-welded for permanence.',
          'The Sunset and Outer Richmond sit in the fog belt year-round. Persistent surface moisture accelerates failure of any cheap underlayment and corrodes uncoated metal fasteners within five years. When we repair in the fog belt, we upgrade adjacent components — replacing rusted fasteners, re-flashing penetrations with stainless or copper, and recoating exposed metal with a marine-grade primer.',
        ],
      },
      {
        heading: 'Repair vs replace — the honest conversation',
        paragraphs: [
          'A repair makes sense when the leak is isolated, the surrounding roof has more than five years of remaining life, and the cost of the repair is less than 15% of a full replacement. Beyond that threshold, you are throwing money at a roof that is going to need replacement soon anyway.',
          'We will tell you the truth on this. Our techs are paid to diagnose accurately, not to upsell. If your 22-year-old composition roof has a leak at one valley and the rest of the roof is granular and uniform, we repair. If the same roof has cupped shingles, exposed nail heads across the field, and granule loss in the gutters, we tell you it is time to plan a replacement — and we offer a credit toward a future full replacement if you proceed within 12 months.',
          'For insurance claims, we walk you through the difference between actual cash value (ACV) and replacement cost value (RCV) on your policy, help you draft the claim narrative, and meet your adjuster on-site if you want a second professional opinion in the room. This is one of the most-requested services for emergency roof leak repair San Francisco searches and we do it at no charge to existing clients.',
        ],
      },
      {
        heading: 'Pricing, warranty, and how to request emergency service',
        paragraphs: [
          'A typical roof repair in San Francisco runs $500 to $3,500. Simple shingle and pipe-boot repairs are on the low end. Chimney re-flashing, skylight reconditioning, and structural fascia rebuilds run higher. Multi-trip emergency tarping during an extended storm series is billed at our published hourly rate with all materials at cost.',
          'Every repair is backed by a 5-year workmanship warranty in writing. If the leak returns at the repair location during that period, we come back at no charge and re-do the work. No fine print, no "act of God" exclusion, no fight. This is the warranty that separates licensed San Francisco roofing services from the unlicensed handyman work that floods Craigslist after every storm.',
          'To request emergency service, use the quote calculator on our homepage or email us directly. For active interior water damage in progress, mark the request as Emergency and we will dispatch within two hours, day or night, across all eight target SF zip codes (94102, 94103, 94110, 94112, 94114, 94116, 94122, 94124) and every other neighborhood in the city.',
        ],
      },
    ],
    faqs: [
      { q: 'How quickly can you respond to an emergency roof leak in San Francisco?', a: 'We dispatch a triage crew within two hours, 24/7, across every San Francisco neighborhood. Same-day emergency tarping is included to stop active interior water damage while we plan the permanent repair.' },
      { q: 'How much does emergency roof leak repair cost in San Francisco?', a: 'Minor repairs start around $500. Complex repairs involving flashing, valleys, or structural rebuilds run $1,500–$3,500. You receive a full itemized estimate with photos before any paid work begins.' },
      { q: 'Will my homeowner\'s insurance cover roof repairs?', a: 'Storm and wind damage is typically covered. We provide full insurance documentation with timestamped photos, can meet your adjuster on-site, and work directly with the carrier so you do not pay out of pocket for a covered claim.' },
    ],
  },

  inspection: {
    title: 'Roof Inspection in San Francisco',
    metaTitle: 'Roof Inspection San Francisco | Same-Day SF Roof Inspections',
    metaDesc: 'Professional roof inspection San Francisco. Same-day scheduling, drone photography, full written report. Licensed inspector, ideal for SF home buyers and insurance.',
    headline: 'Roof Inspection',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Detailed roof inspection in San Francisco for home purchases, insurance requirements, or peace of mind. Same-day scheduling, drone aerial photography, full written and photographic report. Trusted by SF realtors, insurance adjusters, and homeowners across every neighborhood.',
    time: 'Same day',
    price: '$250 – $550',
    features: [
      'Same-day scheduling available across all SF neighborhoods',
      'Drone aerial photography of every roof plane',
      'Full written condition report within 24 hours',
      'Remaining-lifespan estimate by material and exposure',
      'Insurance-ready format accepted by all major carriers',
      'Home-buyer negotiation support with photo evidence',
    ],
    longBody: [
      {
        heading: 'Why a professional roof inspection matters in San Francisco',
        paragraphs: [
          'Most San Francisco homes were built before 1970. Many of them still have their original framing, their original parapet walls, and at least three layers of historic roofing material stacked on top of each other. From the street you cannot see any of it. From a drone at 60 feet you can see all of it.',
          'A licensed San Francisco roofing service inspection is the difference between buying a home with five years of trouble-free roofing ahead of it and buying a home that needs a $20,000 replacement in eighteen months. We have written reports that have saved buyers tens of thousands of dollars at the negotiating table, and we have written reports that have given buyers the confidence to close on a beautiful Victorian without a roofing contingency renegotiation.',
        ],
      },
      {
        heading: 'What our inspection covers — drone, ladder, attic, report',
        paragraphs: [
          'Every inspection starts with a drone aerial sweep. We capture 4K imagery of every roof plane, every parapet, every chimney, every skylight, and every flashing detail. The drone footage forms the visual backbone of the report.',
          'Next is the ladder phase — the inspector physically walks (or carefully assesses, on steeply pitched hillside homes) every accessible roof surface. We probe soft spots, check fastener back-out, measure granule loss on composition shingles, inspect rubber seals on every penetration, and document any visible damage.',
          'When the attic is accessible we conduct a moisture and ventilation assessment from below. Stain patterns on the underside of the deck, daylight visible through nail penetrations, and inadequate ventilation are all signs the visible roof might be fine while the underlying assembly is not. Infrared scanning is available as an upgrade for suspected hidden moisture.',
          'The final deliverable is a written report (PDF, emailed within 24 hours) that includes every photo, a clear condition rating per roof component, an estimated remaining lifespan in years, and itemized recommendations split between "do now" and "plan within X years." Realtors love this format. So do insurance adjusters.',
        ],
      },
      {
        heading: 'Home-buyer inspections and SF real estate timelines',
        paragraphs: [
          'San Francisco real estate moves fast. Standard inspection contingencies run 7 to 14 days, and a roofing inspection competes with general, pest, foundation, and sewer inspections for that window. We schedule home-buyer inspections within 48 hours of request and deliver the written report within 24 hours of the on-site visit.',
          'For competing offers, a pre-listing roof inspection ordered by the seller is increasingly common in Noe Valley, Bernal Heights, and the Inner Sunset. A clean roof report attached to the disclosure package removes a negotiating lever for buyers and accelerates the close. We provide the same inspection package, labeled as a pre-listing report, with the same warranty on accuracy.',
          'If your inspection uncovers material issues, we draft a repair-cost estimate alongside the report so the buyer can negotiate from a position of evidence rather than fear. We do not pressure clients to use us for any subsequent work — inspection clients are inspection clients.',
        ],
      },
      {
        heading: 'Insurance inspections and the carrier-required format',
        paragraphs: [
          'Many San Francisco homeowners insurance carriers now require a roof condition report at policy renewal — particularly Lexington, Travelers, Mercury, and the surplus-lines carriers that absorbed homes dropped by State Farm and Allstate. The report has to follow a specific format: roof age, material, condition rating, estimated remaining life, and photographic evidence.',
          'We produce the carrier-required format on every insurance inspection. If your carrier has an unusual checklist, send it to us before the visit and we will incorporate it. We do not pad the rating to help your renewal — that gets the inspector and the insured in trouble — but we do give you an honest, defensible read on the roof and explain what (if anything) needs to be addressed to meet underwriting standards.',
          'Most insurance inspections take 45-90 minutes on-site. Pricing runs $250-$550 depending on roof size and complexity. Bundled with a future repair or replacement, the inspection cost is credited back to the project.',
        ],
      },
      {
        heading: 'Scheduling and what to expect',
        paragraphs: [
          'Same-day scheduling is usually available across the eight target SF zip codes (94102, 94103, 94110, 94112, 94114, 94116, 94122, 94124) plus every other neighborhood in the city. We request access details (gate codes, dog warnings, side-yard ladder positioning) at booking so the inspector arrives ready to work.',
          'You do not need to be home. We send a confirmation text when the inspector arrives, a second when the on-site phase is complete (typically 60-90 minutes later), and the written report by email within 24 hours. If you do want to walk the roof with us, schedule between 10 a.m. and 2 p.m. when fog has burned off and the surfaces are dry.',
          'Request a roof inspection through our homepage form or by direct email. For multi-property inspections (investors, property management firms), we offer volume pricing and consolidated reports — ask for the package quote at booking.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does a roof inspection cost in San Francisco?', a: 'Our inspections range from $250 to $550 depending on roof size and complexity. Drone aerial photography is always included. Bundled inspections (multi-property) and inspections credited toward future repair work are discounted.' },
      { q: 'How long does a roof inspection take?', a: 'On-site inspection runs 45 to 90 minutes. Drone footage adds 15 minutes. The full written report with photos, condition ratings, and remaining-lifespan estimate arrives by email within 24 hours.' },
      { q: 'Should I get a roof inspection before buying a home in SF?', a: 'Absolutely. Many SF homes have aging roofs not visible from the street. Our inspection reports have helped buyers negotiate thousands off purchase prices when issues were discovered, and given other buyers confidence to close without re-negotiation.' },
    ],
  },

  storm: {
    title: 'Storm Damage Roofing in San Francisco',
    metaTitle: 'Storm Damage Roof Repair San Francisco | 24-Hour SF Emergency Response',
    metaDesc: 'Storm damage roof repair San Francisco. 24-hour emergency tarping, insurance documentation, direct adjuster billing. Licensed SF roofing contractor. Free estimate.',
    headline: 'Storm Damage Roofing',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Emergency storm damage response for San Francisco homes. We tarp, document, repair, and handle your insurance claim — so you can focus on what matters. 24-hour response across every SF neighborhood, direct adjuster billing in most cases.',
    time: '24-hr response',
    price: 'Insurance covered',
    features: [
      '24-hour emergency response, 7 days a week',
      'Same-day emergency tarping to stop active leaks',
      'Full insurance damage documentation with timestamped photos',
      'Direct adjuster billing available — no out-of-pocket cost in most cases',
      'Temporary and permanent repairs by the same crew',
      'Re-inspection after every major storm system at no charge',
    ],
    longBody: [
      {
        heading: 'San Francisco storms and what they do to roofs',
        paragraphs: [
          'San Francisco does not get hurricanes, but the city absorbs more wind-driven rain than most coastal cities and the storms come in clusters. An atmospheric river in January can deliver 6-8 inches of rain over 72 hours, with sustained winds of 40-55 mph and gusts to 70. That assembly stresses every roof in town — flat roofs, pitched roofs, new builds, and century-old Victorians equally.',
          'The damage patterns we see most often after major SF storm events: wind-lifted shingles along the windward side of pitched roofs, displaced ridge caps and hip caps, torn or punctured flat-roof membranes where windborne debris struck the surface, cracked tile from impact, parapet-cap flashing peeled back by uplift, and gutters torn off the fascia by wind shear. Each of these is repairable, but the speed of the response determines whether the interior of the home suffers secondary damage.',
        ],
      },
      {
        heading: 'How the emergency response actually unfolds',
        paragraphs: [
          'First call: we triage by phone. If interior water is actively flowing, we dispatch within two hours regardless of time of day. If the damage is exterior-only with no active leak, we schedule the first visit within 24 hours. Our emergency line is staffed by real humans (not a voicemail tree) for the full duration of any National Weather Service storm advisory.',
          'On-site, the first crew installs an emergency tarp over any exposed roof deck — heavy 6-mil reinforced polyethylene, sandwiched between battens and screwed through the field of the tarp into solid sheathing. This is a temporary measure that holds for 2-4 weeks while permanent repairs are scheduled. Every tarp installation is photographed, GPS-stamped, and added to the insurance documentation packet.',
          'Permanent repair scheduling happens as soon as the storm has passed and the roof can be safely accessed. We try to avoid sending workers onto wet roofs during multi-day storm series — the safety risk is real and the work quality suffers. The tarp holds in the meantime.',
        ],
      },
      {
        heading: 'Insurance claims — what we handle, what you handle',
        paragraphs: [
          'Most homeowners are not roofers, and most homeowners have never filed a major insurance claim. That is fine. Our job during a storm-damage event includes walking you through the claim process step by step.',
          'Step one: you file the claim with your carrier. We can be on the phone while you do it — many carriers will accept a three-way call with the contractor on the line for clarity. Step two: we produce a written damage estimate and photo packet in the carrier-required format and send it to your adjuster. Step three: we meet the adjuster on-site for the inspection. This step is critical — adjusters miss damage when no one is there to point it out, and the resulting settlement is consistently 20-40% lower than it should be.',
          'Direct adjuster billing is available for most carriers (State Farm, Farmers, Allstate, Liberty Mutual, USAA, Travelers, AAA). With direct billing, the carrier pays us directly for the covered scope. You pay only the deductible. We do not "eat the deductible" — that practice is illegal in California and we will not engage in it.',
        ],
      },
      {
        heading: 'Documentation, photo evidence, and adjuster meetings',
        paragraphs: [
          'The single biggest reason storm-damage insurance claims get underpaid is poor documentation. Adjusters work fast, often inspect from the ground, and frequently miss damage that is plainly visible from the roof itself. Our photo evidence packet covers every roof plane with timestamped, GPS-stamped images, close-ups of every damaged component, and a written description tying each photo to a line item in the repair estimate.',
          'For larger claims (typically $10,000+), we recommend the adjuster meeting be scheduled within 7 days of the storm event. The longer the delay, the more "pre-existing condition" arguments the carrier can make. We schedule and attend these meetings as your advocate.',
          'If the initial settlement offer is materially lower than the actual cost of repair, we draft a supplement request with additional photo evidence and a revised line-item estimate. Most carriers accept reasonable supplements without escalation. If escalation is needed, we will refer you to a public adjuster — we do not act as one.',
        ],
      },
      {
        heading: 'After the storm — re-inspection and prevention',
        paragraphs: [
          'After every major storm system that affects San Francisco, we re-inspect every roof we have worked on in the past 24 months at no charge. This is part of our workmanship warranty. If something has shifted or sustained damage, we catch it before the next storm.',
          'For prevention, we recommend an annual roof maintenance program — a fall inspection before the rainy season starts, gutter and drain cleaning, sealant touch-ups on penetrations, and pre-emptive replacement of any single component (a cracked tile, a worn pipe boot) that would fail under storm load. The annual maintenance program costs less than a single insurance deductible and dramatically reduces claim frequency.',
          'To request emergency storm-damage service, use the homepage quote calculator (mark the request as Emergency) or email us directly. We respond 24/7 across San Francisco — Mission District, Twin Peaks, Sunset District, Richmond District, SOMA, Pacific Heights, Noe Valley, and every zip code in the city.',
        ],
      },
    ],
    faqs: [
      { q: 'What should I do immediately after storm damage to my SF roof?', a: 'Call us immediately for emergency tarping to prevent interior water damage. Move valuables away from active drips, photograph everything before cleanup, and file the insurance claim. We will document the damage and meet your adjuster on-site.' },
      { q: 'Will my insurance cover storm damage roof repairs in SF?', a: 'Yes — wind and storm damage is typically covered by homeowner\'s insurance. We work directly with your adjuster, handle all documentation, and bill the carrier directly in most cases. You pay only the deductible.' },
      { q: 'How fast can you respond to storm damage in San Francisco?', a: 'We guarantee a response within 24 hours for any storm-damage call, with same-day emergency tarping available for active leaks. The emergency line is staffed by real humans 24/7 during any National Weather Service storm advisory.' },
    ],
  },
};

export default function ServicePage({ service }) {
  const s = SERVICES[service];
  if (!s) return null;

  const slug = site.services.find((x) => x.id === service)?.slug ?? '';
  const canonical = `${site.domain.url}/${slug}`;

  // FAQPage rich-snippet schema — Google can surface these as expandable
  // accordions directly in search results for "[service] San Francisco" queries.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  // BreadcrumbList schema — helps Google show "Home › Services › <Service>"
  // breadcrumbs in the SERP instead of the bare URL.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: site.domain.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.domain.url}/#services` },
      { '@type': 'ListItem', position: 3, name: s.headline, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{s.metaTitle}</title>
        <meta name="description" content={s.metaDesc} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            {site.brand.name}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight mb-6">
            {s.headline}<br />
            <span className="text-zinc-950/50">{s.subline}</span>
          </h1>
          <div className="flex flex-wrap gap-4 mt-6">
            <span className="inline-flex items-center gap-2 bg-zinc-950/10 px-4 py-2 rounded-full text-sm font-semibold text-zinc-950">
              <Clock size={14} /> {s.time}
            </span>
            <span className="inline-flex items-center gap-2 bg-zinc-950/10 px-4 py-2 rounded-full text-sm font-semibold text-zinc-950">
              <ShieldCheck size={14} /> Licensed & Insured
            </span>
            <span className="inline-flex items-center gap-2 bg-zinc-950/10 px-4 py-2 rounded-full text-sm font-semibold text-zinc-950">
              {s.price}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          <div>
            <h2 className="text-3xl font-black text-white mb-6">{s.title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">{s.intro}</p>

            <h3 className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">What's Included</h3>
            <ul className="space-y-4">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-200 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            {/* CTA card */}
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-2xl font-black text-white mb-3">Get My Free Itemized Estimate</h3>
              <p className="text-zinc-500 text-sm mb-6">Answer 4 questions and receive a free itemized roofing estimate in your inbox &mdash; no commitment required.</p>
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold
                           text-zinc-950 bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           transition-all duration-300 shadow-[0_6px_24px_rgba(206,152,67,0.4)]"
              >
                Get My Free Itemized Estimate <ArrowRight size={16} />
              </Link>
              <a
                href={mailto}
                className="w-full flex items-center justify-center gap-2 mt-3 py-3 rounded-xl
                           border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500
                           text-sm font-medium transition-all duration-200"
              >
                Or email us directly
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {['CSLB Licensed', site.license.insuranceShort, '25-yr Warranty', `${site.city.short} Experts`].map((badge) => (
                <div key={badge} className="flex items-center gap-2 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <ShieldCheck size={14} className="text-gold flex-shrink-0" />
                  <span className="text-zinc-400 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Long-form local content — keyword-rich body that pushes each page past
            the 1,200-word threshold Google rewards for "near me" service queries. */}
        {s.longBody && (
          <article className="max-w-4xl mx-auto mt-24 space-y-12">
            {s.longBody.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-5 leading-tight">
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-zinc-300 text-base leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        )}

        {/* Service-area entity reinforcement — neighborhoods + zip codes on every
            service page. Mirrors the JSON-LD areaServed for crawler consistency. */}
        {site.serviceArea && (
          <div className="max-w-4xl mx-auto mt-20 p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-gold" />
              Service Areas Across San Francisco
            </h2>
            <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
              Licensed San Francisco roofing services delivered across every neighborhood and zip code in the city. We pull SF DBI permits and comply with all San Francisco Department of Building Inspection codes on every job.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Neighborhoods</p>
                <ul className="text-zinc-300 text-sm space-y-1.5">
                  {site.serviceArea.neighborhoods.map((n) => (
                    <li key={n.slug}>
                      <Link to={`/${n.slug}`} className="hover:text-gold transition-colors">{n.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Zip Codes</p>
                <ul className="text-zinc-300 text-sm space-y-1.5">
                  {site.serviceArea.zipCodes.map((z) => (
                    <li key={z}>{z}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {s.faqs.map(({ q, a }) => (
              <div key={q} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-white font-bold mb-3">{q}</h3>
                <p className="text-zinc-400 leading-relaxed">{a}</p>
              </div>
            ))}
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
