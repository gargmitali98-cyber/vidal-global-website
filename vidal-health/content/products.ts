import type { ProductDetail, ProductSummary } from '../types';

export const productCards: ProductSummary[] = [
  {
    slug: 'vings',
    title: 'VINGS Platform',
    description:
      'The complete health insurance lifecycle system — policy, claims, fraud, pricing, network and more — all integrated into one enterprise platform.',
    icon: 'Layers',
    section: 'Core Platform',
    href: '/products/vings',
  },
  {
    slug: 'fraud-waste-abuse',
    title: 'ClaimShield AI',
    description:
      'Clinical AI rules + cognitive models detecting both document-based and clinical fraud in real time — before payment.',
    icon: 'ShieldCheck',
    section: 'Risk & Intelligence',
    href: '/products/fraud-waste-abuse',
  },
  {
    slug: 'enigma',
    title: 'ENIGMA',
    description:
      'AI document digitization — extract and structure data from any health insurance document. Standalone or embedded in FWA.',
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

export const productDetails: Record<string, ProductDetail> = {
  'vings': {
    slug: 'vings',
    tag: 'Core Platform',
    title: 'VINGS InsurTech Platform',
    desc: 'The complete health insurance system covering every dimension of the lifecycle. Built for insurers and TPAs who need precision, scalability and AI-powered automation at enterprise scale.',
    route: '/products/vings',
    metrics: [
      { v: '150M+',    l: 'Lives on Platform' },
      { v: 'Automated', l: 'Adjudication engine' },
      { v: 'Pan-Asia',  l: 'Operations' },
      { v: '99.9%',    l: 'Uptime SLA' },
    ],
    features: [
      { i: '📋', t: 'Policy Administration', d: 'Build, customise and manage insurance policies across individual, group and government schemes with automated renewals and endorsements.' },
      { i: '⚡', t: 'Claims Lifecycle', d: 'End-to-end claims processing — pre-auth, adjudication, settlement and appeals — with AI-driven automation and clinical rule engines.' },
      { i: 'ShieldCheck', t: 'Fraud, Waste & Abuse', d: 'Cognitive AI and clinical rules detecting fraud before payment is released. Document-based and clinical fraud covered end-to-end.' },
      { i: 'ScanText', t: 'ENIGMA Document AI', d: 'Intelligent document digitization feeding structured data into every workflow — from any format, language or quality level.' },
      { i: '🏥', t: 'Provider Network', d: 'Empanelment, credentialing, contract management and performance monitoring for your provider ecosystem.' },
      { i: '💊', t: 'Pharmacy Benefit Mgmt', d: 'Formulary management, prior auth, drug utilisation review and network pharmacy management to control pharmacy costs.' },
    ],
    benefits: [
      { i: '⚙️', t: 'One Integrated System', d: 'All products work together on one platform, removing data silos and accelerating decision making.' },
      { i: '📈', t: 'Operational Efficiency', d: 'AI and automation reduce manual effort, speed approval cycles and improve accuracy across the lifecycle.' },
      { i: '🔐', t: 'Enterprise Scale', d: 'Cloud-native architecture supports large enterprise deployments with high availability and security.' },
    ],
  },
  'fraud-waste-abuse': {
    slug: 'fraud-waste-abuse',
    tag: 'Risk & Intelligence',
    title: 'ClaimShield AI',
    desc: 'Clinical rule engines combined with cognitive AI — detecting both document-based and clinical fraud before a single claim is paid out. Real-time alerts, regulatory compliance, and a continuously learning detection model.',
    route: '/products/fraud-waste-abuse',
    metrics: [
      { v: '10K+',    l: 'Clinical Fraud Rules' },
      { v: 'Pre-pay', l: 'Detection Timing' },
      { v: 'Live',    l: 'Fraud Alerts' },
      { v: 'Full',    l: 'Audit Trail' },
    ],
    features: [
      { i: '🧠', t: 'Clinical Rules Engine', d: '10,000+ clinical fraud indicators covering upcoding, unbundling, phantom billing, and 200+ fraud patterns specific to health insurance.' },
      { i: 'ScanText', t: 'Cognitive AI Detection', d: 'Machine learning models trained on health insurance claims data to identify anomalous billing patterns invisible to rule engines.' },
      { i: '📄', t: 'Document Fraud via ENIGMA', d: 'ENIGMA feeds document-based fraud detection — forged discharge summaries, inflated invoices, duplicate claims — caught before adjudication.' },
      { i: '⚡', t: 'Real-time Pre-payment Alerts', d: 'Suspicious claims flagged before payment is released. Configurable alert thresholds by claim type, provider, and amount.' },
      { i: '📋', t: 'Compliance Reporting', d: 'Automated regulatory reports for audit submissions, internal governance and board-level fraud risk dashboards.' },
      { i: '🏥', t: 'Provider Behaviour Profiling', d: 'Continuous monitoring of provider billing behaviour with peer benchmarking — identify outlier providers before they become systemic risk.' },
    ],
    benefits: [
      { i: '💰', t: 'Protect Your Loss Ratio', d: 'Fraud, waste and abuse represent a material portion of health insurance spend. Our system directly protects your bottom line.' },
      { i: '⚖️', t: 'Regulatory Compliance', d: 'Stay compliant with anti-fraud regulations across all operating markets with automated audit trails and regulatory reporting.' },
      { i: 'ShieldCheck', t: 'Network Integrity', d: 'Maintain a trusted provider network with continuous credential monitoring and behaviour analysis.' },
    ],
  },
  'enigma': {
    slug: 'enigma',
    tag: 'Document AI',
    title: 'ENIGMA — Document Digitization AI',
    desc: 'ENIGMA transforms any health insurance document into structured, actionable data using AI. Sold standalone for document digitization or embedded as the document intelligence layer within FWA.',
    route: '/products/enigma',
    metrics: [
      { v: 'Any',  l: 'Document Format' },
      { v: 'Live', l: 'Processing' },
      { v: '80%',  l: 'Processing Time Saved' },
      { v: 'Multi', l: 'Language Support' },
    ],
    features: [
      { i: '📄', t: 'Universal Document Extraction', d: 'Any format: scanned PDFs, digital documents, handwritten forms, multi-page records. Extracts structured data regardless of format or language.' },
      { i: '🔗', t: 'Claims Pipeline Integration', d: 'Feeds structured document data directly into claims adjudication workflows — eliminating manual data entry.' },
      { i: 'ShieldCheck', t: 'Document Fraud Detection', d: 'When embedded in FWA, identifies forged documents, altered invoices, duplicate submissions and manipulated discharge summaries.' },
      { i: '🌐', t: 'Multi-language Support', d: 'Processes documents in multiple languages including English, Arabic, Hindi and other major regional languages.' },
      { i: '⚡', t: 'Real-time Processing', d: 'Documents processed and structured data returned in near real-time — enabling same-session pre-auth decisions.' },
      { i: '🔌', t: 'Standalone or Embedded', d: 'Deploy as a standalone document processing service via API, or embed directly into VINGS claims and FWA workflows.' },
    ],
    benefits: [
      { i: '🚀', t: 'Faster Processing', d: 'What takes a claims processor 20 minutes takes ENIGMA seconds — at higher accuracy with a full audit trail.' },
      { i: '🎯', t: 'Zero Manual Data Entry', d: 'Structured data flows directly into downstream systems. No transcription errors, no rekeying delays.' },
      { i: '💡', t: 'Dual Commercial Model', d: 'Sell to clients who only need document digitization, or bundle with FWA for the full fraud detection pipeline.' },
    ],
  },
  'priceiq': {
    slug: 'priceiq',
    tag: 'Operations',
    title: 'PriceIQ',
    desc: 'Data-driven actuarial modelling, risk-based pricing and underwriting rules — purpose-built for health insurance.',
    route: '/products/priceiq',
    metrics: [
      { v: 'Live',  l: 'Market Data' },
      { v: 'Any',   l: 'Scheme Type' },
      { v: 'Full',  l: 'Audit Trail' },
      { v: 'Rapid', l: 'Go-live' },
    ],
    features: [
      { i: 'TrendingUp', t: 'Actuarial Modelling', d: 'Sophisticated models factoring in demographics, utilisation history, market conditions and claims experience.' },
      { i: '📉', t: 'Rate Optimisation', d: 'Data-driven pricing balancing market competitiveness with profitability targets — with scenario modelling.' },
      { i: '🔮', t: 'Predictive Analytics', d: 'Forecast future claims spend and adjust pricing proactively before adverse selection sets in.' },
      { i: '📋', t: 'Underwriting Rules Engine', d: 'Configurable rules for group and individual underwriting with exception handling and approval routing.' },
      { i: '🏥', t: 'Network Rate Management', d: 'Manage provider fee schedules, DRG rates and track network cost trends feeding directly into product pricing.' },
      { i: '📈', t: 'Experience Reporting', d: 'Claims experience analysis, loss triangle development and trend factors for rate filing and board governance.' },
    ],
    benefits: [
      { i: '📈', t: 'Improved Profitability', d: 'Better pricing accuracy directly improves loss ratios and operating margins.' },
      { i: '⚡', t: 'Faster Quoting', d: 'Generate competitive group scheme quotes in minutes instead of days — critical for winning competitive tenders.' },
      { i: '🔬', t: 'Actuarial Governance', d: 'Full audit trail of every rate change decision with assumptions, sign-off workflow and version control.' },
    ],
  },
  'india-network-access': {
    slug: 'india-network-access',
    tag: 'Network Access',
    title: 'India Network Access',
    desc: 'Enable international insured members to access affordable, quality healthcare in India — with cashless facilities, care coordination and concierge support.',
    route: '/products/india-network-access',
    metrics: [
      { v: '12,500+',   l: 'Empanelled Hospitals' },
      { v: '100,000+',  l: 'Practicing Doctors' },
      { v: 'Up to 30%', l: 'Cost Advantage' },
      { v: 'Pan-India', l: 'Coverage' },
    ],
    features: [
      { i: '🏥', t: 'Cashless Hospital Network', d: 'Access to 12,500+ empanelled hospitals across India with pre-negotiated rates and cashless treatment guarantee.' },
      { i: '🧳', t: 'Travel & Care Coordination', d: 'End-to-end care journey management — from pre-travel consultation to hospital admission, treatment and discharge.' },
      { i: '📞', t: '24/7 Concierge', d: 'Dedicated care concierge service for international members navigating the Indian healthcare system.' },
      { i: '💰', t: 'Cost Containment', d: 'Pre-negotiated hospital tariffs, package rates for common procedures and active cost management throughout treatment.' },
      { i: '📄', t: 'Claims Management', d: 'Seamless cashless claims settlement with direct hospital billing — no out-of-pocket payments for covered treatments.' },
      { i: '🌐', t: 'Multi-lingual Support', d: 'Support in English, Arabic, Hindi and other regional languages for international members from GCC, SEA and Europe.' },
    ],
    benefits: [
      { i: '💸', t: 'Significant Cost Advantage', d: 'Access to high-quality Indian healthcare at substantially lower cost vs comparable international markets.' },
      { i: '🏆', t: 'Premium Care Quality', d: 'Access to NABH-accredited hospitals and internationally trained specialists across India\'s major medical centres.' },
      { i: '😊', t: 'Member Satisfaction', d: 'Fully managed care journeys reduce member stress and dramatically improve post-treatment satisfaction scores.' },
    ],
  },
};

export const productHeroCta = {
  primary: { label: 'Book a Demo', href: '/contact?intent=demo' },
  secondary: { label: 'Talk to Sales', href: '/contact' },
};

export const productOverview = {
  title: 'Products & Solutions',
  description:
    'Six purpose-built products covering every dimension of health insurance operations — available standalone or as part of the integrated VINGS platform.',
};
