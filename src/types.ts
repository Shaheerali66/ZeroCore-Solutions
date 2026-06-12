export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string; // references a Lucide icon
  features: string[];
}

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

export interface PricingPlan {
  id: string;
  name: string;
  pricePKR: number; // in PKR
  billingCycle: 'monthly' | 'yearly';
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  description: string;
  imageUrl: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  company: string;
  text: string;
  rating: number;
  imageUrl: string;
}

export interface SectionContent {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  teamTitle: string;
  teamDescription: string;
  pricingTitle: string;
  pricingDescription: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
}

