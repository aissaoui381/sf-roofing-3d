import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';

// Secondary pages loaded only when visited — keeps the home page bundle small
const AboutPage   = lazy(() => import('./pages/AboutPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'));

// Defer Vercel telemetry until after first paint + idle so it never costs INP
const Analytics     = lazy(() => import('@vercel/analytics/react').then(m => ({ default: m.Analytics })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));

function DeferredTelemetry() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const cb = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(cb, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(cb, 2500);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DeferredTelemetry />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/roof-replacement-san-francisco"  element={<ServicePage service="replacement" />} />
          <Route path="/roof-repair-san-francisco"       element={<ServicePage service="repair" />} />
          <Route path="/roof-inspection-san-francisco"   element={<ServicePage service="inspection" />} />
          <Route path="/storm-damage-roofing-san-francisco" element={<ServicePage service="storm" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
