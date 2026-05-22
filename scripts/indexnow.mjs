// Pings IndexNow with every URL in public/sitemap.xml.
// Notifies Bing, Yandex, Seznam, and any other IndexNow consumer
// (Google does NOT participate in IndexNow — submit via Search Console).
//
// Run after a deploy that adds/changes URLs:
//   npm run notify-search-engines

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP   = join(__dirname, '..', 'public', 'sitemap.xml');
const KEY       = 'c9d1cf65ce5ab951442f86dee9d8a29f';
const HOST      = 'sanfranciscoroofingservices.com';
const KEY_URL   = `https://${HOST}/${KEY}.txt`;
const ENDPOINT  = 'https://api.indexnow.org/IndexNow';

const xml = readFileSync(SITEMAP, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urls.length === 0) {
  console.error('No <loc> entries found in sitemap.xml');
  process.exit(1);
}

const body = { host: HOST, key: KEY, keyLocation: KEY_URL, urlList: urls };

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow → ${res.status} ${res.statusText}`);
console.log(`Submitted ${urls.length} URLs`);
if (!res.ok) {
  const text = await res.text();
  if (text) console.log(text);
  process.exit(1);
}
