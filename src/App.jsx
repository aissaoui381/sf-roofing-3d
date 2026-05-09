import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ServicePage from './pages/ServicePage.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/roof-replacement-san-francisco" element={<ServicePage service="replacement" />} />
        <Route path="/roof-repair-san-francisco" element={<ServicePage service="repair" />} />
        <Route path="/roof-inspection-san-francisco" element={<ServicePage service="inspection" />} />
        <Route path="/storm-damage-roofing-san-francisco" element={<ServicePage service="storm" />} />
      </Routes>
    </BrowserRouter>
  );
}
