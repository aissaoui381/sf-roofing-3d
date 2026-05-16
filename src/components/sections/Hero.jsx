import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { site } from '../../site.config.js';

const STATS = [
  { value: `${site.stats.projectsCompleted}+`,         label: 'Roofs Completed' },
  { value: `${site.stats.yearsInBusiness}+`,           label: `Years in ${site.city.short}` },
  { value: site.stats.insurance,                       label: 'Insured' },
  { value: `${site.stats.emergencyResponseHrs}hr`,     label: 'Emergency' },
];

const PREVIEWS = [
  {
    neighborhood: 'Noe Valley',
    service: 'Victorian Replacement',
    img: '/projects/noe-valley.webp',
  },
  {
    neighborhood: 'Mission District',
    service: 'TPO Flat Roof',
    img: '/projects/mission.webp',
  },
  {
    neighborhood: 'Twin Peaks',
    service: 'Storm Repair',
    img: '/projects/twin-peaks.webp',
  },
];

function MiniRoof({ roofType, skyA, skyB, uid }) {
  const gId = `h-sky-${uid}`;
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyA} />
          <stop offset="100%" stopColor={skyB} />
        </linearGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#${gId})`} />
      {/* Stars */}
      {[30,70,110,150,180].map((x, i) => (
        <circle key={i} cx={x} cy={8 + i * 5} r="0.9" fill="white" opacity="0.5" />
      ))}
      {/* Background buildings */}
      <rect x="0"   y="60" width="20" height="50" fill="#000" opacity="0.3" />
      <rect x="160" y="55" width="16" height="55" fill="#000" opacity="0.3" />
      <rect x="180" y="65" width="20" height="45" fill="#000" opacity="0.3" />
      {/* Building */}
      <rect x="45" y="52" width="110" height="58" fill="#0d0d0d" />
      {/* Windows */}
      {[55,80,105,130].map((x) =>
        [60,75].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="10" height="7" fill="#CE9843"
            opacity={((x + y) % 3 === 0) ? 0.6 : 0.15} rx="1.5" />
        ))
      )}
      {/* Roof */}
      {roofType === 'flat' ? (
        <rect x="38" y="44" width="124" height="11" fill="#CE9843" opacity="0.9" rx="1.5" />
      ) : roofType === 'victorian' ? (
        <>
          <polygon points="32,52 100,15 168,52" fill="#CE9843" opacity="0.9" />
          <line x1="32" y1="52" x2="100" y2="15" stroke="#e8b855" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="168" y2="52" stroke="#e8b855" strokeWidth="1.5" />
          <rect x="92" y="7" width="10" height="16" fill="#1e1e1e" />
        </>
      ) : (
        <>
          <polygon points="32,52 100,16 168,52" fill="#CE9843" opacity="0.9" />
          <line x1="32" y1="52" x2="100" y2="16" stroke="#e8b855" strokeWidth="1.5" />
          <line x1="100" y1="16" x2="168" y2="52" stroke="#e8b855" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const leftColRef   = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  // Mount the video AFTER initial paint so it doesn't compete with LCP.
  // The poster image holds the visual while the MP4 loads in the background.
  useEffect(() => {
    const mount = () => setShowVideo(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(mount, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(mount, 400);
    return () => clearTimeout(t);
  }, []);

  // Chrome loop fix — kick the video back to the start if it ever stalls
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const restart = () => { video.currentTime = 0; video.play().catch(() => {}); };
    video.addEventListener('ended', restart);
    return () => video.removeEventListener('ended', restart);
  }, [showVideo]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── CSS gradient background (always visible, gives fallback if video missing) ── */}
      <div className="absolute inset-0 z-0"
           style={{ background: 'linear-gradient(135deg, #09090b 0%, #1c1000 45%, #09090b 100%)' }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: 'linear-gradient(#CE9843 1px, transparent 1px), linear-gradient(90deg, #CE9843 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#CE9843]/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#CE9843]/5 blur-[80px]" />
      </div>

      {/* ── Video background ── mounted after idle so it never competes with LCP.
           Poster paints instantly while the MP4 streams in. */}
      {showVideo && (
        <video
          ref={videoRef}
          src="/hero-2.mp4"
          poster="/hero-2-poster.jpg"
          autoPlay loop muted playsInline
          preload="metadata"
          fetchPriority="low"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />
      )}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[2] bg-black/55" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* ── Main content ── */}
      <div className="absolute inset-0 z-10 flex items-center px-8 lg:px-16 pt-10 pb-28">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-12">

          {/* Left — copy */}
          <div ref={leftColRef} className="max-w-xl flex-shrink-0 min-w-0 w-full lg:w-auto">

            <div className="hero-anim inline-flex items-center gap-2 mb-5
                            px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                            text-xs">
              <span className="w-2 h-2 bg-[#DD9E3A] rounded-full flex-shrink-0" />
              <span className="text-[#DD9E3A] font-semibold tracking-widest uppercase">
                {site.domain.host}
              </span>
            </div>

            <h1 className="hero-anim font-black leading-[1.0] tracking-tight mb-3 text-[#DD9E3A]
                           text-[clamp(2rem,7vw,4.5rem)]">
              {site.brand.headlineLineOne}<br />{site.brand.headlineLineTwo}
            </h1>

            <h2 className="hero-anim text-white font-semibold mb-4 text-base sm:text-lg">
              {site.brand.tagline}
            </h2>

            <p className="hero-anim text-zinc-300 leading-relaxed mb-7 max-w-md text-sm">
              {site.city.blurb} —
              code-compliant, weather-tight roofing with every cost itemised before
              we touch your home.
            </p>

            <div className="hero-anim flex flex-row gap-2.5 mb-8">
              <button
                onClick={() => scrollTo('quote')}
                className="group relative flex items-center justify-center gap-2
                           rounded-xl flex-1 px-5 py-3
                           bg-[#DD9E3A] hover:bg-[#C98D2F]
                           text-zinc-950 font-bold text-sm
                           transition-colors duration-200
                           active:scale-[0.98]
                           shadow-[0_4px_20px_rgba(206,152,67,0.35)]"
              >
                <span aria-hidden className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                <span className="relative leading-tight text-center">Build My Custom Quote</span>
                <ArrowRight size={15} strokeWidth={2.5}
                  className="relative flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="flex items-center justify-center gap-2
                           rounded-xl flex-1 px-5 py-3
                           bg-zinc-700 hover:bg-zinc-600
                           border border-zinc-500/50
                           text-white font-semibold text-sm
                           transition-colors duration-200 active:scale-[0.98]"
              >
                View Services
              </button>
            </div>

            <div className="hero-anim flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {['Licensed & Insured', '25-Year Warranty', 'Free Itemised Estimate'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck size={13} className="text-[#DD9E3A] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating project preview cards (desktop only) */}
          <div className="hero-anim hidden lg:flex flex-col gap-4 flex-shrink-0 w-72">
            {PREVIEWS.map((p, i) => (
              <div
                key={p.neighborhood}
                className="hero-float rounded-2xl overflow-hidden border border-white/10
                           bg-white/5 backdrop-blur-md
                           shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{
                  transform: `translateX(${i % 2 === 0 ? '0px' : '20px'})`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3.4 + i * 0.6}s`,
                }}
              >
                <div className="h-28 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.neighborhood}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <MapPin size={10} className="text-[#CE9843]" />
                      <span className="text-[#CE9843] text-[10px] font-bold tracking-widest uppercase">
                        {p.neighborhood}
                      </span>
                    </div>
                    <p className="text-white text-xs font-semibold">{p.service}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#CE9843]/20 border border-[#CE9843]/40
                                  flex items-center justify-center flex-shrink-0">
                    <span className="text-[#CE9843] text-[8px] font-black">✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="hero-anim absolute bottom-0 left-0 right-0 z-20
                      bg-white/90 backdrop-blur-md border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4
                        grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[#CE9843] font-black text-xl md:text-2xl leading-none">
                {s.value}
              </p>
              <p className="text-zinc-500 text-xs mt-1 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <button
        onClick={() => scrollTo('services')}
        className="hero-anim absolute bottom-20 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-1.5 group
                   text-white/40 hover:text-[#DD9E3A] transition-colors duration-300"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
