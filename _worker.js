/**
 * Optional: a starter Cloudflare Pages Function that handles
 * the email signup POST from index.html.
 *
 * If you put this file at the project root and deploy to Cloudflare Pages,
 * any POST to /api/subscribe will be handled by this Worker.
 *
 * To swap in a different backend (e.g. Formspree), edit ENDPOINT in
 * index.html's script and delete this file — you don't need it.
 *
 * Required (or recommended) bindings to configure in the Pages dashboard:
 *   - KV namespace: SUBSCRIBERS  (Bindings → KV namespace bindings)
 *   - OR Environment variable RESEND_API_KEY / SENDGRID_API_KEY for email forwarding
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only handle the subscribe endpoint here; everything else falls through
    // to the static site.
    if (url.pathname !== '/api/subscribe') {
      return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400);
    }

    const email = String(body.email || '').trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) return json({ ok: false, error: 'Invalid email' }, 400);

    // Persist to KV if available
    if (env.SUBSCRIBERS) {
      const key = `sub:${email}`;
      const existing = await env.SUBSCRIBERS.get(key);
      if (!existing) {
        await env.SUBSCRIBERS.put(key, JSON.stringify({
          email,
          source: body.source || 'coming-soon',
          ts: Date.now(),
          ua: request.headers.get('user-agent') || '',
          country: request.cf?.country || '',
        }));
      }
    }

    // Forward to Resend (optional). Set RESEND_API_KEY and FROM_ADDRESS.
    if (env.RESEND_API_KEY && env.FROM_ADDRESS && env.NOTIFY_ADDRESS) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.FROM_ADDRESS,
            to: env.NOTIFY_ADDRESS,
            subject: 'New Grenada Studio signup',
            text: `New signup: ${email}\nSource: ${body.source || 'coming-soon'}`,
          }),
        });
      } catch (e) { /* swallow */ }
    }

    return json({ ok: true });
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
