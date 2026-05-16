import { site } from '../../site.config.js';

const ITEMS = [
  'Roof Replacement', 'Storm Damage Response', '25-Year Warranty',
  'Licensed & Insured', `${site.city.short} Architecture Experts`, 'Free Itemised Estimates',
  'Roof Repair', `${site.stats.projectsCompleted}+ Projects Completed`, 'New Construction', 'Maintenance Plans',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-[#CE9843] border-y-2 border-[#B8832A] py-3.5 select-none">
      <div
        className="flex whitespace-nowrap w-max"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-zinc-950 font-bold text-sm px-5">{item}</span>
            <span className="text-zinc-950/30 text-[10px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
