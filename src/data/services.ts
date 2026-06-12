/**
 * ─────────────────────────────────────────────────────────────
 *  SERVICES DATA — /src/data/services.ts
 *  Edit this file to add, remove or reorder services.
 *  No UI code changes needed.
 * ─────────────────────────────────────────────────────────────
 */

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string; // Must match a Lucide icon name
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Web Development',
    category: 'Engineering',
    description: 'We construct high-performance, robust, and scalable web platforms. Utilizing Vite, React, and server-side optimization, we ensure sub-second response times and seamless UX.',
    iconName: 'Code2',
    features: [
      'Next.js & React Architectures',
      'Headless CMS Integration',
      'Pristine Web Performance',
      'API Design & Cloud Deployment',
    ],
  },
  {
    id: 's2',
    title: 'E-Commerce Solutions',
    category: 'Commerce',
    description: 'Bespoke online retail engines that maximize conversion velocity. Built with custom cart states, secure payment gateway piping, and high-fidelity product interaction layers.',
    iconName: 'ShoppingBag',
    features: [
      'Custom Checkout Flows',
      'State-of-the-Art Payment APIs',
      'Inventory Micro-services',
      'Spatial Product Viewers',
    ],
  },
  {
    id: 's3',
    title: 'Digital Marketing',
    category: 'Growth',
    description: 'Aggressive growth engines powered by performance marketing, strategic SEO, and targeted content funnels engineered to convert organic traffic to dedicated clients.',
    iconName: 'TrendingUp',
    features: [
      'Multi-Channel Funnel Setup',
      'Bespoke Brand Copywriting',
      'SEO Infrastructure Tuning',
      'Real-time ROI Visualization',
    ],
  },
  {
    id: 's4',
    title: 'UI/UX Design',
    category: 'Creative',
    description: 'Human-centric UI/UX design crafted carefully from psychological research, intuitive interactive patterns, and editorial aesthetic principles.',
    iconName: 'Layers',
    features: [
      'Interactive Prototypes',
      'Design System Architecture',
      'Cognitive Wireframing',
      'User Research & Heatmaps',
    ],
  },
  {
    id: 's5',
    title: 'Branding & Graphic Design',
    category: 'Creative',
    description: 'Timeless visual identities, guidelines, typography pairings, and digital design languages that define premium positioning for disruptive brands.',
    iconName: 'Palette',
    features: [
      'Brand Books & Guidelines',
      'Dynamic Typography & Logos',
      '3D Packaging Visualizations',
      'Digital Collateral Designs',
    ],
  },
  {
    id: 's6',
    title: 'Photography, Videography & Editing',
    category: 'Creative',
    description: 'Capturing your brands story through powerful visuals — from professional shoots to cinematic edits that stop the scroll and drive real engagement',
    iconName: 'Camera',
    features: [
      'Gemini API Custom Agents',
      'Intelligent Sentiment Pipelines',
      'Robot Process Automation',
      'Semantic Data Structuring',
    ],
  },
];
