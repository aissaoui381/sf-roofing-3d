import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, ShieldCheck } from 'lucide-react';

const SERVICES = [
  { label: 'Roof Replacement', href: '/roof-replacement-san-francisco' },
  { label: 'Roof Repair',      href: '/roof-repair-san-francisco' },
  { label: 'Roof Inspection',  href: '/roof-inspection-san-francisco' },
  { label: 'Storm Damage',     href: '/storm-damage-roofing-san-francisco' },
  { label: 'New Construction', href: '/#services' },
  { label: 'Maintenance Plans',href: '/#services' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer id="about" className="bg-zinc-950 relative overflow-hidden">

      {/* Gold gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Ambient glow behind brand area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
                      bg-gold/[0.06] rounded-full blur-3xl pointer-events-none" />

      {/* ── Brand header ── */}
      <div className="relative px-6 md:px-16 lg:px-24 pt-16 pb-14 border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center flex-shrink-0
                              shadow-[0_4px_16px_rgba(206,152,67,0.4)]">
                <span className="text-zinc-950 font-black text-sm tracking-tight">SF</span>
              </div>
              <div>
                <p className="text-white font-black text-lg tracking-tight leading-none">
                  San Francisco Roofing Service
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">SanFranciscoRoofingService.com</p>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              San Francisco's trusted roofing specialists. Transparent pricing, premium materials, and results built to last.
            </p>
          </div>

          <button
            onClick={() => scrollTo('quote')}
            className="
              group flex items-center gap-2 px-6 py-3.5 rounded-xl flex-shrink-0
              bg-gradient-to-r from-[#CE9843] to-[#e8b855]
              hover:from-[#d9ac63] hover:to-[#f0c870]
              text-zinc-950 font-bold text-sm
              transition-all duration-300
              shadow-[0_4px_20px_rgba(206,152,67,0.4)] hover:shadow-[0_6px_30px_rgba(206,152,67,0.6)]
              hover:-translate-y-0.5
            "
          >
            Get a Free Estimate
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative px-6 md:px-16 lg:px-24 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* Services */}
          <div>
            <p className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-zinc-500 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">Contact</p>
            <div className="space-y-4">
              <a
                href="mailto:INFO@SanFranciscoRoofingService.com"
                className="flex items-center gap-2.5 text-gold hover:text-gold-light transition-colors duration-200 text-sm font-medium"
              >
                <Mail size={14} className="flex-shrink-0" />
                INFO@SanFranciscoRoofingService.com
              </a>
              <p className="text-zinc-600 text-xs">All enquiries answered within 2 business hours.</p>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin size={14} className="text-zinc-600 flex-shrink-0 mt-0.5" />
                <p className="text-zinc-500 text-sm">San Francisco & Bay Area</p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <p className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">Credentials</p>
            <div className="space-y-3">
              {[
                'CSLB Licensed #1045782',
                'Fully Insured · $2M Liability',
                '25-Year Workmanship Warranty',
                'EPA Lead-Safe Certified',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <ShieldCheck size={13} className="text-gold flex-shrink-0" />
                  <span className="text-zinc-500 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-6 md:px-16 lg:px-24 py-5 border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-xs">© 2025 San Francisco Roofing Service. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/about" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">About</Link>
            <Link to="/contact" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Contact</Link>
            <Link to="/privacy" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
