import { Service, Project, PricingPlan, TeamMember, Testimonial } from '../types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Web Development',
    category: 'Engineering',
    description: 'We construct high-performance, robust, and scalable web platforms. Utilizing Vite, React, and server-side optimization, we ensure sub-second response times and seamless UX.',
    iconName: 'Code2',
    features: ['Next.js & React Architectures', 'Headless CMS Integration', 'Pristine Web Performance', 'API Design & Cloud Deployment']
  },
  {
    id: 's2',
    title: 'E-Commerce Solutions',
    category: 'Commerce',
    description: 'Bespoke online retail engines that maximize conversion velocity. Built with custom cart states, secure payment gateway piping, and high-fidelity product interaction layers.',
    iconName: 'ShoppingBag',
    features: ['Custom Checkout Flows', 'State-of-the-Art Payment APIs', 'Inventory Micro-services', 'Spatial Product Viewers']
  },
  {
    id: 's3',
    title: 'Digital Marketing',
    category: 'Growth',
    description: 'Aggressive growth engines powered by performance marketing, strategic SEO, and targeted content funnels engineered to convert organic traffic to dedicated clients.',
    iconName: 'TrendingUp',
    features: ['Multi-Channel Funnel Setup', 'Bespoke Brand Copywriting', 'SEO Infrastructure Tuning', 'Real-time ROI Visualization']
  },
  {
    id: 's4',
    title: 'UI/UX Design',
    category: 'Creative',
    description: 'Human-centric UI/UX design crafted carefully from psychological research, intuitive interactive patterns, and editorial aesthetic principles.',
    iconName: 'Layers',
    features: ['Interactive Prototypes', 'Design System Architecture', 'Cognitive Wireframing', 'User Research & Heatmaps']
  },
  {
    id: 's5',
    title: 'Branding & Graphic Design',
    category: 'Creative',
    description: 'Timeless visual identities, guidelines, typography pairings, and digital design languages that define premium positioning for disruptive brands.',
    iconName: 'Palette',
    features: ['Brand Books & Guidelines', 'Dynamic Typography & Logos', '3D Packaging Visualizations', 'Digital Collateral Designs']
  },
  {
    id: 's6',
    title: 'AI Solutions & Automation',
    category: 'Innovation',
    description: 'Integrating cutting-edge LLMs, custom retrieval models, and computer vision to fully automate manual internal workloads and drive smart product capabilities.',
    iconName: 'Cpu',
    features: ['Gemini API Custom Agents', 'Intelligent Sentiment Pipelines', 'Robot Process Automation', 'Semantic Data Structuring']
  }
];

export const DEFAULT_PORTFOLIO: Project[] = [
  {
    id: 'p1',
    title: 'Nebula Core AI',
    category: 'AI Solutions',
    description: 'Re-engineering dynamic freight routing and supply chain orchestration using custom Gemini-driven logistics agents.',
    client: 'Nebula Logistics Inc.',
    year: '2026',
    imageUrl: 'https://picsum.photos/seed/nebulacore/800/600',
    tags: ['AI Agents', 'Data Engineering', 'Dashboard'],
    caseStudy: {
      challenge: 'Nebula Logistics struggled with static dispatch routing rules, causing average routing delays of 4.2 hours and high fuel emission overheads across their global fleet.',
      solution: 'ZCS created a server-side AI-orchestrated routing agent that reads real-time weather, traffic, and fleet telemetry to dynamically alter cargo waypoints on the fly.',
      results: [
        'Reduced waypoint latency by 34%',
        'Saved over $240k monthly in fuel efficiency optimization',
        'Implemented custom reactive desktop hub UI for terminal managers'
      ]
    }
  },
  {
    id: 'p2',
    title: 'Vortex spatial store',
    category: 'E-Commerce',
    description: 'A WebGL interactive spatial product exploration sandbox and frictionless headless checkout pipeline.',
    client: 'Vortex Apparel Group',
    year: '2025',
    imageUrl: 'https://picsum.photos/seed/vortexapparel/800/600',
    tags: ['WebGL', 'Headless React', 'Tailwind'],
    caseStudy: {
      challenge: 'Standard flat-grid grid stores felt generic and couldn\'t convey the fine premium tactile weave of Vortex\'s technical outer garment series.',
      solution: 'Engineered a highly performance-optimized WebGL canvas sandbox allowing consumers to drape, light, and dissect custom outerwear coats dynamically down to the active thread count.',
      results: [
        'Boosted average consumer site dwell time from 1.2 to 5.6 minutes',
        'Increased checkout conversion percentage by 130%',
        'Zero frame drop rate on mobile devices'
      ]
    }
  },
  {
    id: 'p3',
    title: 'Zenith FinTech Portal',
    category: 'Web Development',
    description: 'Sub-second digital micro-lending web application implementing rigorous client authentication.',
    client: 'Zenith Capital Private',
    year: '2026',
    imageUrl: 'https://picsum.photos/seed/zenithfin/800/600',
    tags: ['FinTech', 'Cloud Security', 'React 19'],
    caseStudy: {
      challenge: 'Zenith\'s legacy loan approval pipeline took 3-5 working days due to broken document parsing, messy security pipelines, and non-responsive mobile views.',
      solution: 'Developed a custom modern core portal with server-side document reading, robust field verification, and an ultra-secure, responsive banking-grade UI built using optimized React 19 streams.',
      results: [
        'Average document review/approval process reduced to 42 seconds',
        '99.99% application reliability rating',
        'Completed rigorous compliance tests with first-try pass'
      ]
    }
  },
  {
    id: 'p4',
    title: 'Aether Editorial Rebrand',
    category: 'Branding',
    description: 'Complete visual identity architecture, digital type design, guidelines, and interactive design token system.',
    client: 'Aether Publishing House',
    year: '2025',
    imageUrl: 'https://picsum.photos/seed/aetherbrand/800/600',
    tags: ['Typography', 'Brand Identity', 'Creative'],
    caseStudy: {
      challenge: 'Aether wanted to transition from classic press publishing into modern high-end newsletter curation while keeping their rich classic literary posture.',
      solution: 'We crafted an editorial brand language pairing custom sleek display serif typography with bold geometric accents and deployed a fluid, unified tokens engine for immediate multi-screen branding consistency.',
      results: [
        'Unified 14 separate publication templates under 1 design system',
        'Over 50,000 new digital subscriptions gained during the launch week',
        'Secured feature nomination on premium branding portals'
      ]
    }
  }
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: 'pr1',
    name: 'Starter',
    pricePKR: 149000,
    billingCycle: 'monthly',
    description: 'Ideal starting tier for rising developers, local businesses, and polished landing page infrastructures.',
    features: ['Single-Page High-Speed Application', 'Premium Typography & Custom Logo Accent', 'Integrated Core Contact Form', 'Fully Responsive Framework', '1 Month Technical Support'],
    popular: false,
    buttonText: 'Acquire Starter'
  },
  {
    id: 'pr2',
    name: 'Growth',
    pricePKR: 299000,
    billingCycle: 'monthly',
    description: 'Supercharge your online presence. Highly customized multi-view platforms ready to convert prospects.',
    features: ['Multi-Page Custom React Architecture', 'Advanced Dynamic E-Commerce Pipeline', 'Bespoke UI/UX Interactive Design', 'Tailwind Animations & Custom Motion Trails', '3 Months Dedicated Maintenance', 'Basic AI Assistant Integration'],
    popular: true,
    buttonText: 'Launch Growth plan'
  },
  {
    id: 'pr3',
    name: 'Business',
    pricePKR: 499000,
    billingCycle: 'monthly',
    description: 'A complete corporate digital suite featuring premium intelligence pipelines and automated internal operations.',
    features: ['Enterprise Core Framework', 'Full Semantic AI Chatbot & Agent Engine', 'Cloud-Synchronized Multi-Admin Dashboard', 'Persistent Performance Marketing Setup', 'Dedicated Slack Channel Support', 'Comprehensive Security Audits'],
    popular: false,
    buttonText: 'Deploy Business Suite'
  },
  {
    id: 'pr4',
    name: 'Enterprise',
    pricePKR: 899000,
    billingCycle: 'monthly',
    description: 'Bespoke custom solutions for demanding corporate requirements and hyper-scale multi-region software platforms.',
    features: ['Unrestricted Engineering Squad Resources', 'Custom Advanced AI Model Training & Fine-tuning', 'Bi-Weekly Strategy Board Reviews', 'Sub-Second Global Multi-Region Edge Latency', 'Unlimited Scaling Consultation', '24/7 Priority Hotline Access'],
    popular: false,
    buttonText: 'Initiate Enterprise'
  }
];

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Bilal Farooq',
    designation: 'Founder & Chief Technology Architect',
    description: 'Visionary engineer focusing on scalable web platforms, cloud micro-architectures, and high-performance server structures.',
    imageUrl: 'https://picsum.photos/seed/bilalf/400/400',
    socials: {
      twitter: 'https://twitter.com/bilalfarooq',
      linkedin: 'https://linkedin.com/in/bilalfarooq',
      github: 'https://github.com/bilalfarooq',
      email: 'bilal@zerocore.solutions'
    }
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    designation: 'Creative Director & Head of UI/UX',
    description: 'Award-winning digital craftsperson transforming abstract system structures into stunning visual narratives.',
    imageUrl: 'https://picsum.photos/seed/sarahj/400/400',
    socials: {
      twitter: 'https://twitter.com/sarahjdesign',
      linkedin: 'https://linkedin.com/in/sarahjdesign',
      github: 'https://github.com/sarahj',
      email: 'sarah@zerocore.solutions'
    }
  },
  {
    id: 't3',
    name: 'Hamza Naim',
    designation: 'Principal Fullstack Engineer',
    description: 'Interactive web front-runner obsessed with browser frames, smooth vector motion, and advanced physics canvases.',
    imageUrl: 'https://picsum.photos/seed/hamzan/400/400',
    socials: {
      twitter: 'https://twitter.com/hamzanaim',
      linkedin: 'https://linkedin.com/in/hamzanaim',
      github: 'https://github.com/hamzanaim',
      email: 'hamza@zerocore.solutions'
    }
  },
  {
    id: 't4',
    name: 'Elena Rostova',
    designation: 'Growth Strategist & Marketing Lead',
    description: 'Analytical marketer engineering high-converting customer loops, ad spends, and semantic content pipelines.',
    imageUrl: 'https://picsum.photos/seed/elenar/400/400',
    socials: {
      twitter: 'https://twitter.com/elenarostova',
      linkedin: 'https://linkedin.com/in/elenarostova',
      email: 'elena@zerocore.solutions'
    }
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'ts1',
    author: 'Arsalan Malik',
    designation: 'COO',
    company: 'Indus Logistics',
    text: 'ZeroCore completely revolutionized our logistics workflows. Their custom AI routing dispatch model trimmed our transport delay overheads by over 34% within the first month. The dark desktop monitoring portal they provided is highly responsive and stunning to look at.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/arsalan/200/200'
  },
  {
    id: 'ts2',
    author: 'Ayesha Khan',
    designation: 'Founder & CEO',
    company: 'Sofia Threads',
    text: 'Working with ZeroCore Solutions was an amazing experience. They handcrafted a custom WebGL apparel sandbox that increased client dwell time by fourfold and pumped our shopping checkout conversions by 130%. Zero template lag, just absolute elite quality.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/ayesha/200/200'
  },
  {
    id: 'ts3',
    author: 'Richard Cole',
    designation: 'VP of Engineering',
    company: 'Apex Fintech',
    text: 'Most agencies build static templates. ZCS built custom, secure financial middleware that passes every regulatory audit on the first pass and scales with no effort. Their communication is precise and clear, and we will absolutely build all future portals with them.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/richardc/200/200'
  }
];

// LocalStorage helpers for dynamic CMS behavior
export const CMS_STORAGE_KEYS = {
  SERVICES: 'zcs_cms_services',
  PORTFOLIO: 'zcs_cms_portfolio',
  PRICING: 'zcs_cms_pricing',
  TEAM: 'zcs_cms_team',
  TESTIMONIALS: 'zcs_cms_testimonials',
  SECTION_CONTENT: 'zcs_cms_section_content'
};

export const DEFAULT_SECTION_CONTENT: SectionContent = {
  heroTitle: "We Build",
  heroHighlight: "Digital Experiences",
  heroDescription: "ZeroCore Solutions provides professional web development, scalable e-commerce solutions, performance-driven digital marketing, creative branding, graphic design, intelligent AI solutions, and automated business workflows.",
  aboutTitle: "An Elite Design & Engineering Collective Empowering Disruptors",
  aboutDescription: "ZeroCore Solutions operates at the overlap of code, design, and organic growth strategies. We empower premium businesses to outpace their competition by automating workflows, modernizing applications, and engineering unique physical or visual digital frameworks.",
  servicesTitle: "Bespoke Digital Operations",
  servicesDescription: "We don't buy templates or recycle code. Each of our high-velocity services is designed and developed from scratch to fit your exact scaling bottleneck.",
  teamTitle: "Meet the Core Engineers & Designers",
  teamDescription: "The certified specialists driving growth, crafting vector trajectories, and optimizing cloud container runtimes.",
  pricingTitle: "Transparent Dynamic Value Metrics",
  pricingDescription: "Premium bespoke scale. Secure a private engineering squad scoped strictly to your project targets under clean monthly rates.",
  testimonialsTitle: "Echoes of Extreme Growth Velocity",
  testimonialsDescription: "What leading operations say about their ZeroCore system overhauls and deployment results."
};

import { SectionContent } from '../types';

export function getCMSSectionContent(): SectionContent {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.SECTION_CONTENT);
  return data ? JSON.parse(data) : DEFAULT_SECTION_CONTENT;
}

export function saveCMSSectionContent(content: SectionContent): void {
  localStorage.setItem(CMS_STORAGE_KEYS.SECTION_CONTENT, JSON.stringify(content));
}

export function getCMSServices(): Service[] {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.SERVICES);
  return data ? JSON.parse(data) : DEFAULT_SERVICES;
}

export function saveCMSServices(services: Service[]): void {
  localStorage.setItem(CMS_STORAGE_KEYS.SERVICES, JSON.stringify(services));
}

export function getCMSPortfolio(): Project[] {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.PORTFOLIO);
  return data ? JSON.parse(data) : DEFAULT_PORTFOLIO;
}

export function saveCMSPortfolio(portfolio: Project[]): void {
  localStorage.setItem(CMS_STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
}

export function getCMSPricing(): PricingPlan[] {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.PRICING);
  return data ? JSON.parse(data) : DEFAULT_PRICING;
}

export function saveCMSPricing(pricing: PricingPlan[]): void {
  localStorage.setItem(CMS_STORAGE_KEYS.PRICING, JSON.stringify(pricing));
}

export function getCMSTeam(): TeamMember[] {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.TEAM);
  return data ? JSON.parse(data) : DEFAULT_TEAM;
}

export function saveCMSTeam(team: TeamMember[]): void {
  localStorage.setItem(CMS_STORAGE_KEYS.TEAM, JSON.stringify(team));
}

export function getCMSTestimonials(): Testimonial[] {
  const data = localStorage.getItem(CMS_STORAGE_KEYS.TESTIMONIALS);
  return data ? JSON.parse(data) : DEFAULT_TESTIMONIALS;
}

export function saveCMSTestimonials(testimonials: Testimonial[]): void {
  localStorage.setItem(CMS_STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
}

export function resetCMSAll(): void {
  localStorage.removeItem(CMS_STORAGE_KEYS.SERVICES);
  localStorage.removeItem(CMS_STORAGE_KEYS.PORTFOLIO);
  localStorage.removeItem(CMS_STORAGE_KEYS.PRICING);
  localStorage.removeItem(CMS_STORAGE_KEYS.TEAM);
  localStorage.removeItem(CMS_STORAGE_KEYS.TESTIMONIALS);
  localStorage.removeItem(CMS_STORAGE_KEYS.SECTION_CONTENT);
}
