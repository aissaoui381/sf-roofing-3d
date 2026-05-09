import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const SLIDES = [
  { src: '/projects/material-asphalt.webp', label: 'Asphalt Shingles', desc: '20–30 yr lifespan · Most popular in SF' },
  { src: '/projects/material-tile.webp',    label: 'Spanish Tile',      desc: '50+ yr lifespan · Classic California look' },
  { src: '/projects/material-metal.webp',   label: 'Metal Roofing',     desc: '40–70 yr lifespan · Modern & durable' },
  { src: '/projects/material-tpo.webp',     label: 'Flat / TPO',        desc: '15–25 yr lifespan · Most SF flat roofs' },
];

const SERVICES = [
  {
    icon: '🏠', title: 'Roof Replacement', time: '2–5 days',
    desc: "Full tear-off and installation with a structural assessment, permit handling, and final city inspection. We leave every site cleaner than we found it.",
    features: ['Free structural assessment', 'Permit handling included', '25-year material warranty', 'Final city inspection'],
  },
  {
    icon: '🔧', title: 'Roof Repair', time: '1–2 days',
    desc: 'Targeted fixes for leaks, damaged shingles, flashing failures, and storm damage — with a workmanship guarantee on every repair.',
    features: ['Same-week scheduling', 'Leak-free guarantee', '5-year repair warranty', 'Photographic report'],
  },
  {
    icon: '🏗️', title: 'New Construction', time: 'Custom',
    desc: 'Collaborative roofing for new builds. We work directly with GCs and architects from blueprint review through stage inspections.',
    features: ['Blueprint & spec review', 'Material consulting', 'Stage inspections', 'Contractor coordination'],
  },
  {
    icon: '⚡', title: 'Storm Damage', time: 'Emergency',
    desc: "Emergency tarping, documentation, and full insurance claim support. We work directly with adjusters so you don't have to.",
    features: ['24-hr emergency response', 'Insurance documentation', 'Direct adjuster billing', 'Same-day tarping'],
  },
  {
    icon: '🔍', title: 'Roof Inspection', time: 'Same day',
    desc: 'Detailed written and photographic inspections for home purchases, insurance, or peace of mind. Drone photography included.',
    features: ['Drone aerial photography', 'Full written report', 'Lifespan estimate', 'Insurance-ready format'],
  },
  {
    icon: '♻️', title: 'Maintenance Plans', time: 'Ongoing',
    desc: 'Bi-annual inspections and proactive maintenance designed to extend roof life, catch issues early, and keep your warranty valid.',
    features: ['Bi-annual site visits', 'Priority emergency scheduling', 'Member pricing on repairs', 'Annual condition report'],
  },
];

const AUTO_MS = 5000;

function MaterialCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
  };

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  const go = (n) => { setIndex(n); startTimer(); };
  const slide = SLIDES[index];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-12 group shadow-xl border border-zinc-200">
      <div className="relative aspect-[4/3] sm:aspect-[16/7] overflow-hidden bg-zinc-100">
        <img
          key={index}
          src={slide.src}
          alt={slide.label}
          className="w-full h-full object-cover"
          style={{ animation: 'img-fade-in 0.6s ease forwards' }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Gold left-edge glow */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold/60 to-transparent" />

        {/* Label */}
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-1">
              Material Showcase
            </span>
            <p className="text-white font-bold text-xl">{slide.label}</p>
            <p className="text-zinc-300 text-sm">{slide.desc}</p>
          </div>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-gold' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/30">
          <div key={`pb-${index}`} className="h-full bg-gold"
            style={{ animation: `progress-fill ${AUTO_MS}ms linear forwards` }} />
        </div>

        {/* Hover arrows */}
        <button onClick={() => go((index - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                     bg-black/60 backdrop-blur-sm border border-white/10
                     flex items-center justify-center text-white
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => go((index + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                     bg-black/60 backdrop-blur-sm border border-white/10
                     flex items-center justify-center text-white
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(SERVICES[0]);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.srv-header', {
      y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    });
    gsap.from('.srv-body', {
      y: 50, opacity: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: '.srv-body', start: 'top 82%' },
    });
  }, { scope: containerRef });

  const selectedIndex = SERVICES.findIndex((s) => s.title === selected.title);

  return (
    <section id="services" ref={containerRef}
      className="py-24 px-6 md:px-16 lg:px-24 bg-white relative overflow-hidden">

      {/* Ambient gold glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/[0.06] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="srv-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-[1.05] tracking-tight">
              Complete Roofing Solutions
            </h2>
          </div>
          <p className="text-zinc-500 text-base leading-relaxed max-w-xs md:mb-2">
            From a missing shingle to a full Victorian flat re-roof — every project delivered with itemised pricing before we touch your home.
          </p>
        </div>

        <div className="srv-body">
          <MaterialCarousel />

          {/* Pill tab navigation */}
          <div className="flex flex-wrap gap-2 mb-10">
            {SERVICES.map((s) => (
              <button
                key={s.title}
                onClick={() => setSelected(s)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                  border transition-all duration-200
                  ${selected.title === s.title
                    ? 'bg-[#CE9843] text-zinc-950 border-[#CE9843] shadow-[0_4px_16px_rgba(206,152,67,0.35)] scale-[1.02]'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50'
                  }
                `}
              >
                <span className="text-base">{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Service detail */}
          <div className="relative grid md:grid-cols-2 gap-10 md:gap-20 pt-4">
            {/* Ghost index number */}
            <span
              aria-hidden
              className="hidden md:block absolute -top-6 right-0 text-[11rem] font-black text-gold/[0.07] leading-none select-none pointer-events-none tabular-nums"
            >
              {String(selectedIndex + 1).padStart(2, '0')}
            </span>

            <div className="relative">
              <span className="text-5xl block mb-5">{selected.icon}</span>
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">
                {selected.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full mb-6">
                <Clock size={11} className="text-gold" />
                Typical timeline: {selected.time}
              </span>
              <p className="text-zinc-600 text-base leading-relaxed">{selected.desc}</p>
            </div>

            <div className="relative flex flex-col justify-center">
              <p className="text-zinc-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
                What's included
              </p>
              <ul className="space-y-4 mb-8">
                {selected.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm
                           text-zinc-950 bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                           hover:from-[#d9ac63] hover:to-[#f0c870]
                           transition-all duration-300
                           shadow-[0_6px_24px_rgba(206,152,67,0.4)] hover:shadow-[0_8px_32px_rgba(206,152,67,0.6)]
                           hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
