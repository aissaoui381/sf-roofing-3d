export default function Layout({ children }) {
  return (
    <div
      className="
        relative bg-zinc-950 min-h-screen overflow-x-hidden antialiased
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      <main className="w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
