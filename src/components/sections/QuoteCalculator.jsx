import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, ArrowLeft, CheckCircle, Send, Check, ShieldCheck, Ban, Zap } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const STEPS = [
  {
    id: 'service', title: 'What do you need?',
    options: [
      { id: 'repair',       emoji: '🔧', label: 'Roof Repair',       desc: 'Fix leaks or damage',    base: { min: 500,   max: 2500  }, color: 'hover:border-orange-400/60 hover:bg-orange-50' },
      { id: 'replacement',  emoji: '🏠', label: 'Full Replacement',   desc: 'Complete new roof',      base: { min: 8000,  max: 18000 }, color: 'hover:border-amber-400/60  hover:bg-amber-50'  },
      { id: 'installation', emoji: '🏗️', label: 'New Construction',   desc: 'New build roofing',      base: { min: 10000, max: 22000 }, color: 'hover:border-yellow-400/60 hover:bg-yellow-50' },
      { id: 'inspection',   emoji: '🔍', label: 'Inspection Only',    desc: 'Assessment & report',    base: { min: 250,   max: 550   }, color: 'hover:border-sky-400/60    hover:bg-sky-50'    },
    ],
  },
  {
    id: 'size', title: 'Approximate roof size?',
    options: [
      { id: 'small',  emoji: '📐', label: 'Small',       desc: 'Under 1,000 sq ft',  factor: 0.7, color: 'hover:border-green-400/60  hover:bg-green-50'  },
      { id: 'medium', emoji: '📏', label: 'Medium',      desc: '1,000–2,000 sq ft',  factor: 1,   color: 'hover:border-amber-400/60  hover:bg-amber-50'  },
      { id: 'large',  emoji: '🏛️', label: 'Large',       desc: '2,000–3,500 sq ft',  factor: 1.6, color: 'hover:border-orange-400/60 hover:bg-orange-50' },
      { id: 'xlarge', emoji: '🏢', label: 'Extra Large', desc: 'Over 3,500 sq ft',   factor: 2.4, color: 'hover:border-rose-400/60   hover:bg-rose-50'   },
    ],
  },
  {
    id: 'material', title: 'Preferred material?',
    options: [
      { id: 'asphalt', emoji: '▪️', label: 'Asphalt Shingles', desc: '20–30 yr lifespan', factor: 1,   color: 'hover:border-slate-400/60  hover:bg-slate-50'  },
      { id: 'metal',   emoji: '⚙️', label: 'Metal Roofing',    desc: '40–70 yr lifespan', factor: 1.8, color: 'hover:border-zinc-400/60   hover:bg-zinc-50'   },
      { id: 'tile',    emoji: '🪨', label: 'Tile / Slate',      desc: '50+ yr lifespan',   factor: 2.2, color: 'hover:border-stone-400/60  hover:bg-stone-50'  },
      { id: 'flat',    emoji: '⬜', label: 'Flat / TPO',        desc: '15–25 yr lifespan', factor: 1.3, color: 'hover:border-sky-400/60    hover:bg-sky-50'    },
    ],
  },
  {
    id: 'timeline', title: 'When do you need it?',
    options: [
      { id: 'urgent',   emoji: '🚨', label: 'As Soon As Possible', desc: 'Within the week',   factor: 1.2,  color: 'hover:border-red-400/60    hover:bg-red-50'    },
      { id: 'month',    emoji: '📅', label: 'Within a Month',       desc: 'Standard schedule', factor: 1,    color: 'hover:border-amber-400/60  hover:bg-amber-50'  },
      { id: 'quarter',  emoji: '🗓️', label: 'Next 3 Months',        desc: 'Flexible timing',   factor: 0.95, color: 'hover:border-green-400/60  hover:bg-green-50'  },
      { id: 'planning', emoji: '💭', label: 'Just Planning',         desc: 'No rush',           factor: 0.9,  color: 'hover:border-sky-400/60    hover:bg-sky-50'    },
    ],
  },
];

function calcEstimate(sel) {
  const service  = STEPS[0].options.find((o) => o.id === sel.service);
  const size     = STEPS[1].options.find((o) => o.id === sel.size);
  const material = STEPS[2].options.find((o) => o.id === sel.material);
  const timeline = STEPS[3].options.find((o) => o.id === sel.timeline);
  if (!service || !size || !material || !timeline) return null;
  const round = (n) => Math.round(n / 100) * 100;
  return {
    min: round(service.base.min * size.factor * material.factor * timeline.factor),
    max: round(service.base.max * size.factor * material.factor * timeline.factor),
  };
}

const EMAIL_STEP = STEPS.length;

export default function QuoteCalculator() {
  const [step, setStep]             = useState(0);
  const [selections, setSelections] = useState({});
  const [email, setEmail]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const containerRef                = useRef(null);
  const cardRef                     = useRef(null);
  const submitLead                  = useMutation(api.leads.submitLead);

  useGSAP(() => {
    gsap.from('.calc-header', {
      y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
    });
    gsap.from('.calc-body', {
      y: 50, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.calc-body', start: 'top 82%' },
    });
  }, { scope: containerRef });

  const transition = (dir, nextStep) => {
    const el = cardRef.current;
    gsap.to(el, {
      x: dir > 0 ? -24 : 24, opacity: 0, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setStep(nextStep);
        gsap.fromTo(el,
          { x: dir > 0 ? 24 : -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.26, ease: 'power2.out' },
        );
      },
    });
  };

  const selectOption = (optionId) => {
    const key = STEPS[step]?.id;
    setSelections((prev) => ({ ...prev, [key]: optionId }));
    if (step < STEPS.length - 1) setTimeout(() => transition(1, step + 1), 280);
  };

  const allAnswered = STEPS.every((s) => selections[s.id]);
  const estimate    = allAnswered ? calcEstimate(selections) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !allAnswered || !estimate) return;
    await submitLead({
      email,
      service:  selections.service,
      size:     selections.size,
      material: selections.material,
      timeline: selections.timeline,
      estMin:   estimate.min,
      estMax:   estimate.max,
    });
    setSubmitted(true);
  };

  return (
    <section
      id="quote"
      ref={containerRef}
      className="py-16 px-6 md:px-16 lg:px-24 bg-zinc-50 relative overflow-hidden border-t border-zinc-200"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(206,152,67,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="calc-header grid md:grid-cols-2 gap-8 md:gap-20 items-end mb-12">
          <div>
            <span className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              Free Estimate
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-zinc-900 leading-[1.05] tracking-tight">
              How Much<br />Will It Cost?
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:mb-2">
            <p className="text-zinc-500 text-base leading-relaxed">
              Answer 4 quick questions and we'll email you a full itemised estimate — materials, labour, and timeline — within minutes.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'No commitment', icon: ShieldCheck },
                { label: 'No spam',       icon: Ban         },
                { label: 'Instant results', icon: Zap       },
              ].map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-white border border-zinc-200 rounded-full px-3 py-1">
                  <Icon size={11} className="text-[#CE9843] flex-shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="calc-body">
          {/* Step indicator */}
          {!submitted && (
            <div className="flex items-center mb-8 max-w-lg">
              {STEPS.map((s, i) => {
                const done    = step > i || step === EMAIL_STEP;
                const current = step === i;
                return (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-black
                      flex-shrink-0 border-2 transition-all duration-300
                      ${done    ? 'text-zinc-950'    : ''}
                      ${current ? 'shadow-[0_0_18px_rgba(206,152,67,0.4)]' : ''}
                      ${!done && !current ? 'bg-white border-zinc-300 text-zinc-400' : ''}
                    `}
                    style={
                      done    ? { background: '#CE9843', borderColor: '#CE9843' } :
                      current ? { background: 'rgba(206,152,67,0.15)', borderColor: '#CE9843', color: '#CE9843' } :
                      {}
                    }>
                      {done ? <Check size={16} strokeWidth={3} /> : i + 1}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className="flex-1 h-0.5 mx-2 rounded-full transition-all duration-500"
                        style={{ background: step > i ? '#CE9843' : '#e4e4e7' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Main card */}
          <div className="rounded-2xl bg-white border border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            {submitted ? (

              /* ── Success ── */
              <div className="p-12 md:p-16 text-center">
                <div className="w-20 h-20 bg-gold/10 border-2 border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8
                                shadow-[0_0_40px_rgba(206,152,67,0.25)]">
                  <CheckCircle className="text-gold" size={36} />
                </div>
                <h3 className="text-3xl font-black text-zinc-900 mb-4">Estimate on its way!</h3>
                <p className="text-zinc-500 mb-2">
                  Check <span className="text-gold font-semibold">{email}</span> — your breakdown lands within minutes.
                </p>
                {estimate && (
                  <div className="mt-6 inline-block px-8 py-5 rounded-2xl bg-gold/[0.08] border border-gold/25">
                    <p className="text-zinc-500 text-sm mb-1">Estimated range</p>
                    <p className="text-3xl font-black text-gold">${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}</p>
                  </div>
                )}
              </div>

            ) : (
              <div ref={cardRef}>
                {step < STEPS.length ? (

                  /* ── Question step ── */
                  <div className="p-8 md:p-10 lg:p-12">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <p className="text-zinc-400 text-sm font-medium mb-2">Step {step + 1} of {STEPS.length}</p>
                        <h3 className="text-2xl md:text-3xl font-black text-zinc-900">{STEPS[step].title}</h3>
                      </div>
                      {step > 0 && (
                        <button
                          onClick={() => transition(-1, step - 1)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                                     bg-zinc-100 hover:bg-zinc-200 border border-zinc-200
                                     text-zinc-500 hover:text-zinc-700 text-sm font-medium
                                     transition-all duration-200"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                      )}
                    </div>

                    {/* Option tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {STEPS[step].options.map((opt) => {
                        const isSelected = selections[STEPS[step].id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => selectOption(opt.id)}
                            className={`
                              relative flex flex-col items-start gap-3 p-5 md:p-6 rounded-xl
                              text-left border-2 transition-all duration-200 min-h-[130px] md:min-h-[150px]
                              ${isSelected
                                ? 'bg-gold/[0.08] border-gold shadow-[0_0_24px_rgba(206,152,67,0.15)] scale-[1.02]'
                                : `bg-zinc-50 border-zinc-200 ${opt.color} active:scale-[0.98]`
                              }
                            `}
                          >
                            {isSelected && (
                              <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-t-xl" />
                            )}
                            <span className="text-3xl">{opt.emoji}</span>
                            <div className="flex-1">
                              <div className={`font-bold text-base leading-tight mb-1 ${isSelected ? 'text-gold' : 'text-zinc-800'}`}>
                                {opt.label}
                              </div>
                              <div className="text-xs text-zinc-400 leading-relaxed">{opt.desc}</div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-4 right-4">
                                <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                                  <Check size={11} strokeWidth={3} className="text-zinc-950" />
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Last step CTA */}
                    {step === STEPS.length - 1 && selections[STEPS[step].id] && (
                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={() => transition(1, EMAIL_STEP)}
                          className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-base
                                     bg-gradient-to-r from-[#CE9843] to-[#e8b855] text-zinc-950
                                     hover:from-[#d9ac63] hover:to-[#f0c870]
                                     transition-all duration-200 shadow-[0_6px_28px_rgba(206,152,67,0.45)]
                                     hover:shadow-[0_8px_36px_rgba(206,152,67,0.6)] hover:-translate-y-0.5"
                        >
                          Get My Estimate <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  </div>

                ) : (

                  /* ── Email capture ── */
                  <div className="p-8 md:p-12 lg:p-14">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                      <div>
                        {estimate && (
                          <div className="inline-block px-6 py-5 bg-gold/[0.08] border border-gold/25 rounded-2xl mb-6
                                          shadow-[0_0_40px_rgba(206,152,67,0.08)]">
                            <p className="text-zinc-500 text-xs mb-1.5 uppercase tracking-wider font-semibold">Your estimated range</p>
                            <p className="text-3xl md:text-4xl font-black text-gold">
                              ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                            </p>
                          </div>
                        )}
                        <h3 className="text-2xl font-black text-zinc-900 mb-3">Almost there!</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                          Enter your email to receive a full itemised breakdown — materials, labour, and timeline included.
                        </p>
                        <button
                          type="button"
                          onClick={() => transition(-1, STEPS.length - 1)}
                          className="flex items-center gap-1.5 mt-6 px-4 py-2 rounded-lg
                                     bg-zinc-100 hover:bg-zinc-200 border border-zinc-200
                                     text-zinc-500 hover:text-zinc-700 text-sm font-medium
                                     transition-all duration-200"
                        >
                          <ArrowLeft size={13} /> Edit my answers
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">Email address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-200 rounded-xl
                                     text-zinc-900 placeholder-zinc-400 text-base
                                     focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15
                                     transition-all duration-200"
                        />
                        <button
                          onClick={handleSubmit}
                          disabled={!email}
                          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl
                                     font-black text-base text-zinc-950
                                     bg-gradient-to-r from-[#CE9843] to-[#e8b855]
                                     hover:from-[#d9ac63] hover:to-[#f0c870]
                                     disabled:opacity-40 disabled:cursor-not-allowed
                                     transition-all duration-200 shadow-[0_6px_28px_rgba(206,152,67,0.4)]"
                        >
                          <Send size={17} /> Send My Estimate
                        </button>
                        <p className="text-center text-zinc-400 text-xs pt-1">No spam. Unsubscribe anytime.</p>
                      </div>
                    </div>
                  </div>

                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
