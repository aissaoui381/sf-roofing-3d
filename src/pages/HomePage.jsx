import { lazy, Suspense } from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/sections/Hero.jsx';
import Marquee from '../components/ui/Marquee.jsx';
import Services from '../components/sections/Services.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';

const Portfolio      = lazy(() => import('../components/sections/Portfolio.jsx'));
const QuoteCalculator = lazy(() => import('../components/sections/QuoteCalculator.jsx'));
const Testimonials   = lazy(() => import('../components/sections/Testimonials.jsx'));
const Footer         = lazy(() => import('../components/Footer.jsx'));

const SectionSkeleton = () => (
  <div className="min-h-[400px] bg-zinc-950" />
);

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Suspense fallback={<SectionSkeleton />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <QuoteCalculator />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[300px] bg-zinc-950" />}>
        <Footer />
      </Suspense>
    </Layout>
  );
}
