/**
 * ─────────────────────────────────────────────────────────────
 *  EmailJS Configuration — /src/data/emailjs.ts
 *
 *  Set up your EmailJS credentials below.
 *
 *  Steps to get these values:
 *  1. Go to https://www.emailjs.com/ and sign up (free plan)
 *  2. SERVICE_ID  → EmailJS Dashboard → "Email Services" → Add Service (Gmail) → copy Service ID
 *  3. TEMPLATE_ID → EmailJS Dashboard → "Email Templates" → Create New Template → copy Template ID
 *  4. PUBLIC_KEY  → EmailJS Dashboard → "Account" → copy Public Key
 *
 *  Template Variables (used in your EmailJS template):
 *    {{name}}          → Sender's name
 *    {{email}}         → Sender's email
 *    {{service_type}}  → Selected service/offering
 *    {{message}}       → Project context message
 * ─────────────────────────────────────────────────────────────
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_9v50xtt',
  TEMPLATE_ID: 'template_1427wjd',
  PUBLIC_KEY: 'sHEXKvP_lYgnoOkVL',
};
