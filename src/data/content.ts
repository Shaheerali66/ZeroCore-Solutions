/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENT DATA — /src/data/content.ts
 *  All static website copy lives here.
 *  Edit any text below and it will reflect immediately in the UI.
 * ─────────────────────────────────────────────────────────────
 */

// ── Hero Section ─────────────────────────────────────────────
export const HERO = {
  title: 'We Build',
  highlight: 'Digital Experiences',
  tagline: 'Architecting Future Digital Standards',
  description: 'ZeroCore Solutions provides professional web development, scalable e-commerce solutions, performance-driven digital marketing, creative branding, graphic design, intelligent AI solutions, and automated business workflows.',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'View Services',
};

export const ABOUT = {
  title: 'Your Partner for Digital Growth & Business Success',
  description: 'ZeroCore Solutions is a full-service digital agency helping businesses build a powerful online presence. From professional websites and e-commerce stores to digital marketing, branding, graphic design, and AI-powered solutions, we create strategies and experiences that drive growth, engagement, and long-term success.',
  stats: [
    { label: 'PROJECTS COMPLETED', value: 10, suffix: '+', subtext: 'Successfully delivered across multiple industries.' },
    { label: 'HAPPY CLIENTS', value: 4, suffix: '+', subtext: 'Building long-term partnerships through quality service.' },
    { label: 'YEARS TENURE', value: 2, suffix: '+', subtext: 'Helping businesses grow in the digital world.' },
    { label: 'SUCCESS RATE', value: 99.4, suffix: '%', subtext: 'Focused on delivering results and exceeding expectations.', decimals: 1 },
  ],
};

// ── Services Section ──────────────────────────────────────────
export const SERVICES_SECTION = {
  title: 'Digital Solutions Tailored for Your Business',
  description: 'From web development and e-commerce solutions to digital marketing, branding, and AI-powered automation, we provide customized services designed to help businesses grow, attract customers, and stay ahead of the competition.',
};

// ── Portfolio Section ─────────────────────────────────────────
export const PORTFOLIO_SECTION = {
  title: 'Our Recent Work',
  description: 'Explore a selection of projects that showcase our creativity, technical expertise, and commitment to delivering impactful digital solutions.',
};

// ── Pricing Section ───────────────────────────────────────────
export const PRICING_SECTION = {
  title: 'Flexible Plans for Every Business',
  description: 'Choose a package that fits your goals and budget. Whether you are a startup, growing brand, or established business, our solutions are designed to provide maximum value and measurable results.',
};

// ── Team Section ──────────────────────────────────────────────
export const TEAM_SECTION = {
  title: 'Meet the Team Behind ZCS',
  description: 'A passionate team of developers, designers, marketers, and creative professionals dedicated to helping businesses grow through innovative digital solutions.',
};

// ── Testimonials Section ──────────────────────────────────────
export const TESTIMONIALS_SECTION = {
  title: 'What Our Clients Say',
  description: 'Hear from businesses and entrepreneurs who have trusted ZeroCore Solutions to transform their ideas into successful digital experiences.',
};

// ── Contact Section ───────────────────────────────────────────
export const CONTACT = {
  title: 'Initialize Your Project',
  description: 'Tell us about your vision. We will respond within 24 hours with a tailored proposal.',
  email: 'zerocoresolutions@gmail.com',
  phone: '+92 330 2461099',
  location: 'Hyderabad, Pakistan',
};

// ── Testimonials Data ─────────────────────────────────────────
export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  company: string;
  text: string;
  rating: number;
  imageUrl: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ts1',
    author: 'Shahzad Malik',
    designation: 'CEO',
    company: 'Chai Pe Charcha',
    text: 'We are very pleased to have worked with your team, which is why we have revised the agreement. Your team has been highly cooperative throughout the process. To date, we have not revised agreements with any other company in this way. Your team consistently delivers work on time, and we truly appreciate your professionalism. We are confident that we will continue working together in the future, InshaAllah.',
    rating: 5,
    imageUrl: '/CPC logo1.png',
  },
  {
    id: 'ts2',
    author: 'Asad Ali',
    designation: 'Marketing Manager',
    company: 'Shine and Shine',
    text: 'The design is absolutely outstanding! Both the creativity and attention to detail are perfect. It is completely in line with our brand identity. Great work!',
    rating: 5,
    imageUrl: '/images.jpg',
  },
  {
    id: 'ts3',
    author: 'Sadam Hussain',
    designation: 'Owner',
    company: 'Paratha 09',
    text: 'You have created a very good design and the typography is excellent. We are very pleased with your work.',
    rating: 5,
    imageUrl: '/logo 09.jpg',
  },
  {
    id: 'ts4',
    author: 'Hamza Khan',
    designation: 'Owner',
    company: 'It Burger Time',
    text: 'Very good, totally clear, and completely satisfied with your work. The collaboration will continue, InshAllah.',
    rating: 5,
    imageUrl: '/IBT-LOGO-02.png',
  },
];

// ── Portfolio Data ────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  imageUrl: string;
  tags: string[];
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

export const PORTFOLIO: Project[] = [
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
        'Implemented custom reactive desktop hub UI for terminal managers',
      ],
    },
  },
  {
    id: 'p2',
    title: 'Vortex Spatial Store',
    category: 'E-Commerce',
    description: 'A WebGL interactive spatial product exploration sandbox and frictionless headless checkout pipeline.',
    client: 'Vortex Apparel Group',
    year: '2025',
    imageUrl: 'https://picsum.photos/seed/vortexapparel/800/600',
    tags: ['WebGL', 'Headless React', 'Tailwind'],
    caseStudy: {
      challenge: "Standard flat-grid stores felt generic and couldn't convey the fine premium tactile weave of Vortex's technical outer garment series.",
      solution: "Engineered a highly performance-optimized WebGL canvas sandbox allowing consumers to drape, light, and dissect custom outerwear coats dynamically down to the active thread count.",
      results: [
        'Boosted average consumer site dwell time from 1.2 to 5.6 minutes',
        'Increased checkout conversion percentage by 130%',
        'Zero frame drop rate on mobile devices',
      ],
    },
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
      challenge: "Zenith's legacy loan approval pipeline took 3-5 working days due to broken document parsing, messy security pipelines, and non-responsive mobile views.",
      solution: 'Developed a custom modern core portal with server-side document reading, robust field verification, and an ultra-secure, responsive banking-grade UI built using optimized React 19 streams.',
      results: [
        'Average document review/approval process reduced to 42 seconds',
        '99.99% application reliability rating',
        'Completed rigorous compliance tests with first-try pass',
      ],
    },
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
        'Secured feature nomination on premium branding portals',
      ],
    },
  },
];
