import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);

  // Chrome desktop loop fix — manual restart on 'ended'
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const restart = () => { video.currentTime = 0; video.play().catch(() => {}); };
    video.addEventListener('ended', restart);
    return () => video.removeEventListener('ended', restart);
  }, []);

  useGSAP(() => {
    gsap.timeline({ delay: 0.2 })
      .from('.hero-badge',  { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' })
      .from('.hero-title',  { y: 40, opacity: 0, duration: 0.8,  ease: 'power3.out' }, '-=0.25')
      .from('.hero-sub',    { y: 24, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
      .from('.hero-body',   { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
      .from('.hero-cta',    { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
      .from('.hero-trust',  { opacity: 0, duration: 0.45 },                            '-=0.2')
      .from('.hero-scroll', { opacity: 0, duration: 0.45 },                            '-=0.2');
  }, { scope: containerRef });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* ── Content — pushed to the top ── */}
      <div className="absolute inset-0 z-20 px-8 lg:px-16 pt-20 sm:pt-24 pb-28 overflow-y-auto
                      [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="max-w-xl">

          {/* Domain badge */}
          <div className="hero-badge inline-flex items-center gap-2 mb-5 w-fit
                          px-4 py-1.5 rounded-full
                          bg-white/10 border border-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#DD9E3A] rounded-full animate-pulse" />
            <span className="text-[#DD9E3A] text-xs font-semibold tracking-widest uppercase">
              SanFranciscoRoofingService.com
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-title text-[#DD9E3A] font-black leading-[1.0] tracking-tight mb-3
                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            San Francisco Roofing Service
          </h1>

          {/* H2 */}
          <h2 className="hero-sub text-white font-semibold mb-4 text-lg whitespace-nowrap">
            Complete Roofing Solutions
          </h2>

          {/* Supporting copy */}
          <p className="hero-body text-zinc-300 text-sm md:text-base leading-relaxed mb-7 max-w-md">
            From Victorian flats in the Mission to hillside homes in Twin Peaks —
            code-compliant, weather-tight roofing with every cost itemised before
            we touch your home.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => scrollTo('quote')}
              className="
                group relative flex items-center justify-center gap-2.5
                px-7 py-3.5 rounded-xl
                bg-[#DD9E3A] hover:bg-[#C98D2F]
                text-zinc-950 font-bold text-base
                transition-all duration-300
                shadow-[0_8px_24px_rgba(221,158,58,0.45)]
                hover:shadow-[0_8px_32px_rgba(221,158,58,0.65)]
                hover:-translate-y-0.5 active:scale-[0.98]
              "
            >
              <span aria-hidden className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              <span className="relative">Build My Custom Quote</span>
              <ArrowRight size={17} strokeWidth={2.5}
                className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo('services')}
              className="
                flex items-center justify-center gap-2
                px-7 py-3.5 rounded-xl
                bg-gradient-to-r from-zinc-700 to-zinc-600
                hover:from-zinc-600 hover:to-zinc-500
                border border-zinc-500/50 hover:border-zinc-400/60
                text-white font-semibold text-base
                transition-all duration-300 active:scale-[0.98]
                shadow-[0_4px_16px_rgba(0,0,0,0.4)]
              "
            >
              View Services
            </button>
          </div>

          {/* Trust strip */}
          <div className="hero-trust flex flex-wrap gap-x-5 gap-y-2">
            {['Licensed & Insured', '25-Year Warranty', 'Free Itemised Estimate'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-zinc-400 text-xs">
                <ShieldCheck size={13} className="text-[#DD9E3A] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll hint ── */}
      <button
        onClick={() => scrollTo('services')}
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-1.5 group
                   text-white/50 hover:text-[#DD9E3A] transition-colors duration-300"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
