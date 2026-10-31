export const PHONE_DISPLAY = '01132507407';
export const PHONE_TEL = '+201132507407';
export const EMAIL_ADDRESS = 'hello@kareemahmed.dev';
export const LOCATION_DISPLAY = 'Cairo, Egypt';
export const TIMEZONE_DISPLAY = 'GMT+2';

export const WHATSAPP_URL =
  'https://wa.me/201132507407?text=' +
  encodeURIComponent(
    "Hello Kareem, I'm interested in your web development services. I'd like to discuss a project.",
  );

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
  message?: string;
}

export async function sendContactEmail(form: ContactFormData): Promise<SendEmailResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        error: data?.error || `Server responded with status ${res.status}`,
      };
    }

    if (!data?.success) {
      return {
        success: false,
        error: data?.error || 'Email provider did not accept message.',
      };
    }

    return {
      success: true,
      id: data.id,
      message: data.message,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error connecting to email service.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function checkEmailServiceStatus(): Promise<{
  configured: boolean;
  destination?: string;
  sender?: string;
}> {
  try {
    const res = await fetch('/api/contact/status');
    if (!res.ok) return { configured: false };
    const data = await res.json();
    return {
      configured: Boolean(data?.configured),
      destination: data?.destination,
      sender: data?.sender,
    };
  } catch {
    return { configured: false };
  }
}

export function buildMailtoUrl(form: ContactFormData): string {
  const subject = form.subject.trim() || 'New Project Inquiry';
  const body = `Hello Kareem,

I would like to discuss a project with you.

Name: ${form.name.trim()}
Email: ${form.email.trim()}
Subject: ${subject}

Message:
${form.message.trim()}

---
Sent via Kareem Ahmed's Portfolio Contact Form`;

  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppUrl(form: Partial<ContactFormData>): string {
  const parts: string[] = ["Hello Kareem! I'm reaching out from your portfolio website."];
  if (form.name?.trim()) parts.push(`Name: ${form.name.trim()}`);
  if (form.email?.trim()) parts.push(`Email: ${form.email.trim()}`);
  if (form.subject?.trim()) parts.push(`Subject: ${form.subject.trim()}`);
  if (form.message?.trim()) parts.push(`\nMessage:\n${form.message.trim()}`);

  return `https://wa.me/201132507407?text=${encodeURIComponent(parts.join('\n'))}`;
}

