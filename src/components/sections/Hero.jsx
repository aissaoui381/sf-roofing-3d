import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

const STATS = [
  { value: '847+', label: 'Roofs Completed' },
  { value: '15+',  label: 'Years in SF' },
  { value: '$2M',  label: 'Insured' },
  { value: '24hr', label: 'Emergency' },
];

const PREVIEWS = [
  {
    neighborhood: 'Noe Valley',
    service: 'Victorian Replacement',
    skyA: '#001833',
    skyB: '#000b1a',
    roofType: 'victorian',
  },
  {
    neighborhood: 'Mission District',
    service: 'TPO Flat Roof',
    skyA: '#3d1a00',
    skyB: '#150900',
    roofType: 'flat',
  },
  {
    neighborhood: 'Twin Peaks',
    service: 'Storm Repair',
    skyA: '#1a001a',
    skyB: '#080008',
    roofType: 'pitched',
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
  const floatRefs    = useRef([]);

  // Chrome loop fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const restart = () => { video.currentTime = 0; video.play().catch(() => {}); };
    video.addEventListener('ended', restart);
    return () => video.removeEventListener('ended', restart);
  }, []);

  useGSAP(() => {
    // Entrance sequence
    gsap.timeline({ delay: 0.15 })
      .from('.hero-badge',  { y: 18, opacity: 0, duration: 0.5,  ease: 'power3.out' })
      .from('.hero-title',  { y: 40, opacity: 0, duration: 0.8,  ease: 'power3.out' }, '-=0.2')
      .from('.hero-sub',    { y: 22, opacity: 0, duration: 0.6,  ease: 'power3.out' }, '-=0.4')
      .from('.hero-body',   { y: 16, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.3')
      .from('.hero-cta',    { y: 16, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.3')
      .from('.hero-trust',  { opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.hero-cards',  { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-stats',  { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero-scroll', { opacity: 0, duration: 0.4 }, '-=0.2');

    // Gentle float for preview cards
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: -8 + i * 3,
        duration: 2.8 + i * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      });
    });
  }, { scope: containerRef });

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

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[2] bg-black/55" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* ── Main content ── */}
      <div className="absolute inset-0 z-10 flex items-center px-8 lg:px-16 pt-10 pb-28">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-12">

          {/* Left — copy */}
          <div className="max-w-xl flex-shrink-0">

            <div className="hero-badge inline-flex items-center gap-2 mb-5
                            px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#DD9E3A] rounded-full animate-pulse" />
              <span className="text-[#DD9E3A] text-xs font-semibold tracking-widest uppercase">
                SanFranciscoRoofingService.com
              </span>
            </div>

            <h1 className="hero-title font-black leading-[1.0] tracking-tight mb-3 text-[#DD9E3A]
                           text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              San Francisco<br />Roofing Service
            </h1>

            <h2 className="hero-sub text-white font-semibold mb-4 text-lg">
              Complete Roofing Solutions
            </h2>

            <p className="hero-body text-zinc-300 text-sm md:text-base leading-relaxed mb-7 max-w-md">
              From Victorian flats in the Mission to hillside homes in Twin Peaks —
              code-compliant, weather-tight roofing with every cost itemised before
              we touch your home.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => scrollTo('quote')}
                className="group relative flex items-center justify-center gap-2.5
                           px-7 py-3.5 rounded-xl
                           bg-[#DD9E3A] hover:bg-[#C98D2F]
                           text-zinc-950 font-bold text-base
                           transition-all duration-300
                           shadow-[0_8px_24px_rgba(221,158,58,0.45)]
                           hover:shadow-[0_8px_32px_rgba(221,158,58,0.65)]
                           hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span aria-hidden className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                <span className="relative">Build My Custom Quote</span>
                <ArrowRight size={17} strokeWidth={2.5}
                  className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                           bg-gradient-to-r from-zinc-700 to-zinc-600
                           hover:from-zinc-600 hover:to-zinc-500
                           border border-zinc-500/50 hover:border-zinc-400/60
                           text-white font-semibold text-base
                           transition-all duration-300 active:scale-[0.98]
                           shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
              >
                View Services
              </button>
            </div>

            <div className="hero-trust flex flex-wrap gap-x-5 gap-y-2">
              {['Licensed & Insured', '25-Year Warranty', 'Free Itemised Estimate'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-zinc-400 text-xs">
                  <ShieldCheck size={13} className="text-[#DD9E3A] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating project preview cards (desktop only) */}
          <div className="hero-cards hidden lg:flex flex-col gap-4 flex-shrink-0 w-72">
            {PREVIEWS.map((p, i) => (
              <div
                key={p.neighborhood}
                ref={(el) => (floatRefs.current[i] = el)}
                className="rounded-2xl overflow-hidden border border-white/10
                           bg-white/5 backdrop-blur-md
                           shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{ transform: `translateX(${i % 2 === 0 ? '0px' : '20px'})` }}
              >
                <div className="h-28 overflow-hidden">
                  <MiniRoof {...p} uid={`prev-${i}`} />
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
      <div className="hero-stats absolute bottom-0 left-0 right-0 z-20
                      bg-black/60 backdrop-blur-md border-t border-white/8">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4
                        grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[#DD9E3A] font-black text-xl md:text-2xl leading-none">{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <button
        onClick={() => scrollTo('services')}
        className="hero-scroll absolute bottom-20 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-1.5 group
                   text-white/40 hover:text-[#DD9E3A] transition-colors duration-300"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
