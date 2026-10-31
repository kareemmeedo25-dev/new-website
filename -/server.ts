import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Target destination email specified by the owner
const DESTINATION_EMAIL = process.env.CONTACT_DESTINATION_EMAIL?.trim() || 'kareemmeedo25@gmail.com';

// Express middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Regex validation
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Health check and configuration status (without exposing secrets)
app.get('/api/contact/status', (_req: Request, res: Response) => {
  const isKeyConfigured = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  res.json({
    configured: isKeyConfigured,
    provider: 'resend',
    destination: DESTINATION_EMAIL,
    sender: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    // 1. Server-side Input Validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).',
      });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name cannot exceed 100 characters.',
      });
    }

    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (trimmedEmail.length > 254) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long.',
      });
    }

    if (trimmedSubject.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Subject cannot exceed 200 characters.',
      });
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters long.',
      });
    }

    if (trimmedMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot exceed 5000 characters.',
      });
    }

    // 2. Secret Verification (Server-Side Only)
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('[Contact API] RESEND_API_KEY is not defined in the server environment.');
      return res.status(503).json({
        success: false,
        error: 'Email service is currently offline. Please configure RESEND_API_KEY or contact directly via WhatsApp.',
      });
    }

    // 3. Resend Client Initialization
    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() || 'Kareem Ahmed Portfolio <onboarding@resend.dev>';
    const emailSubject = trimmedSubject
      ? `[Portfolio Inquiry] ${trimmedSubject}`
      : `[Portfolio Inquiry] New message from ${trimmedName}`;

    // Professional HTML template
    const sentDate = new Date().toUTCString();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Inquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d12; color: #f1f2f6; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #13151c; border: 1px solid #232733; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #181b24, #0f1015); padding: 28px; border-bottom: 2px solid #ff2525; }
    .badge { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #ff2525; background: rgba(255, 37, 37, 0.12); padding: 4px 10px; border-radius: 999px; margin-bottom: 8px; }
    .title { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
    .content { padding: 28px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.8px; color: #9499ab; margin-bottom: 6px; }
    .value { font-size: 15px; color: #f1f2f6; font-weight: 500; }
    .email-link { color: #ff3b3b; text-decoration: none; }
    .message-box { background: #0c0d12; border: 1px solid #232733; border-radius: 12px; padding: 18px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e1e4ee; }
    .footer { padding: 20px 28px; background: #0c0d12; border-top: 1px solid #1e222d; font-size: 12px; color: #6f7587; }
    .reply-hint { display: inline-block; margin-top: 12px; font-size: 12px; color: #9499ab; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Portfolio Contact Form</div>
      <h1 class="title">New Client Message</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value"><strong>${escapeHtml(trimmedName)}</strong> &lt;<a class="email-link" href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a>&gt;</div>
      </div>
      
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${escapeHtml(trimmedSubject || 'General Inquiry')}</div>
      </div>

      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(trimmedMessage)}</div>
      </div>

      <div class="reply-hint">
        💡 <em>You can reply directly to this email to respond to ${escapeHtml(trimmedName)}.</em>
      </div>
    </div>
    <div class="footer">
      <div>Received on: ${sentDate}</div>
      <div>Sent via Kareem Ahmed Developer Portfolio &bull; Destination: ${DESTINATION_EMAIL}</div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const textContent = `
New Portfolio Inquiry from ${trimmedName}

Name: ${trimmedName}
Email: ${trimmedEmail}
Subject: ${trimmedSubject || 'General Inquiry'}
Date: ${sentDate}

Message:
${trimmedMessage}

---
You can reply directly to this email to respond to ${trimmedName} (${trimmedEmail}).
Destination: ${DESTINATION_EMAIL}
    `.trim();

    // 4. Dispatch Email via Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [DESTINATION_EMAIL],
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[Resend Error]', error);
      let userFriendlyError = error.message || 'The email provider rejected the message delivery.';
      if (error.message?.includes('verify a domain') || error.message?.includes('own email address')) {
        userFriendlyError = `Resend Sandbox Restriction: Resend's free test sender (onboarding@resend.dev) only allows sending to the Resend account owner. To deliver to ${DESTINATION_EMAIL}, please add & verify your custom domain (e.g. kareemahmed.dev) in your Resend Dashboard (resend.com/domains) and set RESEND_FROM_EMAIL.`;
      }
      return res.status(502).json({
        success: false,
        error: userFriendlyError,
        code: error.name,
      });
    }

    if (!data?.id) {
      return res.status(502).json({
        success: false,
        error: 'The provider responded without a confirmation ID.',
      });
    }

    console.log(`[Contact API] Message successfully sent! Resend ID: ${data.id}`);

    // Return confirmed delivery acceptance
    return res.status(200).json({
      success: true,
      id: data.id,
      message: 'Your message has been sent successfully! I will get back to you soon.',
    });
  } catch (err: unknown) {
    console.error('[Contact API Unhandled Error]', err);
    const message = err instanceof Error ? err.message : 'Internal server error processing message.';
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 5. Mount Vite middleware for dev or static server for production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[App] Server listening on http://0.0.0.0:${PORT} (Mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[App] Failed to start server:', err);
  process.exit(1);
});
