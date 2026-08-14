'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Content ────────────────────────────────────────────────────────────

const MILESTONES = [
  { year: '2002', title: 'Founded', desc: 'TPA incorporated — one of the first in India, managing health insurance for leading insurers.' },
  { year: '2006–07', title: 'Investment', desc: 'Swiss Re joins as shareholder, validating the model and accelerating growth.' },
  { year: '2010', title: 'Government Scale', desc: 'Started servicing government health schemes, dramatically expanding lives under management.' },
  { year: '2013', title: 'Independence', desc: 'TTK group exits — Vidal becomes a 100% independent subsidiary, sharpening technology focus.' },
  { year: '2016–17', title: 'International', desc: 'Expands internationally, acquiring Globalnet TPA to establish Gulf operations.' },
  { year: '2021–22', title: 'Consolidation', desc: 'Acquires Vipul TPA, solidifying market share and operational scale across India.' },
  { year: '2024', title: 'Bajaj Era', desc: 'Acquired by Bajaj Finserv Ltd — the start of the next chapter as an AI-native platform.' },
];

const STRENGTHS = [
  { icon: 'Cpu', title: 'Domain-native AI', description: 'Clinical NLP, document AI, and cognitive rules built specifically for health insurance — not generic ML adapted to the domain.' },
  { icon: 'Layers', title: 'Modular architecture', description: 'Deploy a single capability or the full suite. Every module integrates via API with your existing stack.' },
  { icon: 'ShieldCheck', title: 'Regulatory fluency', description: 'Workflows designed to align with regional health insurance regulation — embedded by design, not retrofitted.' },
  { icon: 'Zap', title: 'Enterprise scalability', description: '150M+ lives under management. Sub-second claim decisions. 99.9% uptime SLA across production.' },
  { icon: 'Users', title: 'Practitioner-built', description: '400+ clinical doctors and 500+ technology specialists run actual insurance operations, not just software.' },
  { icon: 'TrendingUp', title: 'Outcome-driven', description: 'Every feature is benchmarked against measurable outcomes: loss ratio, STP rate, fraud interception, cost.' },
];

const REGIONS = [
  { icon: 'Building2', region: 'India', hq: true, detail: 'Headquarters · Bangalore' },
  { icon: 'Globe', region: 'UAE', hq: false, detail: 'Dubai Office' },
  { icon: 'MapPin', region: 'Qatar', hq: false, detail: 'Doha Office' },
  { icon: 'Network', region: 'Oman', hq: false, detail: 'Muscat Office' },
];

const TRUST_PILLARS = [
  { icon: 'Lock', label: 'ISO 27001', detail: 'Information security management' },
  { icon: 'FileCheck', label: 'SOC 2', detail: 'AICPA — security & privacy' },
  { icon: 'ShieldCheck', label: 'ISO 9001', detail: 'Quality management' },
  { icon: 'Clock', label: '99.9% Uptime', detail: 'Production SLA' },
];

// ─── Sections ───────────────────────────────────────────────────────────

function AboutHero() {
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
          <span className="eyebrow">Who We Are</span>
          <h1 className="display">
            Two decades of health insurance expertise, <span className="hl">engineered into technology.</span>
          </h1>
          <p className="hero-sub">
            AI-enabled technology for payers globally — built by practitioners who have spent 20+ years at the intersection of clinical, operational, and regulatory complexity.
          </p>
          <div className="hero-actions">
            <Link href="/contact?intent=demo" className="btn btn-teal btn-lg">
              Book a Demo
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link href="/solutions" className="btn btn-outline btn-lg">
              Explore Solutions
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
              Operating across global markets
            </div>
            <div className="pl-hero-card-grid" style={{ gridTemplateColumns: '1fr' }}>
              {REGIONS.map((r) => (
                <div key={r.region} className="pl-hero-card-item">
                  <Icon name={r.icon} size={15} />
                  {r.region}{r.hq ? ' · HQ' : ''} — {r.detail}
                </div>
              ))}
            </div>
            <div className="pl-hero-card-foot">
              <div className="pl-hero-card-stat">
                <span className="pl-hero-card-v">20+</span>
                <span className="pl-hero-card-l">Years</span>
              </div>
              <div className="pl-hero-card-stat">
                <span className="pl-hero-card-v">150M+</span>
                <span className="pl-hero-card-l">Lives</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '20+', l: 'Years of experience' },
            { v: '150M+', l: 'Lives managed' },
            { v: '400+', l: 'Clinical doctors' },
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

function OurStory() {
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
          <span className="eyebrow eyebrow-light">Our Story</span>
          <h2 className="sec-title sec-title-light">Two decades of continuous evolution</h2>
          <p className="sec-sub sec-sub-light">
            From one of India's first TPAs to an AI-native health insurance technology platform.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="rail-list">
            {MILESTONES.map((m, i) => (
              <motion.div
                className="rail-item"
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="rail-dot" />
                <div className="rail-year">{m.year} · {m.title}</div>
                <p className="rail-desc">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="impl-trust"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
        >
          <span className="impl-trust-label">Certified &amp; recognised</span>
          <div className="impl-trust-pillars impl-trust-pillars--4">
            {TRUST_PILLARS.map(p => (
              <div key={p.label} className="impl-trust-pillar">
                <span className="impl-trust-icon"><Icon name={p.icon} size={16} /></span>
                <div>
                  <div className="impl-trust-name">{p.label}</div>
                  <div className="impl-trust-detail">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyEnterprises() {
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
          <span className="eyebrow">Why Enterprises Choose Vidal</span>
          <h2 className="sec-title">Built for the complexity of health insurance</h2>
        </motion.div>

        <div className="why-grid">
          {STRENGTHS.map((s, i) => (
            <motion.div
              key={s.title}
              className="why-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <div className="why-icon"><Icon name={s.icon} size={22} /></div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Real regional map artwork (India, UAE, Qatar with pins and reach lines),
   dropped in as-is in place of the previous hand-drawn SVG. */
function RegionMap() {
  return (
    <motion.div
      className="region-map"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      aria-hidden="true"
    >
      <Image
        src="/region-map.png"
        alt=""
        width={1625}
        height={968}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  );
}

function GlobalPresence() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Global Presence</span>
          <h2 className="sec-title">Operating across key insurance markets</h2>
        </motion.div>

        <div className="region-split">
          <RegionMap />

          <div className="region-list">
            {REGIONS.map((r, i) => (
              <motion.div
                className="region-row"
                key={r.region}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <span className="region-icon"><Icon name={r.icon} size={20} /></span>
                <div>
                  <div className="region-name">
                    {r.region}
                    {r.hq && <span className="region-hq">HQ</span>}
                  </div>
                  <div className="region-detail">{r.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="cta-band">
      <h2>Ready to evaluate Vidal for your organisation?</h2>
      <p>Our solutions team will walk you through the platform and how it maps to your operations.</p>
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

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <WhyEnterprises />
      <GlobalPresence />
      <AboutCTA />
    </>
  );
}
