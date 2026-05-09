const ORBS = [
  { size: 600, top: '5%',  left: '10%',  anim: 'orb-drift-a', dur: '22s', delay: '0s'   },
  { size: 500, top: '30%', left: '65%',  anim: 'orb-drift-b', dur: '28s', delay: '4s'   },
  { size: 700, top: '60%', left: '25%',  anim: 'orb-drift-c', dur: '34s', delay: '8s'   },
  { size: 400, top: '80%', left: '75%',  anim: 'orb-drift-a', dur: '25s', delay: '12s'  },
  { size: 350, top: '15%', left: '45%',  anim: 'orb-drift-b', dur: '30s', delay: '16s'  },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left:  `${(i * 17 + 7)  % 95}%`,
  top:   `${(i * 31 + 13) % 90}%`,
  size:  1 + (i % 3) * 0.8,
  dur:   `${6 + (i % 5) * 2.4}s`,
  delay: `${(i * 1.1) % 9}s`,
  dx:    `${(i % 5 - 2) * 14}px`,
}));

export default function Layout({ children }) {
  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden antialiased [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* ── Global ambient layer — fixed behind all content ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Drifting orbs */}
        {ORBS.map((o, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#CE9843] blur-[120px]"
            style={{
              width:  o.size,
              height: o.size,
              top:    o.top,
              left:   o.left,
              animation: `${o.anim} ${o.dur} ease-in-out infinite`,
              animationDelay: o.delay,
              opacity: 0.06,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Rising particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#CE9843]"
            style={{
              width:  p.size,
              height: p.size,
              left:   p.left,
              top:    p.top,
              '--dx': p.dx,
              animation: `particle-rise ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* One slow diagonal shimmer sweep */}
        <div
          className="absolute top-0 left-0 w-px h-[200%] bg-gradient-to-b from-transparent via-[#CE9843]/15 to-transparent"
          style={{ animation: 'shimmer-sweep 18s ease-in-out infinite', animationDelay: '6s' }}
        />
      </div>

      <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
