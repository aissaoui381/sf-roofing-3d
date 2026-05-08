import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Maria Santos',
    role: 'Homeowner · Mission District',
    avatar: '/avatar-1.jpg',
    initials: 'MS',
    text: 'They replaced our 40-year-old roof in 3 days. The estimate I received by email was exactly what I paid — not a penny more. The team was professional, fast, and incredibly tidy.',
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Property Manager · SOMA',
    avatar: '/avatar-2.jpg',
    initials: 'JO',
    text: 'I manage 8 residential properties in the city and Peak Roofing handles all of them. Their itemised estimates are so detailed I can plan maintenance budgets 6 months in advance.',
    rating: 5,
  },
  {
    name: 'Chloe Bergmann',
    role: 'Homebuyer · Noe Valley',
    avatar: '/avatar-3.jpg',
    initials: 'CB',
    text: 'We needed a roof inspection before closing. They were on-site within 24 hours and the report helped us negotiate $8,000 off the purchase price. Worth every cent.',
    rating: 5,
  },
];

const AUTO_MS = 5000;

export default function Testimonials() {
  const [index, setIndex]    = useState(0);
  const containerRef         = useRef(null);
  const timerRef             = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useGSAP(() => {
    gsap.from('.testi-section', {
      y: 50, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 76%' },
    });
  }, { scope: containerRef });

  const prev = () => {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startTimer();
  };
  const next = () => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
    startTimer();
  };
  const handleDot = (i) => { setIndex(i); startTimer(); };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 px-6 md:px-16 lg:px-24 bg-zinc-950 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto testi-section">
        <div className="grid md:grid-cols-[280px_1fr] gap-14 md:gap-20 items-start">

          {/* Left — label, title, counter, nav */}
          <div className="flex flex-col gap-10">
            <div>
              <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                Client Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.0] tracking-tight">
                What<br />Homeowners<br />Say
              </h2>
            </div>

            <div>
              <p className="text-4xl font-black text-white tabular-nums mb-4">
                <span className="text-gold">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-zinc-700 text-2xl"> / </span>
                <span className="text-zinc-700">{String(TESTIMONIALS.length).padStart(2, '0')}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-zinc-700 hover:border-[#DD9E3A]/50 hover:bg-[#DD9E3A]/[0.08]
                             flex items-center justify-center text-zinc-400 hover:text-[#DD9E3A]
                             transition-all duration-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-zinc-700 hover:border-[#DD9E3A]/50 hover:bg-[#DD9E3A]/[0.08]
                             flex items-center justify-center text-zinc-400 hover:text-[#DD9E3A]
                             transition-all duration-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5 mt-5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-[#DD9E3A]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — sliding track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 relative pr-1">

                  {/* Giant decorative quote mark */}
                  <div
                    className="absolute -top-8 -left-4 text-[10rem] md:text-[14rem] font-serif leading-none text-[#DD9E3A]/[0.07] select-none pointer-events-none"
                    aria-hidden
                  >
                    "
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-1 mb-6 relative">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-5 h-5 fill-[#DD9E3A] text-[#DD9E3A]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-100 text-xl md:text-2xl leading-relaxed font-light mb-8 relative">
                    {t.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 relative">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#DD9E3A]/30 bg-[#DD9E3A]/[0.1]">
                      {/* Initials shown as fallback when image is missing */}
                      <div className="absolute inset-0 flex items-center justify-center text-[#DD9E3A] font-black text-sm">
                        {t.initials}
                      </div>
                      {/* Avatar image sits on top; hides itself on load error */}
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <div className="text-white font-bold">{t.name}</div>
                      <div className="text-zinc-500 text-sm mt-0.5">{t.role}</div>
                    </div>
                  </div>

                  {/* Auto-progress bar */}
                  <div className="mt-8 h-px bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      key={`tpb-${index}`}
                      className="h-full bg-[#DD9E3A]/60 rounded-full"
                      style={{ animation: `progress-fill ${AUTO_MS}ms linear forwards` }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
