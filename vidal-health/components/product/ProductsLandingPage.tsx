'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const platformStats = [
  { value: '150M+', label: 'Lives Covered' },
  { value: '12',    label: 'Products' },
  { value: '10M+',  label: 'Claims / Year' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '20+',   label: 'Years Domain' },
];

type StageProduct = {
  slug: string;
  name: string;
  icon: string;
  tag: string;
  desc: string;
  stat: string;
  statLabel: string;
  href: string;
  hasPage?: boolean;
  benefits?: string[];
};

type Stage = {
  id: string;
  num: string;
  label: string;
  headline: string;
  sub: string;
  flow: string;
  vings: boolean;
  dataOut: string;
  products: StageProduct[];
};

const STAGES: Stage[] = [
  {
    id: 'pricing',
    num: '01',
    label: 'Product Pricing',
    headline: 'Price every risk correctly. Win profitable business.',
    sub: 'Actuarial models and risk-based underwriting rules that generate accurate quotes — for individuals, groups and government schemes — in seconds, not days.',
    flow: 'Risk profiles flow into Sales',
    vings: false,
    dataOut: 'Actuarial models · Risk profiles · Underwriting rules',
    products: [
      {
        slug: 'priceiq',
        name: 'PriceIQ',
        icon: 'TrendingUp',
        tag: 'Actuarial & Underwriting',
        desc: 'Data-driven actuarial modelling and risk-based underwriting rules that replace spreadsheets with a systematic pricing engine — accurate for individual plans, large groups and government schemes.',
        stat: '10×', statLabel: 'Faster Quotes',
        href: '/products/priceiq',
        hasPage: true,
        benefits: ['Actuarial model builder', 'Group & individual rating', 'Real-time quote engine'],
      },
    ],
  },
  {
    id: 'sales',
    num: '02',
    label: 'Sales & Growth',
    headline: 'Close faster. Build a distribution engine that scales.',
    sub: 'Unified CRM, broker management and real-time commission tracking — from first lead to bound policy, with full pipeline visibility.',
    flow: 'Policy data flows into Operations',
    vings: false,
    dataOut: 'Policy structures · Member profiles · Commission records',
    products: [
      {
        slug: 'sales-platform',
        name: 'Sales Platform',
        icon: 'Briefcase',
        tag: 'CRM & Distribution',
        desc: 'A purpose-built CRM for health insurance distribution — managing leads, brokers, corporate accounts and agent commissions in one system with live pipeline visibility.',
        stat: '3×', statLabel: 'Conversion Rate',
        href: '/products/sales-platform',
        hasPage: false,
        benefits: ['Flexible product creation for Broker and Agents', 'Hierarchy wise underwriting approval to sales team', 'Corporate account pipeline'],
      },
    ],
  },
  {
    id: 'claims',
    num: '03',
    label: 'Process Claims',
    headline: 'The engine behind claims — from submission to settlement.',
    sub: 'VINGS is the core platform orchestrating the entire claims lifecycle — automated pre-auth, AI adjudication, document intelligence and workflow orchestration at scale.',
    flow: 'Every claim screened for fraud',
    vings: false,
    dataOut: 'Adjudication decisions · Payment records · Workflow data',
    products: [
      {
        slug: 'vings',
        name: 'VINGS Platform',
        icon: 'Layers',
        tag: 'Core Claims Engine',
        desc: 'The unified claims administration and workflow orchestration platform — automated pre-auth, AI adjudication, appeals management and payment processing at scale.',
        stat: '85%', statLabel: 'Auto-adjudication',
        href: '/products/vings',
        hasPage: true,
      },
      {
        slug: 'pharmacy-benefit-management',
        name: 'Pharmacy Benefits',
        icon: 'Pill',
        tag: 'Pharmacy',
        desc: 'Formulary management, drug utilisation review and prior-auth automation integrated directly into the claims rail to reduce pharmacy spend.',
        stat: '25%', statLabel: 'Cost Reduction',
        href: '/products/pharmacy-benefit-management',
        hasPage: false,
      },
    ],
  },
  {
    id: 'fraud',
    num: '04',
    label: 'Detect Fraud & Risk',
    headline: 'Stop Fraud & Abuse, before claims payout.',
    sub: 'Clinical AI and 10,000+ fraud indicators screen every claim pre-payment — catching waste, abuse and phantom billing in real time.',
    flow: 'Clean claims matched to network',
    vings: false,
    dataOut: 'Risk scores · Fraud flags · Audit trails',
    products: [
      {
        slug: 'fraud-waste-abuse',
        name: 'ClaimShield AI',
        icon: 'ShieldCheck',
        tag: 'Risk Intelligence',
        desc: 'Cognitive AI with 10,000+ clinical fraud indicators detecting anomalous billing patterns before any payment is released.',
        stat: '94%', statLabel: 'Detection Rate',
        href: '/products/fraud-waste-abuse',
        hasPage: true,
      },
      {
        slug: 'enigma',
        name: 'ENIGMA',
        icon: 'ScanText',
        tag: 'Document AI',
        desc: 'Extracts and validates structured data from any document format, feeding verified intelligence directly into fraud detection and compliance workflows.',
        stat: '92%', statLabel: 'Auto-extraction',
        href: '/products/enigma',
        hasPage: true,
      },
    ],
  },
  {
    id: 'network',
    num: '05',
    label: 'Manage the Network',
    headline: 'Build the provider ecosystem your members count on.',
    sub: 'End-to-end network operations — credentialing, contract management, cashless eligibility and global care coordination across 1.5L+ partners.',
    flow: 'Network data enriches member experience',
    vings: false,
    dataOut: 'Provider directory · Eligibility data · Contract terms',
    products: [
      {
        slug: 'india-network-access',
        name: 'India Network',
        icon: 'Globe',
        tag: 'Global Care Access',
        desc: '12,500+ cashless hospitals with end-to-end care coordination, cross-border claim processing and international member support.',
        stat: 'Up to 30%', statLabel: 'Cost Advantage',
        href: '/products/india-network-access',
        hasPage: true,
      },
      {
        slug: 'provider-network',
        name: 'Network Module',
        icon: 'Network',
        tag: 'Network Operations',
        desc: 'Manage your Network through a scalable platform including Tariff flexibility, provider audit, and dynamic network segmentation.',
        stat: 'Scalable', statLabel: 'Network Management',
        href: '/products/provider-network',
        hasPage: false,
      },
    ],
  },
  {
    id: 'cx',
    num: '06',
    label: 'Customer Experience',
    headline: 'Turn every member touchpoint into a seamless experience.',
    sub: 'White-label apps, wellness tools and AI-powered service automation that resolve queries, process endorsements and drive member retention — automatically.',
    flow: '',
    vings: false,
    dataOut: 'Engagement data · Health signals · Service records',
    products: [
      {
        slug: 'mobile-app',
        name: 'Mobile App',
        icon: 'Smartphone',
        tag: 'White-Label App',
        desc: 'Full white-label iOS and Android app — digital claims, cashless eligibility, policy access and wellness in one place under your brand.',
        stat: '4.8★', statLabel: 'App Rating',
        href: '/products/mobile-app',
        hasPage: false,
      },
      {
        slug: 'wellsure',
        name: 'WellSure',
        icon: 'HeartPulse',
        tag: 'Wellness Platform',
        desc: 'Platform to engage your customers with Wellness programs, Activity based challenges and long term member outcomes.',
        stat: 'Up to 60%', statLabel: 'Engagement Rate',
        href: '/products/wellsure',
        hasPage: true,
      },
      {
        slug: 'customer-service-automation',
        name: 'Service Automation',
        icon: 'Target',
        tag: 'AI Customer Service',
        desc: 'AI powered Voice and Non Voice customer service automation — resolving member queries, endorsements and complaints without manual intervention.',
        stat: '60%', statLabel: 'Resolution Rate',
        href: '/products/customer-service-automation',
        hasPage: false,
      },
    ],
  },
];

/* ── Ecosystem Flow Section ─────────────────────────────── */

const ECO_FLOWS = [
  {
    icon: 'Zap',
    title: 'Unified Claims Rail',
    desc: 'Pricing risk data flows into claims adjudication automatically — no re-keying, no data loss between stages.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Real-time Fraud Signals',
    desc: 'ENIGMA document intelligence feeds fraud models that screen every claim before any payment is released.',
  },
  {
    icon: 'Link2',
    title: 'Single Member Identity',
    desc: 'One member record across policy, claims, network and mobile app — every product stays in sync automatically.',
  },
  {
    icon: 'TrendingUp',
    title: 'Intelligence Reuse',
    desc: 'Actuarial models built in pricing are reused in claims scoring and fraud detection — no duplicate effort.',
  },
];

/* Was a dark, click-to-expand pipeline diagram with an animated "VINGS
   spine" and a per-stage detail panel — duplicating the Lifecycle Journey
   section directly above (both walk the same six stages, and that one now
   shows full detail for every stage without a click). Kept: a light,
   static strip for at-a-glance orientation, and the four integration facts
   that don't appear anywhere else on the page. */
function EcosystemFlow() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="eyebrow">Platform Integration</span>
          <h2 className="sec-title">One ecosystem. Zero silos.</h2>
          <p className="sec-sub">
            Every Vidal Health product shares a unified data layer. Risk profiles built in pricing feed claims adjudication. Fraud signals from ENIGMA block payments in real time. Network eligibility powers the mobile app. No integration project required — it is built in.
          </p>
        </motion.div>

        <div className="ecofl-strip" role="group" aria-label="Platform stages">
          {STAGES.map((s, i) => (
            <Fragment key={s.id}>
              {i > 0 && <span className="ecofl-strip-line" aria-hidden="true" />}
              <div className="ecofl-strip-node">
                <span className="ecofl-strip-icon" aria-hidden="true">
                  {s.products[0] && <Icon name={s.products[0].icon} size={18} />}
                </span>
                <span className="ecofl-strip-label">{s.label}</span>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="why-grid why-grid--4">
          {ECO_FLOWS.map((f, i) => (
            <motion.div
              key={f.title}
              className="why-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease, delay: 0.1 + i * 0.07 }}
            >
              <div className="why-icon"><Icon name={f.icon} size={20} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Lifecycle Journey — every stage laid out in full.
   This was a scroll-driven stepper: a tall scroll track behind a sticky
   panel showed one stage at a time, so most of the catalogue was hidden
   behind either scroll position or a tab click. On a page whose whole job
   is "here is everything we sell", that buried the products. All stages
   now render stacked and scannable in one pass. ─────────────────────── */

function StageBlock({ stage, index }: { stage: Stage; index: number }) {
  return (
    <motion.div
      className={`lcj-stage${index > 0 ? ' lcj-stage--divided' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="rail-year">{stage.num} · {stage.label}</div>
      <div className="rail-title">{stage.headline}</div>
      <p className="rail-desc">{stage.sub}</p>

      <div className="lcj-stage-products">
        {stage.products.map((p) => (
          <div
            key={p.slug}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--r-card)',
              padding: '32px 34px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: '6px', gap: '10px', marginBottom: '12px' }}>
              <span style={{ display: 'flex', color: 'var(--brand-lime)', flexShrink: 0 }} aria-hidden="true"><Icon name={p.icon} size={20} /></span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{p.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{p.tag}</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>{p.desc}</p>
            {p.benefits && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '20px' }}>
                {p.benefits.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--brand-lime)',
                      background: 'rgba(114,191,68,0.12)',
                      border: '1px solid rgba(114,191,68,0.25)',
                      borderRadius: '999px',
                      padding: '4px 11px',
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
            <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '14px', marginBottom: p.hasPage ? '14px' : 0 }}>
                <strong style={{ color: 'var(--brand-lime)', fontWeight: 800 }}>{p.stat}</strong>
                <span style={{ color: 'rgba(255,255,255,0.45)' }}> · {p.statLabel}</span>
              </div>
              {p.hasPage && (
                <Link href={p.href} className="btn btn-white" style={{ padding: '9px 16px', minHeight: 'auto', fontSize: '13px', gap: '6px', whiteSpace: 'nowrap', width: 'fit-content' }}>
                  Explore
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {stage.flow && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          {stage.flow}
        </div>
      )}
    </motion.div>
  );
}

function LifecycleJourney() {
  return (
    <div>
      <div className="lcj-scroll-heading">
        <span className="eyebrow eyebrow-light">Insurance Lifecycle</span>
        <h2 className="sec-title sec-title-light">The complete Payer lifecycle, explored.</h2>
      </div>

      {STAGES.map((s, i) => <StageBlock key={s.id} stage={s} index={i} />)}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function ProductsLandingPage() {
  return (
    <>
      {/* ── Hero — same shape as the Home hero: light band, content column
          + visual on the right, stats band closing the fold. Was a dark
          navy band with a side stats panel, out of step with every other
          page's first fold. ── */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-bg-glow-left" />
        <div className="hero-bg-glow-right" />

        <div className="hero-inner">
          <motion.div
            className="hero-content"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease }}>
              <span className="eyebrow">Vidal Health Solutions Suite</span>
            </motion.div>
            <motion.h1 className="display" variants={fadeUp} transition={{ duration: 0.5, ease }}>
              Technology Solutions<br />
              <span className="hl">for Payers.</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp} transition={{ duration: 0.5, ease, delay: 0.05 }}>
              A connected portfolio of 12 purpose-built products spanning every dimension of insurance operations — pricing, policy administration, claims, fraud detection, network management and member experience. One data layer. Built for Payers.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp} transition={{ duration: 0.45, ease, delay: 0.1 }}>
              <Link href="/contact?intent=demo" className="btn btn-teal btn-lg">
                Book a Platform Demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>
            <motion.p className="pl-hero-trust" variants={fadeUp} transition={{ duration: 0.4, ease, delay: 0.15 }}>
              Trusted by leading Payers like Insurers, TPAs, Government enterprises, across the globe
            </motion.p>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="pl-hero-card">
              <div className="pl-hero-card-head">
                <span className="hero-badge-dot" />
                12 products · one connected platform
              </div>
              <div className="pl-hero-card-grid">
                {STAGES.map((s) => (
                  <div key={s.id} className="pl-hero-card-item">
                    <Icon name={s.products[0]?.icon ?? 'Layers'} size={15} />
                    {s.label}
                  </div>
                ))}
              </div>
              <div className="pl-hero-card-foot">
                {platformStats.slice(0, 3).map((s) => (
                  <div key={s.label} className="pl-hero-card-stat">
                    <span className="pl-hero-card-v">{s.value}</span>
                    <span className="pl-hero-card-l">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-stats-band">
          <div className="hero-stats-row">
            {platformStats.map((s, i) => (
              <div className="hs-cell" key={s.label}>
                {i > 0 && <div className="hs-divider" />}
                <div className="hs-num">{s.value}</div>
                <div className="hs-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance Lifecycle Journey — all stages, laid out in full. ── */}
      <div className="lcj-scroll-band">
        <div className="sec-in" style={{ position: 'relative', zIndex: 1 }}>
          <LifecycleJourney />
        </div>
      </div>

      {/* ── Ecosystem Integration Flow ── */}
      <EcosystemFlow />

      {/* ── CTA Band ── */}
      <div className="cta-band">
        <div style={{ position: 'relative' }}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            Start your transformation
          </span>
          <h2>Not sure where to start?</h2>
          <p>Our solutions team will map your biggest pain points to the right products — and build a business case you can take to leadership.</p>
          <div className="cta-btns">
            <Link className="btn btn-teal btn-lg" href="/contact?intent=demo">Book a Platform Demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
