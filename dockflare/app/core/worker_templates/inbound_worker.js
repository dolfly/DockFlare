export default {
  async email(message, env, ctx) {
    try {
    const allowedRecipients = JSON.parse(env.ALLOWED_RECIPIENTS || '[]');
    if (!allowedRecipients.includes(message.to)) {
      message.setReject("Recipient not allowed");
      return;
    }
    const messageId = crypto.randomUUID();
    const r2Key = `temp_cache/${messageId}.eml`;
    const receivedAt = new Date().toISOString();
    const rawBytes = await new Response(message.raw).arrayBuffer();
    await env.EMAIL_BUCKET.put(r2Key, rawBytes, {
      customMetadata: {
        from: message.from,
        to: message.to,
        subject: message.headers.get("subject") || "",
        receivedAt: receivedAt
      }
    });
    const sizeBytes = message.rawSize || 0;
    const payload = {
      message_id: messageId,
      from: message.from,
      to: message.to,
      subject: message.headers.get("subject") || "",
      received_at: receivedAt,
      r2_key: r2Key,
      size_bytes: sizeBytes
    };
    const payloadString = JSON.stringify(payload);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(env.WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadString));
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const webhookResponse = await fetch(env.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-DockFlare-Signature": signatureHex,
        "X-DockFlare-Message-Id": messageId
      },
      body: payloadString
    });
    if (!webhookResponse.ok) {
      const errBody = await webhookResponse.text().catch(() => '');
      await env.EMAIL_BUCKET.delete(r2Key);
      message.setReject(`Webhook failed ${webhookResponse.status}: ${errBody.slice(0, 100)}`);
      return;
    }
    } catch (err) {
      message.setReject(`Worker error: ${err.message}`);
    }
  }
};
