import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Star, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Maria Santos',
    role: 'Homeowner',
    location: 'Mission District',
    initials: 'MS',
    text: 'They replaced our 40-year-old roof in 3 days. The estimate I received by email was exactly what I paid — not a penny more. The team was professional, fast, and incredibly tidy.',
    highlight: 'Exactly what I paid — not a penny more.',
  },
  {
    name: 'James Okonkwo',
    role: 'Property Manager',
    location: 'SOMA',
    initials: 'JO',
    text: 'I manage 8 residential properties in the city and Peak Roofing handles all of them. Their itemised estimates are so detailed I can plan maintenance budgets 6 months in advance.',
    highlight: 'I can plan maintenance budgets 6 months in advance.',
  },
  {
    name: 'Chloe Bergmann',
    role: 'Homebuyer',
    location: 'Noe Valley',
    initials: 'CB',
    text: 'We needed a roof inspection before closing. They were on-site within 24 hours and the report helped us negotiate $8,000 off the purchase price. Worth every cent.',
    highlight: 'Helped us negotiate $8,000 off the purchase price.',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#CE9843] text-[#CE9843]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.testi-header', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    });
    gsap.from('.review-card', {
      y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.reviews-grid', start: 'top 82%' },
    });
  }, { scope: containerRef });

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 px-6 md:px-16 lg:px-24 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(206,152,67,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="testi-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[#CE9843] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-[1.05] tracking-tight">
              What Homeowners Say
            </h2>
          </div>

          {/* Aggregate rating badge */}
          <div className="flex items-center gap-4 md:mb-2">
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-zinc-900">5.0</span>
                <span className="text-zinc-400 text-sm font-medium">/ 5</span>
              </div>
              <Stars />
              <span className="text-zinc-400 text-xs mt-1">Based on Google Reviews</span>
            </div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-zinc-200 bg-white"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="reviews-grid grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="review-card group relative bg-white rounded-2xl border border-zinc-200
                         shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(206,152,67,0.12)]
                         hover:border-[#CE9843]/30 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Gold top accent */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #CE9843, #e8b855, transparent)' }}
              />

              <div className="p-7 flex flex-col flex-1">
                {/* Stars + source */}
                <div className="flex items-center justify-between mb-5">
                  <Stars />
                  <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Google</span>
                </div>

                {/* Highlighted quote */}
                <blockquote className="flex-1">
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {r.text}
                  </p>
                  <p
                    className="text-sm font-semibold leading-snug border-l-2 pl-3"
                    style={{ color: '#CE9843', borderColor: '#CE9843' }}
                  >
                    "{r.highlight}"
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-zinc-100 my-5" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm text-zinc-950"
                    style={{ background: 'linear-gradient(135deg, #CE9843, #e8b855)' }}
                  >
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-900 font-bold text-sm leading-tight">{r.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-[#CE9843] flex-shrink-0" />
                      <p className="text-zinc-400 text-xs truncate">{r.role} · {r.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
