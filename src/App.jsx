import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Layout from './components/Layout.jsx';
import Hero from './components/sections/Hero.jsx';
import Marquee from './components/ui/Marquee.jsx';
import Services from './components/sections/Services.jsx';
import WhyUs from './components/sections/WhyUs.jsx';
import QuoteCalculator from './components/sections/QuoteCalculator.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Footer from './components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <QuoteCalculator />
      <Testimonials />
      <Footer />
    </Layout>
  );
}
