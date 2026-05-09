import Layout from '../components/Layout.jsx';
import Hero from '../components/sections/Hero.jsx';
import Marquee from '../components/ui/Marquee.jsx';
import Services from '../components/sections/Services.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';
import QuoteCalculator from '../components/sections/QuoteCalculator.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
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
