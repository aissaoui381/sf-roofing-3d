import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ArrowRight, Award, Users, Clock } from 'lucide-react';
import { site } from '../site.config.js';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | {site.brand.name}</title>
        <meta name="description" content={`Learn about ${site.brand.name} — licensed roofing contractors with ${site.stats.yearsInBusiness}+ years serving ${site.city.short} homeowners. Transparent pricing, expert craftsmanship.`} />
        <link rel="canonical" href={`${site.domain.url}/about`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',  item: site.domain.url },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${site.domain.url}/about` },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white">

        {/* Header */}
        <div className="bg-[#CE9843] px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-zinc-950/60 text-sm font-medium hover:text-zinc-950 transition-colors mb-6 inline-block">
              ← Back to Home
            </Link>
            <p className="text-zinc-950/50 text-xs font-bold tracking-[0.25em] uppercase mb-4">Who We Are</p>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight">
              About {site.brand.headlineLineOne}<br />{site.brand.headlineLineTwo}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

            <div>
              <h2 className="text-3xl font-black text-white mb-6">{site.city.name}'s Trusted Roofing Specialists</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                For over {site.stats.yearsInBusiness} years, {site.brand.name} has been protecting {site.city.short} homes from the city's
                unique micro-climates — from the fog-drenched avenues of the Sunset to the sun-baked hillsides
                of Noe Valley.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                We specialize in Victorian flats, Edwardian rooflines, and modern builds. Every project starts
                with a full itemised estimate delivered to your inbox — so you know exactly what you're paying
                before we touch your home.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Fully licensed (CSLB), bonded, and carrying {site.license.insurance.replace(' Liability', '')} liability insurance on every project.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Award,       title: `${site.stats.projectsCompleted}+ Roofs Completed`,           desc: `Over ${site.stats.yearsInBusiness} years serving ${site.city.name} homeowners and property managers.` },
                { icon: ShieldCheck, title: 'Licensed & Insured',                                          desc: `CSLB licensed with ${site.license.insurance} coverage on every single project.` },
                { icon: Users,       title: `Local ${site.city.short} Experts`,                           desc: `We know ${site.city.short} building codes, micro-climates, and Victorian architecture.` },
                { icon: Clock,       title: `${site.stats.emergencyResponseHrs}-Hour Emergency Response`, desc: `Storm damage? We respond within ${site.stats.emergencyResponseHrs} hours, day or night.` },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-7xl mx-auto mt-16 p-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
            <p className="text-zinc-400 mb-8">Get a free itemised estimate delivered to your inbox in minutes.</p>
            <Link
              to="/#quote"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-zinc-950
                         bg-gradient-to-r from-[#CE9843] to-[#e8b855] hover:from-[#d9ac63] hover:to-[#f0c870]
                         transition-all duration-300 shadow-[0_6px_24px_rgba(206,152,67,0.4)]"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 md:px-16 lg:px-24 py-8 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-zinc-600 text-sm">
            <p>© {site.copyrightYear} {site.brand.name}. All rights reserved.</p>
            <div className="flex gap-6">
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
