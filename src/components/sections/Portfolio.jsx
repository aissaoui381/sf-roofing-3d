import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    neighborhood: 'Mission District',
    service: 'Roof Replacement',
    detail: 'Flat / TPO Membrane — 3,200 sq ft',
    year: '2024',
    roofType: 'flat',
    skyA: '#3d1a00',
    skyB: '#150900',
    slug: '/roof-replacement-san-francisco',
    img: '/projects/mission.png',
    alt: 'Flat TPO roof replacement Mission District San Francisco',
  },
  {
    neighborhood: 'Noe Valley',
    service: 'Roof Repair',
    detail: 'Flashing, Ridge & Valley Repair',
    year: '2024',
    roofType: 'victorian',
    skyA: '#001833',
    skyB: '#000b1a',
    slug: '/roof-repair-san-francisco',
    img: '/projects/noe-valley.png',
    alt: 'Roof repair flashing Noe Valley San Francisco',
  },
  {
    neighborhood: 'Twin Peaks',
    service: 'Storm Damage',
    detail: 'Emergency Response + Full Rebuild',
    year: '2025',
    roofType: 'pitched',
    skyA: '#1a001a',
    skyB: '#080008',
    slug: '/storm-damage-roofing-san-francisco',
    img: '/projects/twin-peaks.png',
    alt: 'Storm damage roof repair Twin Peaks San Francisco',
  },
  {
    neighborhood: 'Sunset District',
    service: 'Roof Replacement',
    detail: 'Class A Architectural Shingles',
    year: '2024',
    roofType: 'pitched',
    skyA: '#2d1800',
    skyB: '#0d0700',
    slug: '/roof-replacement-san-francisco',
    img: '/projects/Sunset.png',
    alt: 'Asphalt shingle roof replacement Sunset District San Francisco',
  },
  {
    neighborhood: 'Pacific Heights',
    service: 'Roof Inspection',
    detail: 'Pre-Sale Report + Drone Survey',
    year: '2025',
    roofType: 'victorian',
    skyA: '#001a2e',
    skyB: '#00080f',
    slug: '/roof-inspection-san-francisco',
    img: '/projects/pacific-heights.png',
    alt: 'Roof inspection Pacific Heights San Francisco',
  },
  {
    neighborhood: 'Richmond District',
    service: 'Roof Replacement',
    detail: 'Standing Seam Metal — 50yr warranty',
    year: '2025',
    roofType: 'modern',
    skyA: '#0a1a0a',
    skyB: '#030803',
    slug: '/roof-replacement-san-francisco',
    img: '/projects/richmond.png',
    alt: 'Standing seam metal roof Richmond District San Francisco',
  },
];

function RoofScene({ roofType, skyA, skyB, index }) {
  const gId   = `p-sky-${index}`;
  const fId   = `p-fade-${index}`;
  const isFlat     = roofType === 'flat';
  const isVictorian = roofType === 'victorian';
  const isModern   = roofType === 'modern';

  // seeded pseudo-random for star positions
  const stars = Array.from({ length: 14 }, (_, i) => ({
    cx: ((i * 67 + 23) % 280) + 10,
    cy: ((i * 43 + 11) % 55) + 5,
    r: i % 3 === 0 ? 1.2 : 0.8,
    op: 0.3 + (i % 4) * 0.15,
  }));

  // background building silhouettes
  const bgBuildings = [
    { x: 0,   y: 115, w: 28, h: 85 },
    { x: 35,  y: 108, w: 18, h: 92 },
    { x: 58,  y: 120, w: 12, h: 80 },
    { x: 210, y: 112, w: 22, h: 88 },
    { x: 240, y: 105, w: 18, h: 95 },
    { x: 268, y: 118, w: 30, h: 82 },
  ];

  const windows = [];
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      windows.push({
        x: 80 + col * 36,
        y: 105 + row * 20,
        lit: (col + row + index) % 3 !== 0,
      });
    }
  }

  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyA} />
          <stop offset="100%" stopColor={skyB} />
        </linearGradient>
        <linearGradient id={fId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="300" height="200" fill={`url(#${gId})`} />

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op} />
      ))}

      {/* Background city */}
      {bgBuildings.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#000" opacity="0.38" />
      ))}

      {/* Main building */}
      <rect x="68" y="92" width="164" height="108" fill="#0d0d0d" />

      {/* Windows */}
      {windows.map((w, i) => (
        <rect
          key={i}
          x={w.x} y={w.y}
          width="14" height="10"
          fill="#CE9843"
          opacity={w.lit ? 0.65 : 0.1}
          rx="2"
        />
      ))}

      {/* Roof by type */}
      {isFlat && (
        <>
          <rect x="55" y="83" width="190" height="13" fill="#CE9843" opacity="0.92" rx="2" />
          <rect x="55" y="83" width="190" height="4" fill="#e8b855" opacity="0.5" rx="2" />
          <rect x="118" y="66" width="64" height="20" fill="#1c1c1c" rx="3" />
          <rect x="130" y="59" width="10" height="9" fill="#2a2a2a" />
        </>
      )}

      {isVictorian && (
        <>
          {/* Main gable */}
          <polygon points="48,92 150,30 252,92" fill="#CE9843" opacity="0.9" />
          <line x1="48"  y1="92" x2="150" y2="30" stroke="#e8b855" strokeWidth="2.5" />
          <line x1="150" y1="30" x2="252" y2="92" stroke="#e8b855" strokeWidth="2.5" />
          {/* Side gable */}
          <polygon points="195,92 235,64 275,92" fill="#CE9843" opacity="0.45" />
          {/* Chimney */}
          <rect x="132" y="14" width="18" height="32" fill="#1e1e1e" />
          <rect x="129" y="10" width="24" height="7" fill="#2a2a2a" />
          {/* Ridge ornament */}
          <circle cx="150" cy="28" r="4" fill="#e8b855" opacity="0.8" />
        </>
      )}

      {isModern && (
        <>
          <polygon points="48,92 260,82 260,72 150,62 48,82" fill="#888" opacity="0.7" />
          <line x1="48" y1="82" x2="260" y2="72" stroke="#CE9843" strokeWidth="2" opacity="0.9" />
          <rect x="160" y="52" width="50" height="14" fill="#1a1a1a" rx="2" />
        </>
      )}

      {!isFlat && !isVictorian && !isModern && (
        <>
          {/* Standard pitched */}
          <polygon points="48,92 150,34 252,92" fill="#CE9843" opacity="0.9" />
          <line x1="48"  y1="92" x2="150" y2="34" stroke="#e8b855" strokeWidth="2" />
          <line x1="150" y1="34" x2="252" y2="92" stroke="#e8b855" strokeWidth="2" />
          <rect x="138" y="18" width="14" height="24" fill="#1e1e1e" />
          <rect x="135" y="14" width="20" height="6" fill="#2a2a2a" />
        </>
      )}

      {/* Bottom fade to card bg */}
      <rect x="0" y="148" width="300" height="52" fill={`url(#${fId})`} />
    </svg>
  );
}

const DOUBLED = [...PROJECTS, ...PROJECTS];

export default function Portfolio() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.portfolio-header', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
    });
    gsap.from('.portfolio-strip', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      opacity: 0, duration: 0.8, ease: 'power2.out',
    });
    gsap.from('.portfolio-cta', {
      scrollTrigger: { trigger: '.portfolio-cta', start: 'top 90%' },
      y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-zinc-950 py-24 border-t border-zinc-900 overflow-hidden">

      {/* Header */}
      <div className="portfolio-header px-6 md:px-16 lg:px-24 max-w-7xl mx-auto
                      flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="text-[#CE9843] text-xs font-bold tracking-[0.25em] uppercase mb-3">
            Recent Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05]">
            Our Work Across<br />San Francisco
          </h2>
        </div>
        <p className="text-zinc-500 text-sm max-w-xs md:text-right">
          847+ roofs completed — every SF neighborhood, every roof type, every budget.
        </p>
      </div>

      {/* Infinite sliding strip — pauses on hover */}
      <div className="portfolio-strip group select-none">
        <div
          className="flex gap-5 w-max group-hover:[animation-play-state:paused]"
          style={{ animation: 'portfolio-scroll 55s linear infinite' }}
        >
          {DOUBLED.map((p, i) => (
            <Link
              key={`${p.neighborhood}-${i}`}
              to={p.slug}
              className="flex-shrink-0 w-[340px] rounded-2xl overflow-hidden
                         border border-zinc-800 hover:border-[#CE9843]/50 bg-zinc-900
                         transition-all duration-300
                         hover:shadow-[0_16px_48px_rgba(206,152,67,0.2)]
                         hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-zinc-950">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <RoofScene {...p} index={i % PROJECTS.length} />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#CE9843]/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                {/* Year */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full
                                 bg-black/70 backdrop-blur-sm border border-zinc-700/60
                                 text-[11px] text-zinc-400 font-medium">
                  {p.year}
                </span>

                {/* Service badge */}
                <span className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full
                                 bg-[#CE9843]/25 backdrop-blur-sm border border-[#CE9843]/40
                                 text-[11px] text-[#CE9843] font-bold tracking-wide">
                  {p.service}
                </span>
              </div>

              {/* Text */}
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={11} className="text-[#CE9843] flex-shrink-0" />
                  <span className="text-[#CE9843] text-[11px] font-bold tracking-widest uppercase">
                    {p.neighborhood}
                  </span>
                </div>
                <h3 className="text-white font-black text-lg leading-tight mb-1">{p.service}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{p.detail}</p>
                <div className="flex items-center gap-1 mt-4 text-[#CE9843]/70 text-xs font-semibold">
                  View service <ChevronRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="portfolio-cta mt-16 text-center px-6">
        <p className="text-zinc-500 text-sm mb-5">Ready to add your home to our portfolio?</p>
        <button
          onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold
                     text-zinc-950 bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                     hover:from-[#d9ac63] hover:to-[#f0c870]
                     transition-all duration-300
                     shadow-[0_6px_24px_rgba(206,152,67,0.4)]
                     hover:shadow-[0_10px_36px_rgba(206,152,67,0.6)]
                     hover:-translate-y-0.5"
        >
          Get Your Free Estimate <ArrowRight size={16} />
        </button>
      </div>

    </section>
  );
}
