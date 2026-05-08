import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Home, HardHat, Calculator, Info } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero',     icon: Home,       label: 'Home'             },
  { id: 'services', icon: HardHat,    label: 'Services'         },
  { id: 'quote',    icon: Calculator, label: 'Get Quote', isPrimary: true },
  { id: 'about',    icon: Info,       label: 'About'            },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const dockRef = useRef(null);

  // Scroll spy — window-based so it works with the global scroll container
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= mid) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Spring-up entrance on mount
  useGSAP(() => {
    gsap.from(dockRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.4)',
      delay: 0.5,
    });
  }, { scope: dockRef });

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      ref={dockRef}
      aria-label="Main navigation"
      className="
        fixed z-50
        bottom-0 left-0 w-full
        sm:bottom-7 sm:left-1/2 sm:w-auto sm:-translate-x-1/2
      "
    >
      {/* Ambient glow — desktop only */}
      <div
        aria-hidden
        className="
          hidden sm:block
          absolute inset-x-4 bottom-0 h-12 -z-10
          bg-gold/15 blur-2xl rounded-full
        "
      />

      {/* ── Dock container ──
          Mobile:  full-width tab bar, flat bottom, rounded top corners
          Desktop: floating pill, full border, multi-shadow
      */}
      <div
        className="
          relative flex items-center
          justify-around sm:justify-start sm:gap-1

          pt-2 sm:py-1.5
          px-2 sm:px-1.5
          pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-1.5

          rounded-t-2xl sm:rounded-full
          border-t border-white/[0.08] sm:border sm:border-white/[0.07]

          bg-zinc-950/95 sm:bg-zinc-950/90
          backdrop-blur-3xl

          sm:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
        "
      >
        {/* Specular top-edge highlight — desktop pill only */}
        <div
          aria-hidden
          className="
            hidden sm:block
            absolute top-0 left-8 right-8 h-px rounded-full
            bg-gradient-to-r from-transparent via-white/10 to-transparent
          "
        />

        {NAV_ITEMS.map(({ id, icon: Icon, label, isPrimary }) => {
          const isActive = active === id;

          /* ── Primary CTA: Interactive Quote ── */
          if (isPrimary) {
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={label}
                className={`
                  group relative
                  flex-1 sm:flex-none
                  flex flex-col sm:flex-row items-center
                  gap-1 sm:gap-2
                  py-1 sm:py-3
                  px-1 sm:px-5 sm:ml-1
                  rounded-xl sm:rounded-full
                  text-[10px] sm:text-sm font-semibold tracking-tight
                  transition-all duration-300 active:scale-95
                  ${isActive
                    ? 'bg-gold-light text-zinc-950 sm:shadow-[0_4px_20px_rgba(206,152,67,0.5)]'
                    : 'bg-gold text-zinc-950 sm:shadow-[0_4px_18px_rgba(206,152,67,0.4)] hover:bg-gold-light'
                  }
                `}
              >
                {/* Inner top-gloss */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                />
                <Icon
                  size={20}
                  strokeWidth={2.5}
                  className="relative transition-transform duration-300 group-hover:scale-110"
                />
                <span className="relative leading-none">{label}</span>
              </button>
            );
          }

          /* ── Standard nav item ── */
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                group relative
                flex-1 sm:flex-none
                flex flex-col items-center gap-1
                py-1 sm:py-2.5
                px-1 sm:px-6
                rounded-xl sm:rounded-full
                transition-all duration-300 active:scale-95
                ${isActive
                  ? 'sm:bg-white/[0.06] text-gold'
                  : 'text-zinc-500 hover:text-zinc-200'
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className={`
                  transition-all duration-300
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                `}
              />
              <span
                className={`
                  text-[10px] font-medium leading-none tracking-wider
                  transition-colors duration-300
                  ${isActive
                    ? 'text-gold'
                    : 'text-zinc-500 group-hover:text-zinc-400'
                  }
                `}
              >
                {label}
              </span>

              {/* Glowing active dot */}
              {isActive && (
                <span
                  aria-hidden
                  className="
                    absolute -bottom-0.5 sm:-bottom-1
                    left-1/2 -translate-x-1/2
                    w-1 h-1 rounded-full bg-gold
                    shadow-[0_0_6px_2px_rgba(206,152,67,0.7)]
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
