/**
 * ─────────────────────────────────────────────────────────────
 *  CLIENTS DATA — /src/data/clients.ts
 *
 *  All client / brand showcase data lives here.
 *  To add, remove, or update clients → edit the array below.
 *
 *  Logo Tips:
 *  - Place logo images in /public/clients/ folder
 *  - Reference them as "/clients/logo-name.png"
 *  - Use transparent PNG or SVG for best results
 *  - Recommended size: 200×80px (white or light-colored)
 * ─────────────────────────────────────────────────────────────
 */

export interface Client {
  id: string;
  name: string;
  /** Path to the logo image (place in /public/clients/) */
  logo: string;
  /** Optional client website URL */
  website?: string;
}

export const CLIENTS: Client[] = [
  {
    id: 'cl1',
    name: 'Her Turn',
    logo: '/HER TURN logo bg.png',
    website: '',
  },
  {
    id: 'cl2',
    name: 'Chai Pe Charcha',
    logo: '/CPC logo.png',
    website: 'https://vortex-apparel.com',
  },
  {
    id: 'cl3',
    name: 'Paratha 09',
    logo: '/09 logo without back.png',
    website: 'https://zenith-capital.com',
  },
  {
    id: 'cl4',
    name: 'It Burger Time',
    logo: '/IBT-LOGO-02.png',
    website: 'https://aether-publishing.com',
  },
  {
    id: 'cl5',
    name: 'BON BON Cafe',
    logo: '/BONBON Cafe.png',
    website: 'https://sofia-threads.com',
  },
  {
    id: 'cl5',
    name: 'Shine and Shine',
    logo: '/shine shine.png',
    website: 'https://sofia-threads.com',
  },
];

export const CLIENTS_SECTION = {
  title: 'Our Recent Clients',
  description:
    'Trusted by growing businesses, startups, and established brands across multiple industries.',
};
