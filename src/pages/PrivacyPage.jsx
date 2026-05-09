import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-zinc-500 text-sm hover:text-gold transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: May 2025</p>

        {[
          {
            title: 'Information We Collect',
            body: 'When you use our quote calculator, we collect your email address and the answers you provide (service type, roof size, material preference, and timeline). This information is used solely to send you a roofing estimate and to follow up regarding your project.',
          },
          {
            title: 'How We Use Your Information',
            body: 'Your email address is used to send you a project estimate and occasional follow-up communication related to your roofing inquiry. We do not sell, trade, or share your personal information with third parties for marketing purposes.',
          },
          {
            title: 'Data Storage',
            body: 'Your quote requests are stored securely using Convex (convex.dev). Data is encrypted in transit and at rest. We retain lead data for up to 2 years for business record purposes.',
          },
          {
            title: 'Email Communications',
            body: 'By submitting the quote form, you consent to receiving a one-time estimate email and potential follow-up from San Francisco Roofing Service. You may opt out at any time by replying "unsubscribe" to any email.',
          },
          {
            title: 'Cookies & Analytics',
            body: 'We use Vercel Analytics to collect anonymous usage data (page views, device types, geographic region). No personally identifiable information is collected through analytics. We do not use advertising cookies.',
          },
          {
            title: 'Your Rights',
            body: 'You have the right to request deletion of your personal data at any time. To do so, email us at INFO@SanFranciscoRoofingService.com with the subject line "Data Deletion Request".',
          },
          {
            title: 'Contact',
            body: 'For any privacy-related questions, contact us at INFO@SanFranciscoRoofingService.com.',
          },
        ].map(({ title, body }) => (
          <div key={title} className="mb-10">
            <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
            <p className="text-zinc-400 leading-relaxed">{body}</p>
          </div>
        ))}

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 text-zinc-600 text-sm">
          <p>© 2025 San Francisco Roofing Service.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-zinc-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
            <Link to="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
