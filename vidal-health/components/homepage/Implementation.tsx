'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  {
    num: '01',
    phase: 'Discover',
    duration: 'Week 1–2',
    title: 'Map your operations',
    desc: 'We map your workflows, clinical rules, policy logic and regulatory environment — then configure the platform around your operations, not the other way around.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    phase: 'Integrate',
    duration: 'Week 2–6',
    title: "Connect, don't replace",
    desc: 'API-first architecture and pre-built connectors integrate our solutions with your existing claims, TPA, and hospital systems. No infrastructure replacement. No data migration risk.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="6" height="10" rx="1"/><rect x="16" y="7" width="6" height="10" rx="1"/>
        <line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="9" x2="16" y2="12"/><line x1="12" y1="15" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    num: '03',
    phase: 'Validate',
    duration: 'Week 4–8',
    title: 'Test with your real data',
    desc: 'Joint POC using your actual claims, documents and operational data — with a parallel run against your current system until both sides are confident.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    num: '04',
    phase: 'Go Live',
    duration: 'Week 8+',
    title: 'Live — then keep scaling',
    desc: 'Go live with dedicated operational support. Add modules at your own pace as the business grows and new operational needs emerge.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

const trustPillars = [
  {
    label: 'Enterprise Security',
    detail: 'ISO 27001 · SOC 2 · End-to-end encryption',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    label: '99.9% Uptime SLA',
    detail: 'Cloud-native · Multi-region · Auto-scaling',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Data Sovereignty',
    detail: 'On premises or hosted on local cloud instance',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"/><path d="M2 12v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6"/>
      </svg>
    ),
  },
];

export default function Implementation() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="impl-section">
      <div className="sec-in">

        <motion.div
          className="impl-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="impl-header-left">
            <span className="eyebrow impl-eyebrow">Implementation</span>
            <h2 className="sec-title impl-title">Live in weeks.<br />Not after a two-year project.</h2>
          </div>
          <div className="impl-header-right">
            <p className="impl-header-sub">
              API-first and modular. Connect the capability you need now — without
              displacing your current systems. Expand the suite on your own timeline.
            </p>
            <Link href="/contact" className="btn btn-ghost-teal">
              See a live walkthrough
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </motion.div>

        <div className="impl-steps">
          {steps.map((s, i) => {
            return (
              <motion.div
                key={s.num}
                className="impl-step-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.09 }}
              >
                <div
                  className="impl-step"
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className="impl-step-card">
                    <div className="impl-step-meta">
                      <span className="impl-num">{s.num}</span>
                      <span className="impl-phase">{s.phase}</span>
                    </div>

                    {/* Node sits on the rail; the icon lives inside it. */}
                    <div className="impl-node" aria-hidden="true">
                      <span className="impl-node-icon">{s.icon}</span>
                    </div>

                    <div className="impl-step-title">{s.title}</div>
                    <span className="impl-duration">{s.duration}</span>
                    <p className="impl-step-desc">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="impl-trust"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
        >
          <span className="impl-trust-label">Enterprise-grade by default</span>
          <div className="impl-trust-pillars">
            {trustPillars.map(p => (
              <div key={p.label} className="impl-trust-pillar">
                <span className="impl-trust-icon">{p.icon}</span>
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
