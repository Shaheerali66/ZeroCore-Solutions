/**
 * ─────────────────────────────────────────────────────────────
 *  TEAM DATA — /src/data/team.ts
 *  Add or remove team members by editing this array.
 *  imageUrl: use a real URL or place images in /public/team/
 * ─────────────────────────────────────────────────────────────
 */

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

export const TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Syed Shaheer Ali',
    designation: 'Founder & Chief Executive Officer',
    description: 'Visionary engineer focusing on scalable web platforms, cloud micro-architectures, and high-performance server structures.',
    imageUrl: '/10.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sshaheerali/',
      github: 'https://github.com/Shaheerali66',
      email: 'zerocoresolution@gmail.com',
    },
  },
  {
    id: 't2',
    name: 'Jawad Rajput',
    designation: 'Co-Founder & Head of E-Commerce',
    description: 'Award-winning digital craftsperson transforming abstract system structures into stunning visual narratives.',
    imageUrl: '/12.webp',
    socials: {

      linkedin: 'https://www.linkedin.com/in/muhammad-jawad-rajput-558025267/',
      email: 'jawadrajputzcs@gmail.com',
    },
  },
  {
    id: 't3',
    name: 'Zainab Memon',
    designation: 'Chief Marketing Officer',
    description: 'Interactive web front-runner obsessed with browser frames, smooth vector motion, and advanced physics canvases.',
    imageUrl: '/11.webp',
    socials: {
      linkedin: 'https://www.linkedin.com/in/zainab-memon-hr/',
      email: 'zainabmemonzcs@gmail.com',
    },
  },
  {
    id: 't4',
    name: 'Saif Bhatti',
    designation: 'Lead Photo & Video Editor',
    description: 'Analytical marketer engineering high-converting customer loops, ad spends, and semantic content pipelines.',
    imageUrl: '/13.png',
    socials: {
    },
  },
];
