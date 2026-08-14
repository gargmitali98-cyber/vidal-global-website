'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Content ────────────────────────────────────────────────────────────

const SOLUTION_AREAS = [
  {
    icon: 'Zap',
    title: 'Claims Operations',
    description: 'Automate adjudication end to end — straight-through processing for clean claims, exceptions routed for review.',
    href: '/products/vings',
  },
  {
    icon: 'ShieldCheck',
    title: 'Fraud, Waste & Abuse',
    description: 'Intercept fraud before payment using clinical rules and document forgery detection, not after-the-fact recovery.',
    href: '/products/fraud-waste-abuse',
  },
  {
    icon: 'TrendingUp',
    title: 'Underwriting & Pricing',
    description: 'Price risk accurately with automated intake and real-time loss ratio modelling built for sustainable growth.',
    href: '/products/priceiq',
  },
  {
    icon: 'Network',
    title: 'Provider Network',
    description: 'Pan-India cashless access across a wide hospital network, with real-time pre-authorisation and cost advantage.',
    href: '/products/india-network-access',
  },
  {
    icon: 'Smartphone',
    title: 'Member Wellness',
    description: 'Move from reactive payer to health partner with a white-label app that drives engagement and lowers IP costs.',
    href: '/products/wellsure',
  },
];

const LIFECYCLE = [
  { tag: 'VINGS', title: 'Enrolment', desc: 'Members and policies onboarded with automated eligibility checks and product configuration.' },
  { tag: 'PriceIQ', title: 'Underwriting', desc: 'Risk priced and quoted in real time, using data-driven models rather than static tables.' },
  { tag: 'India Network', title: 'Provider Access', desc: 'A pan-India cashless network with real-time pre-authorisation for planned and emergency care.' },
  { tag: 'VINGS · ENIGMA', title: 'Claims', desc: 'Claims adjudicated end to end, with handwritten and printed documents digitised automatically.' },
  { tag: 'ClaimShield', title: 'Fraud Detection', desc: 'Fraud and abuse intercepted before payment is released, not recovered after the fact.' },
  { tag: 'WellSure', title: 'Wellness', desc: 'Members engaged proactively through a white-label wellness experience, not just a claims app.' },
  { tag: 'VINGS · PriceIQ', title: 'Insights', desc: 'Every stage feeds the same data fabric — one connected view across the full lifecycle.' },
];

const AUDIENCES = [
  { icon: 'Building2', title: 'Health Insurers', description: 'Automate claims, reduce loss ratios, and embed AI-native fraud defence into existing workflows.' },
  { icon: 'Briefcase', title: 'TPAs', description: 'Scale operations without adding headcount — replace legacy systems with AI-native workflows.' },
  { icon: 'Users', title: 'Self-Funded Employers', description: 'Full visibility into benefit spend, with tools that drive preventive member engagement.' },
  { icon: 'Globe', title: 'Government', description: 'Administer health benefits to citizens at low cost and maximum operational efficiency.' },
  { icon: 'Stethoscope', title: 'Healthcare Networks', description: 'Real-time pre-authorisation, automated tariff validation, and faster settlement.' },
];

// ─── Sections ───────────────────────────────────────────────────────────

function SolHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="eyebrow">Solutions</span>
          <h1 className="display">
            Built for every health <span className="hl">insurance challenge.</span>
          </h1>
          <p className="hero-sub">
            AI-powered technology for payers — insurers, TPAs, and employers — across the complete health insurance lifecycle.
          </p>
          <div className="hero-actions">
            <Link href="/contact?intent=demo" className="btn btn-teal btn-lg">
              Book a Demo
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link href="/products" className="btn btn-outline btn-lg">
              Explore Products
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
        >
          <div className="pl-hero-card">
            <div className="pl-hero-card-head">
              <span className="hero-badge-dot" />
              5 solution areas · one platform
            </div>
            <div className="pl-hero-card-grid">
              {SOLUTION_AREAS.map((a) => (
                <div key={a.title} className="pl-hero-card-item">
                  <Icon name={a.icon} size={15} />
                  {a.title}
                </div>
              ))}
            </div>
            <div className="pl-hero-card-foot">
              <div className="pl-hero-card-stat">
                <span className="pl-hero-card-v">150M+</span>
                <span className="pl-hero-card-l">Lives Covered</span>
              </div>
              <div className="pl-hero-card-stat">
                <span className="pl-hero-card-v">98%</span>
                <span className="pl-hero-card-l">Auto-adjudication</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '150M+', l: 'Lives Covered' },
            { v: '98%', l: 'Auto-adjudication' },
            { v: '7.5M+', l: 'Clinical rules' },
            { v: '99.9%', l: 'Uptime SLA' },
          ].map((s, i) => (
            <div className="hs-cell" key={s.l}>
              {i > 0 && <div className="hs-divider" />}
              <div className="hs-num">{s.v}</div>
              <div className="hs-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionAreas() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Solution Areas</span>
          <h2 className="sec-title">How we solve your challenges</h2>
          <p className="sec-sub">
            Five problem areas, one connected platform underneath each.
          </p>
        </motion.div>

        <div className="prob-grid">
          {SOLUTION_AREAS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
            >
              <Link href={item.href} className="prob-card">
                <span className="prob-icon"><Icon name={item.icon} size={18} /></span>
                <div className="prob-title">{item.title}</div>
                <div className="prob-sub">{item.description}</div>
                <span className="prob-arrow">Explore →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lifecycle() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow eyebrow-light">End-to-End Coverage</span>
          <h2 className="sec-title sec-title-light">The complete insurance lifecycle, one platform</h2>
          <p className="sec-sub sec-sub-light">
            Every stage shares the same data fabric — intelligence flows across the lifecycle, not just within it.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="rail-list">
            {LIFECYCLE.map((stage, i) => (
              <motion.div
                className="rail-item"
                key={stage.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
              >
                <span className="rail-dot" />
                <div className="rail-year">{stage.tag}</div>
                <div className="rail-title">{stage.title}</div>
                <p className="rail-desc">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Who We Serve</span>
          <h2 className="sec-title">Built for every stakeholder</h2>
        </motion.div>

        <div className="why-grid">
          {AUDIENCES.map((a, i) => (
            <motion.div
              key={a.title}
              className="why-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <div className="why-icon"><Icon name={a.icon} size={22} /></div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolCTA() {
  return (
    <section className="cta-band">
      <h2>Ready to transform your operations?</h2>
      <p>Schedule a focused demo with our solutions team.</p>
      <div className="cta-btns">
        <Link href="/contact?intent=demo" className="btn btn-teal btn-lg">
          Book a Demo
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <SolHero />
      <SolutionAreas />
      <Lifecycle />
      <WhoWeServe />
      <SolCTA />
    </>
  );
}
