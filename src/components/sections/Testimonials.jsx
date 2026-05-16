import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  {
    name: 'Derek Huang',
    role: 'Landlord',
    location: 'Richmond District',
    initials: 'DH',
    text: 'Emergency response was outstanding — a storm hit Sunday night and they had a crew tarping my roof by Monday morning. Insurance claim handled completely on their end.',
    highlight: 'A crew tarping my roof by Monday morning.',
  },
];

const CARD_W  = 360;
const GAP     = 24;
const TOTAL_W = REVIEWS.length * (CARD_W + GAP); // one full set width
const PX_PER_SEC = TOTAL_W / 90;                 // 90-second loop

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="fill-[#CE9843] text-[#CE9843]" />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  const containerRef  = useRef(null);
  const trackRef      = useRef(null);
  const xRef          = useRef(0);
  const nudgingRef    = useRef(false);

  useGSAP(() => {
    gsap.from('.testi-header', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    });

    // GSAP ticker drives the loop — so buttons can interact with xRef directly
    const tick = (_, deltaTime) => {
      if (nudgingRef.current) return;
      xRef.current -= PX_PER_SEC * (deltaTime / 1000);
      if (xRef.current < -TOTAL_W) xRef.current += TOTAL_W;
      gsap.set(trackRef.current, { x: xRef.current });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, { scope: containerRef });

  const nudge = (dir) => {
    nudgingRef.current = true;
    const start = xRef.current;
    const end   = start - dir * (CARD_W + GAP);
    const proxy = { v: start };

    gsap.to(proxy, {
      v: end,
      duration: 0.55,
      ease: 'power2.inOut',
      onUpdate() {
        xRef.current = proxy.v;
        // Keep in [-TOTAL_W, 0) so the loop never breaks
        if (xRef.current < -TOTAL_W) xRef.current += TOTAL_W;
        if (xRef.current > 0)        xRef.current -= TOTAL_W;
        gsap.set(trackRef.current, { x: xRef.current });
      },
      onComplete() { nudgingRef.current = false; },
    });
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(206,152,67,0.06) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative mb-12">
        <div className="testi-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#CE9843] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-[1.05] tracking-tight">
              What Homeowners Say
            </h2>
          </div>

          <div className="flex items-center gap-6 md:mb-2">
            {/* Aggregate rating */}
            <div className="flex items-center gap-2.5">
              <GoogleLogo />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-zinc-900">5.0</span>
                  <span className="text-zinc-400 text-xs">/ 5</span>
                </div>
                <Stars />
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-200" />

            {/* Nav buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => nudge(-1)}
                className="w-10 h-10 rounded-full border border-zinc-300 hover:border-[#CE9843]/50 hover:bg-[#CE9843]/[0.06]
                           flex items-center justify-center text-zinc-400 hover:text-[#CE9843] transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => nudge(1)}
                className="w-10 h-10 rounded-full border border-zinc-300 hover:border-[#CE9843]/50 hover:bg-[#CE9843]/[0.06]
                           flex items-center justify-center text-zinc-400 hover:text-[#CE9843] transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling track — full bleed, no hover pause */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP}px`, paddingLeft: `${GAP}px`, width: 'max-content' }}
        >
          {/* Render 3× so wrap is never visible */}
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-zinc-200 flex-shrink-0
                         shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(206,152,67,0.12)]
                         hover:border-[#CE9843]/30 transition-shadow transition-[border-color] duration-300
                         overflow-hidden flex flex-col"
              style={{ width: `${CARD_W}px` }}
            >
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ background: 'linear-gradient(90deg, #CE9843, #e8b855, transparent)' }}
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <Stars />
                  <div className="flex items-center gap-1.5">
                    <GoogleLogo />
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Google</span>
                  </div>
                </div>

                <blockquote className="flex-1">
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">{r.text}</p>
                  <p className="text-sm font-semibold leading-snug border-l-2 pl-3"
                     style={{ color: '#CE9843', borderColor: '#CE9843' }}>
                    "{r.highlight}"
                  </p>
                </blockquote>

                <div className="h-px bg-zinc-100 my-4" />

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs text-zinc-950"
                    style={{ background: 'linear-gradient(135deg, #CE9843, #e8b855)' }}
                  >
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-zinc-900 font-bold text-sm leading-tight">{r.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={9} className="text-[#CE9843] flex-shrink-0" />
                      <p className="text-zinc-400 text-xs truncate">{r.role} · {r.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
           style={{ background: 'linear-gradient(90deg, #f4f4f5, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
           style={{ background: 'linear-gradient(-90deg, #f4f4f5, transparent)' }} />
    </section>
  );
}
