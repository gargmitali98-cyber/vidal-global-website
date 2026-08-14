import type { MegaMenuSection, NavLink, ProductSummary } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Products', href: '/products', dropdown: true },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const megaMenuSections: MegaMenuSection[] = [
  {
    title: 'Platform',
    items: [
      {
        slug: 'vings',
        icon: 'Layers',
        label: 'VINGS Platform',
        description: 'Full insurance lifecycle',
        href: '/products/vings',
      },
    ],
  },
  {
    title: 'Risk & Intelligence',
    items: [
      {
        slug: 'fraud-waste-abuse',
        icon: 'ShieldCheck',
        label: 'ClaimShield AI',
        description: 'Clinical AI fraud detection',
        href: '/products/fraud-waste-abuse',
      },
      {
        slug: 'enigma',
        icon: 'ScanText',
        label: 'ENIGMA',
        description: 'Document digitization AI',
        href: '/products/enigma',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        slug: 'priceiq',
        icon: 'TrendingUp',
        label: 'PriceIQ',
        description: 'Actuarial & underwriting',
        href: '/products/priceiq',
      },
    ],
  },
  {
    title: 'Network & Wellness',
    items: [
      {
        slug: 'india-network-access',
        icon: 'Globe',
        label: 'India Network Access',
        description: 'Global access to Indian care',
        href: '/products/india-network-access',
      },
      {
        slug: 'wellsure',
        icon: 'Smartphone',
        label: 'WellSure',
        description: 'Wellness & engagement platform',
        href: '/products/wellsure',
      },
    ],
  },
];

export const productSummaryItems: ProductSummary[] = [
  {
    slug: 'vings',
    title: 'VINGS Platform',
    description: 'The complete health insurance lifecycle system — policy, claims, fraud, pricing, network and more — all integrated into one enterprise platform.',
    icon: 'Layers',
    section: 'Core Platform',
    href: '/products/vings',
  },
  {
    slug: 'fraud-waste-abuse',
    title: 'ClaimShield AI',
    description: 'Clinical AI rules + cognitive models detecting both document-based and clinical fraud in real time — before payment.',
    icon: 'ShieldCheck',
    section: 'Risk & Intelligence',
    href: '/products/fraud-waste-abuse',
  },
  {
    slug: 'enigma',
    title: 'ENIGMA',
    description: 'AI document digitization — extract and structure data from any health insurance document. Standalone or embedded in FWA.',
    icon: 'ScanText',
    section: 'Risk & Intelligence',
    href: '/products/enigma',
  },
  {
    slug: 'priceiq',
    title: 'PriceIQ',
    description: 'Data-driven actuarial modelling, risk-based pricing and underwriting rules built specifically for health insurance.',
    icon: 'TrendingUp',
    section: 'Operations',
    href: '/products/priceiq',
  },
  {
    slug: 'india-network-access',
    title: 'India Network Access',
    description: 'Enable international insured members to access affordable, quality healthcare in India.',
    icon: 'Globe',
    section: 'Network & Wellness',
    href: '/products/india-network-access',
  },
  {
    slug: 'wellsure',
    title: 'WellSure',
    description: 'Unified wellness and engagement platform helping payers and employers drive preventive health behaviour and reduce claims spend.',
    icon: 'Smartphone',
    section: 'Network & Wellness',
    href: '/products/wellsure',
  },
];

export const productPreviewMap: Record<string, { tag: string; title: string; desc: string; kpis: { v: string; l: string }[]; prodHref: string }> = {
  vings: {
    tag: 'Core Platform',
    title: 'VINGS Platform',
    desc: 'The complete health insurance lifecycle system — policy, claims, fraud, pricing, and network all in one.',
    kpis: [
      { v: '150M+', l: 'Lives' },
      { v: '98%',   l: 'Auto-adjud.' },
      { v: '800+',  l: 'Locations' },
      { v: '99%',   l: 'Uptime' },
    ],
    prodHref: '/products/vings',
  },
  'fraud-waste-abuse': {
    tag: 'Risk Intelligence',
    title: 'ClaimShield AI',
    desc: 'Clinical AI + cognitive rules detecting fraud before payment is released.',
    kpis: [
      { v: '10K+',    l: 'Rules' },
      { v: 'Pre-pay', l: 'Detection' },
      { v: 'Live',    l: 'Alerts' },
      { v: 'Full',    l: 'Audit Trail' },
    ],
    prodHref: '/products/fraud-waste-abuse',
  },
  enigma: {
    tag: 'Document AI',
    title: 'ENIGMA',
    desc: 'AI document digitization — any format, any language, integrated with FWA.',
    kpis: [
      { v: 'Any',   l: 'Format' },
      { v: 'Live',  l: 'Processing' },
      { v: '80%',   l: 'Time Saved' },
      { v: 'Multi', l: 'Language' },
    ],
    prodHref: '/products/enigma',
  },
  'priceiq': {
    tag: 'Operations',
    title: 'PriceIQ',
    desc: 'Data-driven actuarial models and underwriting rules for health insurance.',
    kpis: [
      { v: 'Live',   l: 'Data' },
      { v: 'Any',    l: 'Scheme Type' },
      { v: 'Full',   l: 'Audit Trail' },
      { v: 'Rapid',  l: 'Go-live' },
    ],
    prodHref: '/products/priceiq',
  },
  'india-network-access': {
    tag: 'Network Access',
    title: 'India Network Access',
    desc: 'Enable international members to access affordable, quality healthcare in India.',
    kpis: [
      { v: '12,500+',   l: 'Hospitals' },
      { v: '100,000+',  l: 'Doctors' },
      { v: 'Up to 30%', l: 'Cost Advantage' },
      { v: 'Pan-India', l: 'Coverage' },
    ],
    prodHref: '/products/india-network-access',
  },
  'wellsure': {
    tag: 'Wellness Platform',
    title: 'WellSure',
    desc: 'Unified wellness and engagement platform for payers and employers.',
    kpis: [
      { v: 'Up to 60%', l: 'Engagement' },
      { v: 'Up to 5%',  l: 'IP Cost Impact' },
      { v: 'Unified',   l: 'Rewards Engine' },
      { v: 'Payer',     l: 'Enterprise-grade' },
    ],
    prodHref: '/products/wellsure',
  },
};
