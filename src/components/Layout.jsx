export default function Layout({ children }) {
  return (
    <div className="relative bg-white min-h-screen overflow-x-hidden antialiased [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* Lightweight static ambient layer — replaces 5 animated 120px-blur orbs
          + 18 animated particles + shimmer that were destroying INP and GPU. */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 15% 20%, rgba(206,152,67,0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 45% 40% at 80% 65%, rgba(206,152,67,0.04) 0%, transparent 60%)',
        }}
      />

      <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
