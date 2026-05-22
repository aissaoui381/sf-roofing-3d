import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Download, Copy, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useState } from 'react';
import { site, mailto } from '../site.config.js';

// Boilerplate copy in three lengths — journalists, podcast hosts, and
// partner sites all need different word counts. Make all three trivially
// copy-able.
const BOILERPLATE = {
  short: `${site.brand.name} is a CSLB-licensed roofing contractor serving every San Francisco neighborhood — from Pacific Heights to the Outer Sunset. Specialties include Victorian flat re-roofing, hillside replacement, and 24-hour emergency leak repair. Over ${site.stats.projectsCompleted} SF roofs completed.`,
  medium: `${site.brand.name} is a CSLB-licensed (#${site.license.cslbNumber}), fully insured roofing contractor based in San Francisco. The team specializes in Victorian and Edwardian flat re-roofing in the Mission and Sunset Districts, hillside replacement in Twin Peaks and Pacific Heights, and 24-hour emergency leak repair across every SF zip code. Every estimate is delivered itemized — materials, labor, permits, and timeline — before any work begins. ${site.stats.projectsCompleted}+ SF roofs completed over ${site.stats.yearsInBusiness} years.`,
  long: `${site.brand.name} is a CSLB-licensed (#${site.license.cslbNumber}), fully insured San Francisco roofing contractor specializing in residential and commercial roofing across the City and County of San Francisco. Founded by a team with roots in SF construction, the company has completed over ${site.stats.projectsCompleted} roofs in ${site.stats.yearsInBusiness}+ years of operation, with a focus on three areas the rest of the SF roofing market handles poorly: Victorian and Edwardian flat re-roofing in the Mission, Sunset, and Noe Valley; hillside replacement on steep-pitch homes in Twin Peaks, Pacific Heights, and St. Francis Wood; and 24-hour emergency leak response across every neighborhood during atmospheric river events. The business is built around three principles. Every estimate is fully itemized before work begins — no "miscellaneous" lines, no surprise change orders without written approval. Every project is permit-compliant through the San Francisco Department of Building Inspection. And every repair is backed by a written workmanship warranty — five years on repairs, 25 years on replacements. The company holds ${site.license.insurance} liability insurance, is EPA Lead-Safe Certified, and is staffed by crews trained on SF-specific roofing assemblies — coastal fog corrosion, salt-air exposure, wind-driven rain at the Pacific edge.`,
};

const FAST_FACTS = [
  { label: 'CSLB License',     value: `#${site.license.cslbNumber}` },
  { label: 'Years in Business', value: `${site.stats.yearsInBusiness}+` },
  { label: 'Roofs Completed',  value: `${site.stats.projectsCompleted}+` },
  { label: 'Liability Insurance', value: site.license.insurance },
  { label: 'Service Area',     value: 'San Francisco & Bay Area' },
  { label: 'Founded',          value: 'San Francisco, CA' },
];

const BRAND_COLORS = [
  { name: 'Gold',       hex: '#CE9843', use: 'Primary accent, CTAs' },
  { name: 'Gold light', hex: '#DD9E3A', use: 'Hero headline, hover states' },
  { name: 'Gold deep',  hex: '#B8832A', use: 'Active states' },
  { name: 'Onyx',       hex: '#09090b', use: 'Hero, footers' },
  { name: 'Slate 950',  hex: '#0d0d0d', use: 'Dark surfaces' },
];

const QUOTES = [
  {
    quote: 'Most San Francisco housing stock predates the modern roofing assembly. The job is not just to install a roof — it is to build the right roof for a 120-year-old Victorian sitting in a marine environment.',
    attribution: 'San Francisco Roofing Service',
  },
  {
    quote: 'A residential roof replacement in San Francisco is never one job — it is the right job for the right house, on the right street, in the right microclimate. Twin Peaks, the Mission, the Outer Sunset — each demands a different specification.',
    attribution: 'San Francisco Roofing Service',
  },
  {
    quote: 'Every estimate we send is line-item itemized. No "miscellaneous" line. No "contingency" markup. If a dry-rot issue is discovered during tear-off, the homeowner sees a photo, a written change order, and a price before any extra work happens.',
    attribution: 'San Francisco Roofing Service',
  },
];

const COVERAGE_PLACEHOLDER = [
  // Add real press hits here as they appear, e.g.:
  // { outlet: 'SF Examiner', headline: 'SF Roofs After the 2026 Atmospheric Rivers', date: '2026-03-15', url: 'https://...' },
];

const EMBED_BADGE_HTML = `<a href="https://sanfranciscoroofingservices.com" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#09090b;color:#CE9843;font-family:system-ui,sans-serif;font-weight:700;font-size:13px;text-decoration:none;border-radius:8px;border:1px solid #CE9843">
  <span style="display:inline-block;width:8px;height:8px;background:#CE9843;border-radius:50%"></span>
  Roofing by San Francisco Roofing Service
</a>`;

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  const click = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };
  return (
    <button
      onClick={click}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-700 transition-colors"
    >
      <Copy size={12} />
      {copied ? 'Copied!' : label}
    </button>
  );
}

export default function PressKitPage() {
  const canonical = `${site.domain.url}/press`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: site.domain.url },
      { '@type': 'ListItem', position: 2, name: 'Press', item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Press Kit & Media | {site.brand.name}</title>
        <meta name="description" content={`Press kit for ${site.brand.name} — boilerplate copy, brand assets, fast facts, and media contact for journalists covering San Francisco roofing, housing, and construction.`} />
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
              For Journalists, Bloggers & Partners
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight mb-6">
              Press &amp; Media Kit
            </h1>
            <p className="text-zinc-950/80 text-lg max-w-2xl">
              Everything you need to write about, link to, or quote {site.brand.name}.
              Logos, boilerplate copy, fast facts, and a press contact below.
            </p>
          </div>
        </div>

        <div className="px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-4xl mx-auto space-y-20">

            {/* Press Contact */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Press Contact</h2>
              <p className="text-zinc-400 mb-5">
                For interviews, expert commentary on San Francisco roofing, or asset requests outside this page.
              </p>
              <a
                href={`${mailto}?subject=Press%20inquiry`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
                           bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           text-zinc-950 font-bold text-sm transition-all duration-300
                           shadow-[0_4px_20px_rgba(206,152,67,0.35)]"
              >
                <Mail size={15} /> {site.contact.email}
              </a>
              <p className="text-zinc-500 text-xs mt-3">
                Response time: typically within {site.contact.responseTime.toLowerCase()}.
              </p>
            </section>

            {/* Fast Facts */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5">Fast Facts</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {FAST_FACTS.map((f) => (
                  <div key={f.label} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-zinc-500 text-xs font-bold tracking-[0.15em] uppercase">{f.label}</span>
                    <span className="text-white font-bold text-sm">{f.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Boilerplate */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Boilerplate Copy</h2>
              <p className="text-zinc-400 mb-6">
                Three lengths for different formats. Click Copy and paste straight into your draft.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-sm tracking-wide">Short (~50 words)</h3>
                    <CopyButton text={BOILERPLATE.short} />
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{BOILERPLATE.short}</p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-sm tracking-wide">Medium (~100 words)</h3>
                    <CopyButton text={BOILERPLATE.medium} />
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{BOILERPLATE.medium}</p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-sm tracking-wide">Long (~250 words)</h3>
                    <CopyButton text={BOILERPLATE.long} />
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{BOILERPLATE.long}</p>
                </div>
              </div>
            </section>

            {/* Brand Assets */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Brand Assets</h2>
              <p className="text-zinc-400 mb-6">
                Logo, favicon, and brand colors. Please use the brand at full opacity and never alter the colors or proportions.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a
                  href="/favicon.svg"
                  download
                  className="flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gold transition-colors group"
                >
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Logo (SVG)</p>
                    <p className="text-zinc-500 text-xs">Vector — any size, any background</p>
                  </div>
                  <Download size={18} className="text-zinc-500 group-hover:text-gold transition-colors" />
                </a>

                <a
                  href="/og-image.jpg"
                  download
                  className="flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gold transition-colors group"
                >
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Hero image (JPG)</p>
                    <p className="text-zinc-500 text-xs">1200×630 — social cards, article headers</p>
                  </div>
                  <Download size={18} className="text-zinc-500 group-hover:text-gold transition-colors" />
                </a>
              </div>

              <h3 className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Color Palette</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BRAND_COLORS.map((c) => (
                  <div key={c.hex} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg border border-zinc-700" style={{ background: c.hex }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm">{c.name}</p>
                        <p className="text-zinc-500 text-xs font-mono">{c.hex}</p>
                      </div>
                      <CopyButton text={c.hex} label="" />
                    </div>
                    <p className="text-zinc-500 text-[11px]">{c.use}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Embeddable Badge */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Embeddable Badge</h2>
              <p className="text-zinc-400 mb-5">
                Partner sites, supplier directories, and customers showcasing their roofing project can embed this badge. Copy the HTML and paste it into any page.
              </p>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4 flex justify-center">
                <a href={site.domain.url} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 text-gold font-bold text-sm rounded-lg border border-gold no-underline">
                  <span className="w-2 h-2 bg-gold rounded-full" />
                  Roofing by {site.brand.name}
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-zinc-500 text-xs font-bold tracking-[0.15em] uppercase">HTML</p>
                  <CopyButton text={EMBED_BADGE_HTML} />
                </div>
                <pre className="text-zinc-400 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {EMBED_BADGE_HTML}
                </pre>
              </div>
            </section>

            {/* Quotes & Soundbites */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Quotes & Soundbites</h2>
              <p className="text-zinc-400 mb-6">
                Pre-approved quotes you can attribute to {site.brand.name} without an interview. For original commentary on a specific story, contact us.
              </p>
              <div className="space-y-4">
                {QUOTES.map((q, i) => (
                  <blockquote key={i} className="p-6 rounded-2xl bg-zinc-900 border-l-4 border-gold border-r border-y border-r-zinc-800 border-y-zinc-800">
                    <p className="text-zinc-200 leading-relaxed italic mb-3">&ldquo;{q.quote}&rdquo;</p>
                    <footer className="flex items-center justify-between gap-3">
                      <cite className="text-zinc-500 text-xs not-italic">— {q.attribution}</cite>
                      <CopyButton text={`"${q.quote}" — ${q.attribution}`} />
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Credentials */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-5">Credentials & Certifications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  site.license.cslbLabel,
                  `Fully Insured · ${site.license.insurance} Liability`,
                  '25-Year Workmanship Warranty',
                  'EPA Lead-Safe Certified',
                  'SF DBI Permit Compliant',
                  'Bonded California Contractor',
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <ShieldCheck size={16} className="text-gold flex-shrink-0" />
                    <span className="text-zinc-200 text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Coverage */}
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Recent Coverage</h2>
              {COVERAGE_PLACEHOLDER.length === 0 ? (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                  <Award size={24} className="text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-500 text-sm">
                    Press hits will be posted here as they happen. Writing a piece that should be on this list?{' '}
                    <a href={mailto} className="text-gold hover:underline">Let us know.</a>
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {COVERAGE_PLACEHOLDER.map((c) => (
                    <li key={c.url} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 group">
                        <div>
                          <p className="text-gold text-xs font-bold tracking-wide uppercase mb-1">{c.outlet} · {c.date}</p>
                          <p className="text-white font-bold">{c.headline}</p>
                        </div>
                        <ArrowRight size={16} className="text-zinc-500 group-hover:text-gold flex-shrink-0 transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* CTA / Press Contact again */}
            <section className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <h2 className="text-2xl font-black text-white mb-3">Need Something Not Listed Here?</h2>
              <p className="text-zinc-400 text-sm mb-6 max-w-xl mx-auto">
                Project photos, expert quotes on a specific SF roofing story, or interview availability —
                reach out and we&apos;ll get back to you within {site.contact.responseTime.toLowerCase()}.
              </p>
              <a
                href={`${mailto}?subject=Press%20inquiry`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           text-zinc-950 font-bold text-sm transition-all duration-300"
              >
                <Mail size={15} /> Contact press team
              </a>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-16 lg:px-24 py-8 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-zinc-600 text-sm">
            <p>© {site.copyrightYear} {site.brand.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-zinc-400 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
              <Link to="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
