import { lazy, Suspense } from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/sections/Hero.jsx';

const Marquee         = lazy(() => import('../components/ui/Marquee.jsx'));
const Services        = lazy(() => import('../components/sections/Services.jsx'));
const WhyUs           = lazy(() => import('../components/sections/WhyUs.jsx'));
const Portfolio       = lazy(() => import('../components/sections/Portfolio.jsx'));
const QuoteCalculator = lazy(() => import('../components/sections/QuoteCalculator.jsx'));
const Testimonials    = lazy(() => import('../components/sections/Testimonials.jsx'));
const Footer          = lazy(() => import('../components/Footer.jsx'));

const Skeleton = ({ h = 400 }) => (
  <div style={{ minHeight: h }} className="bg-white" />
);

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<Skeleton h={64} />}>
        <Marquee />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <QuoteCalculator />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<Skeleton h={300} />}>
        <Footer />
      </Suspense>
    </Layout>
  );
}
