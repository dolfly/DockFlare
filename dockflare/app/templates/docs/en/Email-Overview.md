# Email Suite Overview

DockFlare Email is a fully self-hosted, sovereign email system built on top of your existing DockFlare infrastructure. It is designed to provide the convenience of cloud-based email with the privacy and control of self-hosting.

## The Sovereign Email Concept

Traditionally, self-hosting email is difficult due to "home IP blacklisting," where residential IP addresses are blocked by major email providers. DockFlare solves this by using Cloudflare as a **stateless delivery network**:

1.  **Cloudflare** handles the heavy lifting of SMTP delivery, MX routing, and temporary buffering.
2.  **DockFlare** owns the data. Your messages, attachments, and mailbox configurations are stored on your own hardware.

No email content persists on Cloudflare's infrastructure. It is briefly buffered in an R2 bucket during transit and is purged immediately after your local Mail Manager processes it.

## Architecture

The system consists of several integrated components:

*   **Inbound Flow:** Internet → Cloudflare Email Routing → Inbound Worker → R2 Buffer → DockFlare Mail Manager Webhook → Local Storage.
*   **Outbound Flow:** Webmail UI → Mail Manager API → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Data Sovereignty:** All emails are parsed and stored in a local SQLite database with attachments saved to your local filesystem.

## Outbound Sending — Plans & Limitations

Cloudflare Email Sending (Beta) has two tiers depending on your Cloudflare plan:

| Sending Target | Free Plan | Workers Paid Plan ($5/mo) |
| :--- | :--- | :--- |
| Verified Cloudflare addresses (addresses confirmed in your CF account) | ✅ Allowed | ✅ Allowed |
| Any external address | ❌ Not allowed | ✅ Allowed |

DockFlare sets up the DKIM signing records and the sending subdomain (`mail.yourdomain.com`) automatically during domain setup. However, **full external sending requires two additional manual steps**:

1. **Upgrade to the Cloudflare Workers Paid Plan** — available at $5/month in your Cloudflare dashboard.
2. **Activate CF Email Sending (Beta)** — navigate to your [Cloudflare Dashboard → Email → Email Sending](https://dash.cloudflare.com/) and enable the feature for your account.

Until these steps are completed, outbound mail from your webmail client will only be delivered to email addresses that have been verified in your Cloudflare account. The domain status badge in DockFlare's Email Management page reflects whether DKIM is configured (`Sending: Active`) or not yet set up (`Sending: Pending`).

## Key Features

*   **Multi-Domain Support:** Host email for as many domains as you manage in Cloudflare.
*   **Edge Quota Enforcement:** Mailbox full? Cloudflare Workers reject the email at the SMTP level (5.2.2) before it even hits your server, saving bandwidth.
*   **Full-Text Search:** Lightning-fast search across all your emails using SQLite FTS5.
*   **Privacy First:** All API interactions use EdDSA JWT authentication. HTML email content is sanitized before rendering to prevent XSS and tracking pixels.
*   **PWA Webmail:** A modern, mobile-responsive webmail client that can be installed on your phone or desktop.
*   **Push Notifications:** Get notified of new mail in real-time via Web Push (VAPID).
*   **Resilience:** If your server goes offline, Cloudflare R2 buffers your incoming mail and retries delivery automatically every 5 minutes.
