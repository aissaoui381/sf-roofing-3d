import { useState, useEffect } from 'react';
import { Home, Wrench, Calculator, Star, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero',         icon: Home,       label: 'Home' },
  { id: 'services',     icon: Wrench,     label: 'Services' },
  { id: 'quote',        icon: Calculator, label: 'Get Quote' },
  { id: 'testimonials', icon: Star,       label: 'Reviews' },
  { id: 'footer',       icon: Mail,       label: 'Contact' },
];

export default function BottomDock() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let bestId = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        }
        if (bestId) setActive(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const observed = [];
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) { io.observe(el); observed.push(el); }
    }
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-0.5 px-2 py-2 rounded-2xl
                      bg-zinc-950/90 backdrop-blur-xl
                      border border-white/[0.08]
                      shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive  = active === id;
          const isPrimary = id === 'quote';

          if (isPrimary) {
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="
                  relative flex flex-col items-center gap-1 px-5 py-2.5 mx-1 rounded-xl
                  bg-[#DD9E3A] text-black font-bold
                  shadow-[0_0_18px_rgba(221,158,58,0.55)]
                  hover:bg-[#e8b855] hover:shadow-[0_0_26px_rgba(221,158,58,0.7)]
                  active:scale-95 transition-all duration-200 group
                "
              >
                <Icon size={17} className="transition-transform duration-200 group-hover:scale-110" strokeWidth={2.5} />
                <span className="text-[10px] font-bold leading-none tracking-wide">{label}</span>
              </button>
            );
          }

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`
                relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl
                transition-all duration-200 group active:scale-95
                ${isActive
                  ? 'text-[#DD9E3A]'
                  : 'text-zinc-500 hover:text-zinc-200'
                }
              `}
            >
              <Icon size={17} className="transition-transform duration-200 group-hover:scale-110" />
              <span className="text-[10px] font-medium leading-none">{label}</span>
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#DD9E3A] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
