import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { site, mailto } from '../site.config.js';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | {site.brand.name}</title>
        <meta name="description" content={`Contact ${site.brand.name}. Email us for a free estimate, emergency repairs, or any roofing question. Response within 2 business hours.`} />
        <link rel="canonical" href={`${site.domain.url}/contact`} />
      </Helmet>
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="bg-[#CE9843] px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-zinc-950/60 text-sm font-medium hover:text-zinc-950 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <p className="text-zinc-950/50 text-xs font-bold tracking-[0.25em] uppercase mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-white mb-4">We'd love to hear from you</h2>
              <p className="text-zinc-400 leading-relaxed">
                Have a roofing question? Need an emergency repair? Want to discuss a project?
                Email us and we'll get back to you within 2 business hours.
              </p>
            </div>

            {[
              { icon: Mail,    label: 'Email',         value: site.contact.email,        href: mailto },
              { icon: MapPin,  label: 'Service Area',  value: site.contact.serviceArea,  href: null },
              { icon: Clock,   label: 'Response Time', value: site.contact.responseTime, href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-gold font-semibold hover:text-gold-light transition-colors">{value}</a>
                  ) : (
                    <p className="text-white font-semibold">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 md:p-10 rounded-2xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-2xl font-black text-white mb-2">Get a Free Estimate</h3>
            <p className="text-zinc-500 text-sm mb-8">The fastest way to get a price — answer 4 questions and receive a full breakdown in your inbox.</p>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold
                         text-zinc-950 bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                         hover:from-[#d9ac63] hover:to-[#f0c870]
                         transition-all duration-300 shadow-[0_6px_24px_rgba(206,152,67,0.4)]"
            >
              Start Quote Calculator <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 py-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-zinc-600 text-sm">
          <p>© {site.copyrightYear} {site.brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-zinc-400 transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}
