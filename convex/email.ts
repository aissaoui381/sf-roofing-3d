import { internalAction } from './_generated/server';
import { v } from 'convex/values';

export const sendLeadNotification = internalAction({
  args: {
    email:    v.string(),
    service:  v.string(),
    size:     v.string(),
    material: v.string(),
    timeline: v.string(),
    estMin:   v.number(),
    estMax:   v.number(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to:   'aissaoui381@gmail.com',
        subject: `New Quote Request — ${args.service} from ${args.email}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#CE9843;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#000;margin:0;font-size:22px">New Quote Request</h1>
              <p style="color:#000;margin:4px 0 0;opacity:0.6;font-size:14px">
                San Francisco Roofing Service
              </p>
            </div>
            <div style="background:#18181b;padding:32px;border-radius:0 0 12px 12px;color:#fff">
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px;width:140px">Email</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px;font-weight:600">${args.email}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px">Service</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px">${args.service}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px">Roof Size</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px">${args.size}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px">Material</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px">${args.material}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px">Timeline</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px">${args.timeline}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;color:#a1a1aa;font-size:13px">Estimate</td>
                  <td style="padding:10px 0;color:#CE9843;font-size:18px;font-weight:700">
                    $${args.estMin.toLocaleString()} – $${args.estMax.toLocaleString()}
                  </td>
                </tr>
              </table>
              <div style="margin-top:24px;padding-top:24px;border-top:1px solid #27272a">
                <a href="https://dashboard.convex.dev"
                   style="background:#CE9843;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">
                  View All Leads →
                </a>
              </div>
            </div>
          </div>
        `,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error:', JSON.stringify(data));
    } else {
      console.log('Email sent successfully:', JSON.stringify(data));
    }
  },
});
