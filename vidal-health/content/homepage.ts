export const heroContent = {
  badge: 'Trusted by Payers Globally',
  title: 'Health insurers run on technology built for everything but health insurance.',
  subtitle:
    'Vidal Health provides technology solutions across the full Payer lifecycle — from claims and fraud to underwriting, provider networks, and member engagement. Purpose-built for health insurance, with intelligence embedded in every workflow where it matters.',
  primaryCta: { label: 'Book a Demo', href: '/contact' },
  secondaryCta: { label: 'Explore Platform →', href: '/products/vings' },
  stats: [
    { value: '150M+', label: 'Lives Covered' },
    { value: 'Pan-Asia', label: 'Operations' },
    { value: 'Enterprise', label: 'Scale' },
    { value: '20+', label: 'Years Domain Depth' },
  ],
};

export const solutionCards = [
  {
    icon: 'Layers',
    title: 'We need to transform our Core platform',
    description: 'Modernise your Core platform with Vings, and achieve up to 80% automation, AI first workflows and embedded Fraud, Waste & Abuse modules',
    href: '/products/vings',
  },
  {
    icon: 'ShieldCheck',
    title: 'Rising instances of Fraud & Abuse',
    description: 'Adopt ClaimShield, that Identifies Fraud & Abuse using Clinical rules or AI driven Document forgery rules',
    href: '/products/fraud-waste-abuse',
  },
  {
    icon: 'TrendingUp',
    title: 'Higher than estimated Loss Ratio',
    description: 'Sustainably grow your book with Price.IQ, AI driven pricing & underwriting platform, for accurate Loss Ratio estimates & automated workflows for higher conversion%',
    href: '/products/priceiq',
  },
  {
    icon: 'ScanText',
    title: 'Digitize hand written claims or tariff documents',
    description: 'Our AI powered product Enigma, digitizes, categorizes and translates to English. Integrate with any Core system to increase automation',
    href: '/products/enigma',
  },
  {
    icon: 'Smartphone',
    title: 'Comprehensive Mobile App with Wellness solutions',
    description: 'White-label mobile app combining claims filing, preventive wellness programmes across fitness, nutrition and mental health, and Health Coins rewards — all in one connected member experience.',
    href: '/products/wellsure',
  },
  {
    icon: 'Globe',
    title: 'Access to low cost providers with superior customer experience',
    description: 'Use our India Network services to access provider network in India for planned IP or OP cases, with up to 40% cost arbitrage and superior experience',
    href: '/products/india-network-access',
  },
];

export const featureRows = [
  {
    tag: 'Vings — Core Insurance Platform',
    title: 'The operational backbone of your health insurance business.',
    description:
      'VINGS runs the complete insurance lifecycle — policy, claims, underwriting, provider management, fraud, and billing — on a single connected system. Cognitive intelligence is built throughout, so the platform doesn\'t just process transactions. It supports better decisions at every step of the adjudication cycle. No stitching systems together. No gaps in the intelligence layer.',
    bullets: [
      'Supports ICD-9, ICD-10 AM/CM, CPT, CDT, Drug codes, ADA guidelines for Dental',
      'Modular by design — adopt specific capabilities or the full system',
      'Clinical intelligence built into adjudication from the ground up',
      'Designed for health insurance operations — not adapted from another vertical',
    ],
    cta: { label: 'Explore VINGS Platform', href: '/products/vings' },
    visual: {
      label: 'VINGS · Live Operations',
      image: '/platform/vings-operations.jpg',
      alt: 'Claims operations team working at their desks',
      value: '14,392',
      meta: 'Claims adjudicated today',
      trend: '↑ 9.2% vs yesterday',
      bars: [55, 72, 88, 64, 100, 76, 94],
      kpis: [
        { value: '98%', label: 'Auto-approve' },
        { value: '0.2%', label: 'Fraud Rate' },
        { value: '4.9★', label: 'CSAT Score' },
      ],
    },
  },
  {
    tag: 'ClaimShield — Fraud and Abuse Identification',
    title: 'Fraud doesn\'t announce itself. Your detection shouldn\'t wait for it.',
    description:
      'ClaimShield runs 7.5mn+ medical rules to identify clinical abuse — Clinician patterns, high cost service trends, cross-rule correlations, and more. For paper-driven reimbursement claims, our digitization engine converts unstructured handwritten or printed documents into structured output, with fraud checks covering document tampering, AI manipulation, syndicate analysis, and more.',
    bullets: [
      'Clinical rules engine built for health insurance fraud and billing patterns',
      'Cognitive AI detects what rules alone cannot catch across claims history',
      'Document intelligence flows directly into fraud checks',
      'Integrate at the time of claims processing or post-payment audit',
    ],
    cta: { label: 'Explore ClaimShield AI', href: '/products/fraud-waste-abuse' },
    visual: {
      label: 'Fraud Detection · Live',
      image: '/platform/claimshield-clinical-review.jpg',
      alt: 'Clinician reviewing a patient case on a tablet',
      value: '94%',
      meta: 'Detection accuracy',
      trend: 'Alerts before payment release',
      bars: [65, 78, 100, 68, 84, 56, 96],
      kpis: [
        { value: 'Pre-pay', label: 'Intervention' },
        { value: 'Real-time', label: 'Alerts' },
        { value: 'Clinical', label: 'Rules Engine' },
      ],
    },
  },
  {
    tag: 'ENIGMA — Document Intelligence',
    title: 'Clean data doesn\'t happen by accident. It starts at the document.',
    description:
      'Every claims decision is only as reliable as the data behind it — and that data starts with a document. ENIGMA extracts structured, usable information from any health insurance document, across formats and languages, and feeds it directly into adjudication and fraud detection. What used to require a manual handling step becomes an automated input. Deploy standalone, or embedded inside VINGS as the data quality layer the entire platform depends on.',
    bullets: [
      'Processes scanned, digital, handwritten, and multi-language documents',
      'Structured output feeds directly into claims and fraud workflows',
      'Removes the manual document-handling bottleneck from high-volume operations',
      'Standalone or embedded within VINGS — your choice',
    ],
    cta: { label: 'Explore ENIGMA', href: '/products/enigma' },
    visual: {
      label: 'ENIGMA · Processing',
      image: '/platform/enigma-documents.jpg',
      alt: 'Two people reviewing printed claim documents at a desk',
      value: '92%',
      meta: 'Auto-processing rate',
      trend: 'Multi-format · Multi-language',
      bars: [80, 92, 74, 88, 96, 70],
      kpis: [
        { value: 'Any', label: 'Doc Format' },
        { value: 'Multi-lang', label: 'Support' },
        { value: 'Embedded', label: 'or Standalone' },
      ],
    },
  },
];

export const statsBand = [
  { value: '150', suffix: 'M+', label: 'Lives Covered' },
  { value: '20', suffix: '+', label: 'Years Domain Depth' },
  { value: 'Pan', suffix: '-Asia', label: 'Operations' },
  { value: 'Enterprise', suffix: '', label: 'Scale' },
];

export const whyCards = [
  {
    icon: 'Award',
    title: '20 years of practitioner expertise.',
    description:
      'Two decades of focus on a single vertical. Built around the operational reality of health insurance — claims logic, clinical complexity, provider contracting, and multi-market regulation.',
  },
  {
    icon: 'Layers',
    title: 'Start with one. Scale to the suite.',
    description:
      'Every Vidal Health product solves a real problem on its own and connects into the wider suite. Solve your most urgent gap first — expand as your needs grow, without re-platforming.',
  },
  {
    icon: 'Cpu',
    title: 'Intelligence in the workflow, not alongside it.',
    description:
      'Clinical AI is embedded inside adjudication, fraud detection, and document processing — not a reporting layer applied after the fact. Better decisions happen where decisions are made.',
  },
  {
    icon: 'Cloud',
    title: 'Infrastructure built for insurance scale.',
    description:
      'Cloud-native architecture designed for enterprise claim volumes and live health insurance uptime requirements. Scale is built in — not bolted on.',
  },
  {
    icon: 'SlidersHorizontal',
    title: 'Configured around your operations.',
    description:
      'Your clinical rules, policy logic, and regulatory requirements are built in before go-live — not generic defaults you work around. Implementation is a structured partnership from day one.',
  },
  {
    icon: 'Stethoscope',
    title: 'Built by Doctors and Engineers.',
    description:
      'Our team combines clinical expertise with deep engineering — bringing together the domain knowledge of practitioners and the technical rigour to embed it into scalable, production-grade systems.',
  },
];

export const caseStudies = [
  {
    icon: 'ShieldCheck',
    client: 'Regional Insurer — UAE',
    category: 'Fraud & Waste Reduction',
    challenge: 'Manual review couldn’t keep pace — flagged claims queued for days while fraud losses kept growing.',
    solution: 'ClaimShield AI, fed by ENIGMA’s document intake, runs clinical rules and cognitive AI inside adjudication — before payment, not after.',
    outcome: 'Fraud control moved from recovery to prevention. Automated detection now clears most flagged cases pre-payment.',
    kpis: [
      { value: 'Pre-pay', label: 'Fraud Control' },
      { value: 'Clinical', label: 'Rules Engine' },
      { value: 'Automated', label: 'Doc Processing' },
    ],
  },
  {
    icon: 'Zap',
    client: 'Leading TPA — India',
    category: 'Claims Automation',
    challenge: 'Rising volumes and manual adjudication were driving up delays and cost, with no structural way out.',
    solution: 'VINGS Claims automates pre-authorisation and straight-through processing — manual work now limited to exceptions and flags.',
    outcome: 'Most claims now clear without manual intervention. Turnaround improved as the team shifted from processing to oversight.',
    kpis: [
      { value: 'Automated', label: 'Adjudication' },
      { value: 'Reduced', label: 'Manual Touch' },
      { value: 'Faster', label: 'TAT' },
    ],
  },
  {
    icon: 'Building2',
    client: 'National Health Network',
    category: 'Network & Platform Scale',
    challenge: 'Provider data was scattered across legacy systems — credentialing was slow and billing was inconsistent.',
    solution: 'VINGS Provider Network Management consolidated credentialing, billing, and performance tracking onto one platform.',
    outcome: 'Thousands of providers now run on one system, with full visibility and no more switching between tools.',
    kpis: [
      { value: 'Unified', label: 'Provider Data' },
      { value: 'Centralised', label: 'Credentialing' },
      { value: 'Single', label: 'Platform View' },
    ],
  },
];

export const homepageCta = {
  title: 'Your operation is the best place to start.',
  description: 'Walk through the suite with our team — in the context of your workflows, your challenges, and your market. No standard demo.',
  primary: { label: 'Book a Demo', href: '/contact' },
};
