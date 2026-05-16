import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { site, mailto } from '../site.config.js';

const SERVICES = {
  replacement: {
    title: 'Roof Replacement in San Francisco',
    metaTitle: 'Roof Replacement San Francisco | Licensed SF Roofing Contractor',
    metaDesc: 'Expert roof replacement in San Francisco. Full tear-off, installation, permits & inspection. Licensed (CSLB), insured, transparent pricing. Free estimate.',
    headline: 'Full Roof Replacement',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Complete roof replacement for San Francisco homes — from Victorian flats in the Mission to hillside homes in Twin Peaks. We handle everything from structural assessment to final city inspection.',
    time: '2–5 days',
    price: '$8,000 – $22,000',
    features: [
      'Full structural assessment before work begins',
      'All permits pulled and handled by us',
      'Your choice of asphalt shingles, metal, tile, or flat/TPO',
      '25-year material warranty + 5-year workmanship warranty',
      'Final city inspection included',
      'Site cleaned completely every day',
    ],
    faqs: [
      { q: 'How long does a roof replacement take in SF?', a: 'Most residential replacements take 2–5 days depending on size and material. We schedule around SF weather windows.' },
      { q: 'Do I need a permit for roof replacement in San Francisco?', a: 'Yes — full replacements require a permit from SF DBI. We handle all permit applications and inspections on your behalf.' },
      { q: 'What roofing materials work best in San Francisco?', a: 'For fog-belt neighborhoods we recommend modified bitumen or TPO for flat roofs, and Class A asphalt shingles or metal for pitched roofs.' },
    ],
  },
  repair: {
    title: 'Roof Repair in San Francisco',
    metaTitle: 'Roof Repair San Francisco | Same-Week Emergency Roof Repairs SF',
    metaDesc: 'Fast roof repairs in San Francisco. Leaks, damaged shingles, flashing, storm damage. Same-week scheduling, licensed & insured. Free itemised estimate.',
    headline: 'Roof Repair',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Targeted roof repairs for San Francisco homes — leaks, damaged shingles, flashing failures, and storm damage. We diagnose the root cause and fix it right the first time.',
    time: '1–2 days',
    price: '$500 – $3,500',
    features: [
      'Same-week scheduling available',
      'Photographic diagnosis report',
      'Leak-free workmanship guarantee',
      '5-year repair warranty',
      'Emergency tarping available 24/7',
      'Insurance claim documentation if needed',
    ],
    faqs: [
      { q: 'How quickly can you repair a leaking roof in SF?', a: 'We offer same-week scheduling for most repairs and 24-hour emergency tarping for active leaks.' },
      { q: 'How much does roof repair cost in San Francisco?', a: 'Minor repairs start around $500. Complex repairs involving flashing, valleys, or structural issues range $1,500–$3,500. You receive a full itemised estimate before any work begins.' },
      { q: 'Will my homeowner\'s insurance cover roof repairs?', a: 'Storm damage is typically covered. We provide full insurance documentation and can work directly with your adjuster.' },
    ],
  },
  inspection: {
    title: 'Roof Inspection in San Francisco',
    metaTitle: 'Roof Inspection San Francisco | Same-Day Roof Inspections SF',
    metaDesc: 'Professional roof inspections in San Francisco. Same-day availability, drone photography, full written report. Licensed inspector. Perfect for home buyers.',
    headline: 'Roof Inspection',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Detailed roof inspections for San Francisco home purchases, insurance requirements, or peace of mind. Full written and photographic report with drone aerial photography.',
    time: 'Same day',
    price: '$250 – $550',
    features: [
      'Same-day scheduling available',
      'Drone aerial photography included',
      'Full written condition report',
      'Remaining lifespan estimate',
      'Insurance-ready format',
      'Home-buyer negotiation support',
    ],
    faqs: [
      { q: 'How much does a roof inspection cost in San Francisco?', a: 'Our inspections range from $250–$550 depending on roof size and complexity. Drone photography is always included.' },
      { q: 'How long does a roof inspection take?', a: 'On-site inspection takes 45–90 minutes. You receive a full written report with photos within 24 hours.' },
      { q: 'Should I get a roof inspection before buying a home in SF?', a: 'Absolutely. Many SF homes have aging roofs that aren\'t visible from the street. Our inspection reports have helped buyers negotiate thousands off purchase prices.' },
    ],
  },
  storm: {
    title: 'Storm Damage Roofing in San Francisco',
    metaTitle: 'Storm Damage Roof Repair San Francisco | 24-Hour Emergency Response',
    metaDesc: '24-hour storm damage roof repair in San Francisco. Emergency tarping, insurance documentation, direct adjuster billing. Licensed & insured SF roofing contractor.',
    headline: 'Storm Damage Roofing',
    subline: `${site.city.name}, ${site.city.state}`,
    intro: 'Emergency storm damage response for San Francisco homes. We tarp, document, repair, and handle your insurance claim — so you can focus on what matters.',
    time: '24-hr response',
    price: 'Insurance covered',
    features: [
      '24-hour emergency response',
      'Same-day emergency tarping',
      'Full insurance damage documentation',
      'Direct adjuster billing available',
      'Temporary and permanent repairs',
      'No out-of-pocket cost in most cases',
    ],
    faqs: [
      { q: 'What should I do immediately after storm damage to my SF roof?', a: 'Call us immediately for emergency tarping to prevent interior water damage. We\'ll document everything for your insurance claim.' },
      { q: 'Will my insurance cover storm damage roof repairs in SF?', a: 'Yes — storm damage is typically covered by homeowner\'s insurance. We work directly with your adjuster and handle all documentation.' },
      { q: 'How fast can you respond to storm damage in San Francisco?', a: 'We guarantee a response within 24 hours, with same-day emergency tarping available for active leaks.' },
    ],
  },
};

export default function ServicePage({ service }) {
  const s = SERVICES[service];
  if (!s) return null;

  const slug = site.services.find((x) => x.id === service)?.slug ?? '';

  return (
    <>
      <Helmet>
        <title>{s.metaTitle}</title>
        <meta name="description" content={s.metaDesc} />
        <link rel="canonical" href={`${site.domain.url}/${slug}`} />
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
              <h3 className="text-2xl font-black text-white mb-3">Get a Free Estimate</h3>
              <p className="text-zinc-500 text-sm mb-6">Answer 4 questions and receive a full itemised breakdown in your inbox — no commitment required.</p>
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold
                           text-zinc-950 bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           transition-all duration-300 shadow-[0_6px_24px_rgba(206,152,67,0.4)]"
              >
                Get a Free Quote <ArrowRight size={16} />
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
