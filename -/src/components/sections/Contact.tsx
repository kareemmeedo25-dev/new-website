import { useState, useEffect, type FormEvent } from 'react';
import {
  Send,
  Phone,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useI18n } from '@/context/I18nContext';
import { supabase, isSupabaseConfigured, type ContactMessage } from '@/lib/supabase';
import {
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL_ADDRESS,
  LOCATION_DISPLAY,
  TIMEZONE_DISPLAY,
  buildMailtoUrl,
  buildWhatsAppUrl,
  sendContactEmail,
  checkEmailServiceStatus,
} from '@/lib/contact';

type Status = 'idle' | 'loading' | 'success' | 'client_opened' | 'error';
type FormErrors = Partial<Record<keyof ContactMessage, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t, dir } = useI18n();

  const [form, setForm] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  useEffect(() => {
    let active = true;
    checkEmailServiceStatus()
      .then((res) => {
        if (active) {
          setEmailConfigured(res.configured);
        }
      })
      .catch(() => {
        if (active) setEmailConfigured(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    const nameTrim = form.name.trim();
    const emailTrim = form.email.trim();
    const subjectTrim = form.subject.trim();
    const msgTrim = form.message.trim();

    if (!nameTrim) {
      e.name = t('contact.errName');
    }
    if (!emailTrim) {
      e.email = t('contact.errEmail');
    } else if (!EMAIL_RE.test(emailTrim)) {
      e.email = t('contact.errEmailValid');
    }
    if (!subjectTrim) {
      e.subject = t('contact.errSubject');
    }
    if (!msgTrim) {
      e.message = t('contact.errMessage');
    } else if (msgTrim.length < 10) {
      e.message = t('contact.errMessageShort');
    }
    return e;
  };

  const handleFieldChange = (name: keyof ContactMessage, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus('loading');
    setErrorMsg('');
    setDeliveryId('');

    try {
      // 1. Submit to real server-side Resend email endpoint
      const result = await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      // Provider confirms delivery acceptance
      if (result.success && result.id) {
        setStatus('success');
        setDeliveryId(result.id);
        setForm({ name: '', email: '', subject: '', message: '' });

        // Asynchronous dual-backup in Supabase if configured
        if (isSupabaseConfigured) {
          supabase
            .from('contact_messages')
            .insert({
              name: form.name.trim(),
              email: form.email.trim(),
              subject: form.subject.trim(),
              message: form.message.trim(),
            })
            .then(() => {});
        }
        return;
      }

      // If server or provider returned an error, show honest error message
      setStatus('error');
      setErrorMsg(result.error || t('contact.error'));
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t('contact.error'),
      );
    }
  };

  const handleSendViaWhatsApp = () => {
    const waUrl = buildWhatsAppUrl(form);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch {
      // Clipboard fallback
    }
  };

  const isRtl = dir === 'rtl';

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 65%)' }}
        />
        <div
          className="absolute right-[-10%] bottom-[-10%] h-[350px] w-[350px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 70%)' }}
        />
      </div>

      <div className="container-px relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-red-500 dark:text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span>{t('contact.statusBadge')}</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="section-title mt-4 text-balance">
              {t('contact.title1')} <span className="text-gradient-red">{t('contact.title2')}</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-secondary leading-relaxed max-w-xl mx-auto">
              {t('contact.description')}
            </p>
          </Reveal>
        </div>

        {/* Main Grid: Form (7 cols) + Direct Channels (5 cols) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Contact Form Column */}
          <Reveal className="lg:col-span-7">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 border-themed relative shadow-card">
              {/* Honest Service Status Banner */}
              <div
                className={`mb-6 rounded-2xl p-4 border transition-all text-xs ${
                  emailConfigured
                    ? 'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300'
                    : 'border-themed bg-[color:var(--bg-base)] text-secondary'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        emailConfigured ? 'bg-green-500 text-white' : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {emailConfigured ? <Check className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
                    </span>
                    <div>
                      <p className="font-semibold text-[color:var(--text-primary)]">
                        {emailConfigured
                          ? 'Direct Email Delivery Active (Resend)'
                          : t('contact.backendTitle')}
                      </p>
                      <p className="mt-1 leading-relaxed text-muted">
                        {emailConfigured
                          ? 'Submissions are sent directly to kareemmeedo25@gmail.com with your email set as reply-to.'
                          : 'Server email relay via Resend. If RESEND_API_KEY is pending, submissions open in your email client.'}
                      </p>
                    </div>
                  </div>

                  {!emailConfigured && (
                    <button
                      type="button"
                      onClick={() => setShowSetupGuide((v) => !v)}
                      className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-400 transition-colors underline underline-offset-2"
                      aria-expanded={showSetupGuide}
                    >
                      <HelpCircle className="h-3 w-3" />
                      <span>{showSetupGuide ? t('contact.hideGuide') : t('contact.viewGuide')}</span>
                      {showSetupGuide ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}
                </div>

                {/* Collapsible Setup Guide */}
                {!emailConfigured && showSetupGuide && (
                  <div className="mt-4 pt-3 border-t border-themed space-y-2 text-[11px] leading-relaxed text-secondary animate-in fade-in duration-200">
                    <p className="font-semibold text-[color:var(--text-primary)]">
                      Resend Email Configuration:
                    </p>
                    <p>1. Store your Resend API Key in Secrets as <code className="font-mono text-red-500">RESEND_API_KEY</code>.</p>
                    <p>2. Set optional custom sender domain in <code className="font-mono text-red-500">RESEND_FROM_EMAIL</code> or leave default (onboarding@resend.dev).</p>
                    <p>3. Destination email is configured to: <span className="font-mono text-red-500">kareemmeedo25@gmail.com</span>.</p>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder={t('contact.placeholderName')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`w-full rounded-xl border bg-[color:var(--input-bg)] px-4 py-3 text-base sm:text-sm text-[color:var(--text-primary)] placeholder:text-muted outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/20 ${
                        errors.name
                          ? 'border-red-500 ring-1 ring-red-500/30'
                          : 'border-themed focus:border-red-500'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder={t('contact.placeholderEmail')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`w-full rounded-xl border bg-[color:var(--input-bg)] px-4 py-3 text-base sm:text-sm text-[color:var(--text-primary)] placeholder:text-muted outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/20 ${
                        errors.email
                          ? 'border-red-500 ring-1 ring-red-500/30'
                          : 'border-themed focus:border-red-500'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    {t('contact.subject')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder={t('contact.placeholderSubject')}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={`w-full rounded-xl border bg-[color:var(--input-bg)] px-4 py-3 text-base sm:text-sm text-[color:var(--text-primary)] placeholder:text-muted outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/20 ${
                      errors.subject
                        ? 'border-red-500 ring-1 ring-red-500/30'
                        : 'border-themed focus:border-red-500'
                    }`}
                  />
                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      {t('contact.message')} <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-[11px] ${
                        form.message.trim().length >= 10 ? 'text-muted' : 'text-muted/60'
                      }`}
                    >
                      {form.message.trim().length} / 10 min chars
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder={t('contact.placeholderMessage')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`w-full resize-none rounded-xl border bg-[color:var(--input-bg)] px-4 py-3 text-base sm:text-sm text-[color:var(--text-primary)] placeholder:text-muted outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/20 ${
                      errors.message
                        ? 'border-red-500 ring-1 ring-red-500/30'
                        : 'border-themed focus:border-red-500'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit and Secondary Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-red flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70 shadow-lg shadow-red-500/10 hover:shadow-red-500/25 transition-all"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t('contact.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                        <span>{t('contact.send')}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border-themed surface-card px-5 py-3.5 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500"
                  >
                    <MessageCircle className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                    <span>{t('contact.sendViaWhatsApp')}</span>
                  </button>
                </div>

                {/* Status Feedback Messages */}
                {status === 'success' && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-300 flex items-start gap-3 animate-in fade-in">
                    <Check className="h-5 w-5 shrink-0 mt-0.5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-semibold">{t('contact.success')}</p>
                      <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                        Delivered to Kareem Ahmed (kareemmeedo25@gmail.com). You can also reply directly when Kareem responds to your email.
                      </p>
                      {deliveryId && (
                        <p className="mt-1.5 font-mono text-[11px] text-green-800/80 dark:text-green-300/80 bg-green-500/10 inline-block px-2 py-0.5 rounded border border-green-500/20">
                          Resend Delivery ID: {deliveryId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {status === 'client_opened' && (
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 shrink-0 mt-0.5 text-blue-500" />
                      <div>
                        <p className="font-semibold">{t('contact.mailClientOpened')}</p>
                        <p className="mt-1 text-xs text-blue-600/90 dark:text-blue-400">
                          Recipient: <span className="font-mono">{EMAIL_ADDRESS}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-blue-500/20 text-xs">
                      <button
                        type="button"
                        onClick={() => { window.location.href = buildMailtoUrl(form); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-700 dark:text-blue-200 hover:bg-blue-500/30 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> Re-open Email App
                      </button>
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-500/30 transition-colors"
                      >
                        <MessageCircle className="h-3 w-3 text-green-500" /> Send via WhatsApp
                      </button>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-300 flex items-start gap-3 animate-in fade-in">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-semibold">{errorMsg || t('contact.error')}</p>
                      <p className="mt-1 text-xs text-red-700/80 dark:text-red-400">
                        You can also contact me directly via WhatsApp at {PHONE_DISPLAY} or open your email client.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => { window.location.href = buildMailtoUrl(form); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-700 dark:text-red-200 hover:bg-red-500/30 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" /> Send via Email App
                        </button>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-500/30 transition-colors font-semibold"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-green-500" /> Chat on WhatsApp &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </Reveal>

          {/* Direct Channels Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* WhatsApp Card */}
            <Reveal delay={100}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border-themed surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-card"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[color:var(--text-primary)]">
                        {t('contact.whatsapp')}
                      </p>
                      <ExternalLink className="h-4 w-4 text-muted group-hover:text-green-500 transition-colors" />
                    </div>
                    <p className="text-xs text-secondary mt-0.5">{t('contact.whatsappSub')}</p>
                    <p className="mt-1 text-xs font-mono font-medium text-green-600 dark:text-green-400">
                      {PHONE_TEL}
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Email Card with Copy button */}
            <Reveal delay={140}>
              <div className="group rounded-2xl border-themed surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-card">
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 transition-transform group-hover:scale-110"
                    aria-label="Send direct email"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[color:var(--text-primary)]">
                        {t('contact.emailBtn')}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(EMAIL_ADDRESS, 'email')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:border-red-500/50 hover:text-red-500"
                        title={t('contact.copyNumber')}
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="block truncate text-xs text-secondary hover:text-red-500 font-mono transition-colors mt-0.5"
                    >
                      {EMAIL_ADDRESS}
                    </a>
                    {copiedEmail && (
                      <p className="text-[11px] text-green-600 dark:text-green-400 mt-1">
                        {t('contact.copiedEmail')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Direct Phone / Call Card */}
            <Reveal delay={180}>
              <div className="group rounded-2xl border-themed surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-card">
                <div className="flex items-center gap-4">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 transition-transform group-hover:scale-110"
                    aria-label="Call phone number"
                  >
                    <Phone className="h-6 w-6" />
                  </a>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[color:var(--text-primary)]">
                        {t('contact.call')}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(PHONE_DISPLAY, 'phone')}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:border-red-500/50 hover:text-red-500"
                        title={t('contact.copyNumber')}
                        aria-label="Copy phone number"
                      >
                        {copiedPhone ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="block text-xs font-mono font-medium text-secondary hover:text-red-500 transition-colors mt-0.5"
                    >
                      {PHONE_DISPLAY}
                    </a>
                    <p className="text-[11px] text-muted mt-0.5">
                      {copiedPhone ? t('contact.copied') : t('contact.callSub')}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Location & Timezone Details */}
            <Reveal delay={220}>
              <div className="rounded-2xl border-themed surface-card p-5 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-themed bg-[color:var(--bg-base)] text-secondary">
                    <MapPin className="h-4 w-4 text-red-500" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {t('contact.location')}
                    </p>
                    <p className="text-xs font-medium text-[color:var(--text-primary)] mt-0.5">
                      {LOCATION_DISPLAY}
                    </p>
                    <p className="text-[10px] text-muted">Timezone: {TIMEZONE_DISPLAY}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-themed bg-[color:var(--bg-base)] text-secondary">
                    <Clock className="h-4 w-4 text-red-500" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {t('contact.responseTime')}
                    </p>
                    <p className="text-xs font-medium text-[color:var(--text-primary)] mt-0.5">
                      {t('contact.responseTimeVal')}
                    </p>
                    <p className="text-[10px] text-muted">Direct attention</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Social channels card */}
            <Reveal delay={260}>
              <div className="rounded-2xl border-themed surface-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                  {t('contact.socialTitle')}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:-translate-y-1 hover:border-red-500/50 hover:text-red-500 shadow-sm"
                  >
                    <Github className="h-4 w-4" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:-translate-y-1 hover:border-red-500/50 hover:text-red-500 shadow-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X profile"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:-translate-y-1 hover:border-red-500/50 hover:text-red-500 shadow-sm"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    aria-label="Email Kareem Ahmed"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border-themed bg-[color:var(--bg-base)] text-secondary transition-all hover:-translate-y-1 hover:border-red-500/50 hover:text-red-500 shadow-sm"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
