import { Suspense, lazy } from 'react';

// Replace with your scene URL from spline.design → Export → React
const DEFAULT_SCENE = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

const Spline = lazy(() => import('@splinetool/react-spline'));

function Skeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-ping" />
        <div className="absolute inset-4 rounded-full border border-amber-400/30 animate-pulse" />
        <div className="absolute inset-8 rounded-full border border-amber-400/50 animate-pulse [animation-delay:200ms]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 bg-amber-400 rounded-full animate-ping [animation-duration:1.5s]" />
        </div>
      </div>
    </div>
  );
}

export default function SplineScene({ url = DEFAULT_SCENE, className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<Skeleton />}>
        <Spline scene={url} />
      </Suspense>
    </div>
  );
}
