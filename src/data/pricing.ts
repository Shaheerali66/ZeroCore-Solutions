/**
 * ─────────────────────────────────────────────────────────────
 *  PRICING DATA — /src/data/pricing.ts
 *  Edit this file to change plan names, prices or feature lists.
 *  Prices are in PKR. Set popular: true on the highlighted plan.
 * ─────────────────────────────────────────────────────────────
 */

export interface PricingPlan {
  id: string;
  name: string;
  pricePKR: number;
  billingCycle: 'monthly' | 'yearly';
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

export const PRICING: PricingPlan[] = [
  {
    id: 'pr1',
    name: 'Starter',
    pricePKR: 24999,
    billingCycle: 'monthly',
    description: 'Perfect for small businesses taking their first step into the digital world.',
    features: [
      '15 Creative Posts',
      '4 Engaging Reels',
      'Stories & Highlights',
      'Hashtag Research',
      'Basic Engagement (Comments & DMs)',
      'Content Calendar',
      'Monthly Performance Report',
    ],
    popular: false,
    buttonText: 'Acquire Starter',
  },
  {
    id: 'pr2',
    name: 'Growth',
    pricePKR: 39999,
    billingCycle: 'monthly',
    description: 'For brands ready to scale up with smarter content and paid campaigns.',
    features: [
      '25 Creative Posts',
      '8 Engaging Reels',
      'Stories, Highlights & Covers',
      'Social Media Management',
      'Paid Ads Campaign Setup & Management',
      'Monthly Performance Report',
      'Competitor Analysis',
      'Profile Optimization',
    ],
    popular: true,
    buttonText: 'Launch Growth Plan',
  },
  {
    id: 'pr3',
    name: 'Pro',
    pricePKR: 64999,
    billingCycle: 'monthly',
    description: 'A complete digital marketing solution for businesses serious about growth.',
    features: [
      '35 Creative Posts',
      '12 Engaging Reels',
      'Daily Posting Schedule',
      'Social Media Management',
      'Paid Ads Campaign Setup & Management',
      'SEO Basic Setup',
      'Email Marketing',
      'Monthly Performance Report',
      'Competitor Analysis',
      'Priority Support',
      'Profile Optimization',
    ],
    popular: false,
    buttonText: 'Deploy Pro Suite',
  },
  {
    id: 'pr4',
    name: 'Elite',
    pricePKR: 94999,
    billingCycle: 'monthly',
    description: 'Your all-in-one digital partner — from web presence to full-scale marketing.',
    features: [
      'Everything in Pro',
      'Custom Website Design & Development',
      'Landing Page Creation',
      'Website SEO Optimization',
      'Speed & Performance Optimization',
      '1 Month Free Website Maintenance',
      'Dedicated Account Manager',
      'Weekly Progress Reports',
      'Priority 24/7 Support',
    ],
    popular: false,
    buttonText: 'Initiate Elite',
  },
];