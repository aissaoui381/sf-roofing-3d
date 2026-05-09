import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const STATS = [
  { value: 847,  suffix: '+',    label: 'Roofs Completed',     dur: 2   },
  { value: 15,   suffix: ' yrs', label: 'Years in Business',   dur: 1.5 },
  { value: 98,   suffix: '%',    label: 'Client Satisfaction', dur: 2   },
  { value: 24,   suffix: ' hrs', label: 'Emergency Response',  dur: 1.5 },
];

const BENEFITS = [
  {
    num: '01',
    title: 'Upfront Pricing',
    desc: 'Your itemised estimate arrives via email before any work begins — a full line-by-line breakdown with no hidden fees, ever.',
    detail: 'We email you a complete cost breakdown before we touch a single shingle. Every material, every labour hour, every permit — priced and explained.',
    accent: '#CE9843',
    bg: 'from-amber-500/[0.08] to-amber-100/[0.5]',
    border: 'border-amber-200',
  },
  {
    num: '02',
    title: 'Licensed & Insured',
    desc: 'Fully licensed in California (CSLB #1045782) with $2M liability coverage protecting you and your property on every project.',
    detail: 'Your home is protected from the moment our crew arrives. $2M liability policy, workers\' comp on every crew member, bonded and verified.',
    accent: '#e8b855',
    bg: 'from-orange-500/[0.08] to-orange-100/[0.5]',
    border: 'border-orange-200',
  },
  {
    num: '03',
    title: 'SF Architecture Experts',
    desc: "We know San Francisco's micro-climates, Victorian flats, Edwardian details, and building codes better than any general contractor.",
    detail: 'From fog-belt moisture barriers to Mission District flat roofs — we\'ve handled every SF roof type and every city permit requirement.',
    accent: '#f59e0b',
    bg: 'from-yellow-500/[0.08] to-yellow-100/[0.5]',
    border: 'border-yellow-200',
  },
  {
    num: '04',
    title: 'Fast, Respectful Teams',
    desc: 'Most repairs within 48 hours. We treat your home like our own — clean job sites, daily progress updates, no lingering crews.',
    detail: 'We show up on time, protect your landscaping, and clean up completely every day. You\'ll get a photo update each evening until the job is done.',
    accent: '#CE9843',
    bg: 'from-amber-400/[0.08] to-amber-100/[0.5]',
    border: 'border-amber-200',
  },
];

const AUTO_MS = 5000;

export default function WhyUs() {
  const containerRef = useRef(null);
  const statRefs     = useRef([]);
  const slideRef     = useRef(null);
  const timerRef     = useRef(null);
  const indexRef     = useRef(0);
  const leavingRef   = useRef(false);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next, dir) => {
    if (leavingRef.current || !slideRef.current) return;
    leavingRef.current = true;
    const xOut = dir >= 0 ? -40 : 40;
    gsap.to(slideRef.current, {
      x: xOut, opacity: 0, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        indexRef.current = next;
        setIndex(next);
        leavingRef.current = false;
        gsap.fromTo(slideRef.current,
          { x: -xOut, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
        );
      },
    });
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % BENEFITS.length;
      goTo(next, 1);
    }, AUTO_MS);
  }, [goTo]);

  const handleNav = (next, dir) => { goTo(next, dir); startTimer(); };
  const prev = () => handleNav((indexRef.current - 1 + BENEFITS.length) % BENEFITS.length, -1);
  const next = () => handleNav((indexRef.current + 1) % BENEFITS.length, 1);

  useGSAP(() => {
    gsap.from('.whyus-hero-text', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    });
    gsap.from('.house-img', {
      scale: 1.04, opacity: 0, duration: 1.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.house-img', start: 'top 82%' },
    });
    gsap.from('.stat-pill', {
      y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.stats-overlay', start: 'top 90%' },
    });

    statRefs.current.forEach((el, i) => {
      if (!el) return;
      const { value, suffix, dur } = STATS[i];
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value, duration: dur, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          });
        },
      });
    });

    gsap.from('.benefits-slider-wrap', {
      y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.benefits-slider-wrap', start: 'top 78%',
        onEnter: () => startTimer(),
      },
    });

    return () => clearInterval(timerRef.current);
  }, { scope: containerRef });

  const b = BENEFITS[index];
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={containerRef} className="overflow-hidden">

      {/* ── Inverted gold header ── */}
      <div className="bg-[#CE9843] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 50%)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end">
            <div className="whyus-hero-text">
              <span className="text-zinc-950/50 text-xs font-bold tracking-[0.25em] uppercase mb-5 block">
                Why Peak Roofing
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-950 leading-[1.0] tracking-tight">
                Built on Trust.<br />Proven by<br />Results.
              </h2>
            </div>
            <div className="md:mb-2">
              <p className="text-zinc-900 text-lg leading-relaxed max-w-sm mb-8">
                San Francisco homeowners trust us because we show our work — every cost, every step, every day of the project.
              </p>
              <button
                onClick={() => scrollTo('quote')}
                className="
                  group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                  bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm
                  transition-all duration-300
                  shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)]
                "
              >
                Get a Free Estimate
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Luxury house image with stats overlaid ── */}
      <div className="relative bg-zinc-100 overflow-hidden">
        <img
          src="/luxury-house.svg"
          alt="Luxury San Francisco home with premium roofing"
          className="house-img w-full object-cover"
          style={{ aspectRatio: '16/7' }}
        />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#CE9843]/10 to-transparent pointer-events-none" />
        <div className="stats-overlay absolute bottom-0 left-0 right-0">
          <div className="bg-white/90 backdrop-blur-md border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-200">
                {STATS.map(({ suffix, label }, i) => (
                  <div key={label} className="stat-pill py-6 md:py-8 text-center">
                    <div
                      ref={(el) => (statRefs.current[i] = el)}
                      className="text-3xl md:text-4xl lg:text-5xl font-black text-gold tabular-nums leading-none mb-1.5"
                    >
                      0{suffix}
                    </div>
                    <div className="text-zinc-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Benefits Slider ── */}
      <div className="bg-white py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto benefits-slider-wrap">

          {/* Slider header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
                Our Commitments
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight">
                What Sets Us Apart
              </h3>
            </div>

            {/* Counter + nav arrows */}
            <div className="flex items-center gap-4">
              <p className="text-2xl font-black tabular-nums hidden sm:block">
                <span className="text-gold">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-zinc-300 text-xl"> / </span>
                <span className="text-zinc-300">{String(BENEFITS.length).padStart(2, '0')}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-zinc-300 hover:border-gold/50 hover:bg-gold/[0.08]
                             flex items-center justify-center text-zinc-400 hover:text-gold
                             transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-zinc-300 hover:border-gold/50 hover:bg-gold/[0.08]
                             flex items-center justify-center text-zinc-400 hover:text-gold
                             transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Slide card */}
          <div
            ref={slideRef}
            className={`
              relative rounded-2xl border overflow-hidden
              bg-gradient-to-br ${b.bg} ${b.border}
              p-8 md:p-12 lg:p-16
            `}
          >
            {/* Giant ghost number */}
            <span
              aria-hidden
              className="absolute -right-4 -bottom-6 text-[12rem] md:text-[18rem] font-black leading-none select-none tabular-nums pointer-events-none"
              style={{ color: `${b.accent}15` }}
            >
              {b.num}
            </span>

            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${b.accent}, transparent)` }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left */}
              <div>
                <span
                  className="inline-block text-xs font-black tracking-[0.2em] uppercase mb-5 px-3 py-1 rounded-full border"
                  style={{ color: b.accent, borderColor: `${b.accent}40`, backgroundColor: `${b.accent}12` }}
                >
                  {b.num}
                </span>
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-[1.05] tracking-tight mb-5">
                  {b.title}
                </h4>
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
                  {b.desc}
                </p>
              </div>

              {/* Right */}
              <div className="space-y-5">
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed border-l-2 pl-5"
                   style={{ borderColor: `${b.accent}50` }}>
                  {b.detail}
                </p>
                <button
                  onClick={() => scrollTo('quote')}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm
                             text-zinc-950 transition-all duration-300
                             shadow-[0_6px_24px_rgba(206,152,67,0.4)] hover:shadow-[0_8px_32px_rgba(206,152,67,0.6)]
                             hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${b.accent}, #e8b855)`,
                  }}
                >
                  Get a Free Quote
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-6 justify-center">
            {BENEFITS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleNav(i, i > index ? 1 : -1)}
                className={`h-1 rounded-full transition-all duration-400 ${
                  i === index ? 'w-10 bg-gold' : 'w-2.5 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-progress bar */}
          <div className="mt-3 h-px bg-zinc-200 rounded-full overflow-hidden">
            <div
              key={`pb-${index}`}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${b.accent}, #e8b855)`,
                animation: `progress-fill ${AUTO_MS}ms linear forwards`,
              }}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
