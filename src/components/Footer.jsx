import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, ShieldCheck, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { site, mailto } from '../site.config.js';

const SERVICES = [
  ...site.services.map((s) => ({ label: s.label, href: `/${s.slug}` })),
  { label: 'New Construction', href: '/#services' },
  { label: 'Maintenance Plans', href: '/#services' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer id="about" className="bg-zinc-50 relative overflow-hidden border-t border-zinc-200">

      {/* Gold gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Ambient glow behind brand area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
                      bg-gold/[0.05] rounded-full blur-3xl pointer-events-none" />

      {/* ── Brand header ── */}
      <div className="relative px-6 md:px-16 lg:px-24 pt-16 pb-14 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center flex-shrink-0
                              shadow-[0_4px_16px_rgba(206,152,67,0.4)]">
                <span className="text-zinc-950 font-black text-sm tracking-tight">{site.brand.shortBadge}</span>
              </div>
              <div>
                <p className="text-zinc-900 font-black text-lg tracking-tight leading-none">
                  {site.brand.name}
                </p>
                <p className="text-zinc-400 text-xs mt-0.5">{site.domain.host}</p>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              {site.brand.descriptor}
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
                href={mailto}
                className="flex items-center gap-2.5 text-[#CE9843] hover:text-[#B8832A] transition-colors duration-200 text-sm font-medium"
              >
                <Mail size={14} className="flex-shrink-0" />
                {site.contact.email}
              </a>
              <p className="text-zinc-400 text-xs">All enquiries answered within 2 business hours.</p>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin size={14} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                <p className="text-zinc-500 text-sm">{site.contact.serviceArea}</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Facebook,  href: site.social.facebook,  label: 'Facebook' },
                  { icon: Instagram, href: site.social.instagram, label: 'Instagram' },
                  { icon: Twitter,   href: site.social.twitter,   label: 'X / Twitter' },
                  { icon: Youtube,   href: site.social.youtube,   label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-gold/10 border border-zinc-200 hover:border-gold/40
                               flex items-center justify-center text-zinc-400 hover:text-gold transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <p className="text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">Credentials</p>
            <div className="space-y-3">
              {[
                site.license.cslbLabel,
                `Fully Insured · ${site.license.insurance}`,
                site.license.warranty,
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
      <div className="px-6 md:px-16 lg:px-24 py-5 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-xs">© {site.copyrightYear} {site.brand.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/about" className="text-zinc-400 hover:text-zinc-600 text-xs transition-colors">About</Link>
            <Link to="/contact" className="text-zinc-400 hover:text-zinc-600 text-xs transition-colors">Contact</Link>
            <Link to="/privacy" className="text-zinc-400 hover:text-zinc-600 text-xs transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
