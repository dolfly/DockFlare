import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${env.AUTH_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const toHeader = Array.isArray(body.to) ? body.to.join(", ") : body.to;
    const rawTo = Array.isArray(body.to) ? body.to[0] : body.to;
    const addrMatch = typeof rawTo === 'string' ? rawTo.match(/<([^>]+)>/) : null;
    const toAddress = addrMatch ? addrMatch[1] : (typeof rawTo === 'string' ? rawTo.trim() : rawTo);
    let mimeMessage = `From: ${body.from}\r\nTo: ${toHeader}\r\n`;
    if (body.cc) mimeMessage += `Cc: ${Array.isArray(body.cc) ? body.cc.join(", ") : body.cc}\r\n`;
    if (body.bcc) mimeMessage += `Bcc: ${Array.isArray(body.bcc) ? body.bcc.join(", ") : body.bcc}\r\n`;
    mimeMessage += `Subject: ${body.subject}\r\n`;
    mimeMessage += `Date: ${new Date().toUTCString()}\r\n`;
    if (body.replyTo) mimeMessage += `Reply-To: ${body.replyTo}\r\n`;
    if (body.inReplyTo) mimeMessage += `In-Reply-To: ${body.inReplyTo}\r\n`;
    if (body.references) mimeMessage += `References: ${body.references}\r\n`;
    if (body.messageId) mimeMessage += `Message-ID: ${body.messageId}\r\n`;
    mimeMessage += `MIME-Version: 1.0\r\n`;
    const boundary = "b" + crypto.randomUUID().replace(/-/g, "");
    mimeMessage += `Content-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n`;
    const textBody = body.text || (body.html ? "" : "(no content)");
    if (textBody) {
      mimeMessage += `--${boundary}\r\nContent-Type: text/plain; charset="utf-8"\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${textBody}\r\n`;
    }
    if (body.html) {
      mimeMessage += `--${boundary}\r\nContent-Type: text/html; charset="utf-8"\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${body.html}\r\n`;
    }
    mimeMessage += `--${boundary}--\r\n`;
    const message = new EmailMessage(body.from, toAddress, mimeMessage);
    try {
      await env.SEND_EMAIL.send(message);
      return new Response(JSON.stringify({ success: true, message_id: body.messageId }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
