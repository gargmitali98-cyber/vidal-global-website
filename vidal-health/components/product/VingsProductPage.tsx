'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Shield, Zap, FileText, Network, BarChart3, Smartphone, Brain,
  Clock, DollarSign, Server, CheckCircle2, ArrowRight, ChevronDown,
  Lock, FileCheck, ShieldCheck,
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Two-token palette for this page's data visualisations — teal for
// in-progress/active states, lime for completion — replacing the ~15
// arbitrary per-item hex accents the page used to carry. Kept as raw hex
// (not var()) because several inline styles append a hex alpha suffix
// (e.g. `${TEAL}22`), which only works on literal hex strings.
const TEAL = '#007071';
const TEAL_RGB = '0,112,113';
const LIME = '#4D9A2A';
const LIME_RGB = '77,154,42';

function FadeUp({
  children, delay = 0, style = {}, className,
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.48, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────────────────────

const VINGS_CLAIM_POOL = [
  { id: '#VNG-8821', hospital: 'Apollo Hospital, Mumbai',    type: 'IP Cardiology',    amt: '₹27,900' },
  { id: '#VNG-8834', hospital: 'Narayana Health, Bengaluru', type: 'Emergency Surgery', amt: '₹78,500' },
  { id: '#VNG-8847', hospital: 'Fortis Hospital, Delhi',     type: 'OP Consultation',   amt: '₹4,200'  },
];

const VINGS_STAGES = [
  { n: '01', label: 'Submission',   phase: 'Claim Submission',         module: 'VINGS Core',          color: TEAL, intel: 'CPT 47600 · ICD K80.2 · ₹30,200 billed\nApollo Hospital, Mumbai — IP Cardiology' },
  { n: '02', label: 'Eligibility',  phase: 'Eligibility Verification',  module: 'Policy Module',       color: TEAL, intel: 'Policy active · IP Cardiology covered\nBenefit balance: ₹4,70,000 available' },
  { n: '03', label: 'Pre-Auth',     phase: 'Pre-Authorisation',         module: 'Clinical Rules',      color: TEAL, intel: 'Cardiology IP protocol matched → Approved\nMedical necessity confirmed · 1.8 min' },
  { n: '04', label: 'Doc Intake',   phase: 'Document Intake',           module: 'ENIGMA',              color: TEAL, intel: '3 documents received: summary, bills, Rx\nENIGMA pipeline queued · 0 manual steps' },
  { n: '05', label: 'AI Process',   phase: 'ENIGMA AI Processing',      module: 'ENIGMA AI',           color: TEAL, intel: 'Scan complete: ICD K80.2 · CPT 47600\n7.5M rules applied · Non-payable: ₹2,300' },
  { n: '06', label: 'FWA Screen',   phase: 'Fraud Screening',           module: 'ClaimShield AI',      color: TEAL, intel: 'ClaimShield AI: Risk 8/100 · Low\n10K+ indicators clear · Provider: Clean' },
  { n: '07', label: 'Adjudication', phase: 'Claims Adjudication',       module: 'Claims Intelligence', color: TEAL, intel: 'AI adjudication: 0.9s · Payable: ₹27,900\nRoom capping applied · Audit trail ready' },
  { n: '08', label: 'Appeals',      phase: 'Appeals Workflow',          module: 'Claims Module',       color: TEAL, intel: 'No appeal lodged · Auto-closed in 0s\nSLA: 0 days elapsed · Full audit trail' },
  { n: '09', label: 'Payment',      phase: 'Payment Processing',        module: 'Provider Network',    color: TEAL, intel: 'NEFT instruction generated: ₹27,900\nApollo IFSC verified · T+0 settlement' },
  { n: '10', label: 'Settlement',   phase: 'Settlement Complete',        module: 'VINGS Core',          color: LIME, intel: 'Settlement confirmed · Member notified\nEnd-to-end: 4.2 hrs · Reconciliation done' },
];

const VINGS_JOURNEY_FRAMES = 14;

function HeroVisual() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => f + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const claimIdx    = Math.floor(frame / VINGS_JOURNEY_FRAMES) % VINGS_CLAIM_POOL.length;
  const fi          = frame % VINGS_JOURNEY_FRAMES;
  const activeStage = Math.min(fi, 9);
  const showOutcome = fi >= 10;
  const claim       = VINGS_CLAIM_POOL[claimIdx];
  const stage       = VINGS_STAGES[activeStage];

  const row1    = VINGS_STAGES.slice(0, 5);
  const row2    = VINGS_STAGES.slice(5, 10);
  const row1Pct = Math.min(activeStage, 4) / 4 * 100;
  const row2Pct = activeStage >= 5 ? (activeStage - 5) / 4 * 100 : 0;

  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Chrome */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['#FF5F57', '#FEBC2E', '#28C840'] as const).map(c => (
              <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'rgba(255,255,255,0.58)', letterSpacing: '0.05em' }}>VINGS — End-to-End Claims Lifecycle</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 8px', borderRadius: '999px' }}>
          <div className="live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={claimIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

          {/* Claim header */}
          <div style={{ padding: '10px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Claim {claim.id}</div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.48)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{claim.hospital} · {claim.type}</div>
            </div>
            <AnimatePresence mode="wait">
              {!showOutcome ? (
                <motion.div key={`step-${activeStage}`}
                  initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.18 }} style={{ textAlign: 'right', flexShrink: 0 }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, color: stage.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Step {stage.n} / 10</div>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'rgba(255,255,255,0.58)', marginTop: '1px' }}>{stage.phase}</div>
                </motion.div>
              ) : (
                <motion.div key="outcome-badge"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontSize: '12.5px', fontWeight: 700, background: `rgba(${LIME_RGB},0.14)`, color: LIME, border: `1px solid rgba(${LIME_RGB},0.25)`, borderRadius: '999px', padding: '3px 9px', flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  LIFECYCLE COMPLETE
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pipeline — 2 rows of 5 */}
          <div style={{ padding: '6px 16px 4px' }}>
            {/* Row 1: stages 01–05 */}
            <div style={{ position: 'relative', marginBottom: '2px' }}>
              <div style={{ position: 'absolute', top: '11px', left: '20px', right: '20px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px' }} />
              <motion.div
                style={{ position: 'absolute', top: '11px', left: '20px', height: '2px', background: `linear-gradient(90deg, rgba(${TEAL_RGB},0.5), ${TEAL})`, borderRadius: '1px', originX: 0 }}
                animate={{ width: `${row1Pct}%` }} transition={{ duration: 0.55, ease }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {row1.map((s, i) => {
                  const done = i < activeStage; const active = i === activeStage;
                  return (
                    <div key={s.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1 }}>
                      <motion.div
                        animate={{ background: (done || active) ? s.color : 'rgba(255,255,255,0.06)', boxShadow: active ? `0 0 0 4px ${s.color}22` : 'none' }}
                        transition={{ duration: 0.28 }}
                        style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1.5px solid ${(done || active) ? s.color : 'rgba(255,255,255,0.09)'}`, flexShrink: 0, zIndex: 1 }}
                      >
                        {done && <span style={{ fontSize: '11.5px', color: 'white', lineHeight: '1' }}>✓</span>}
                        {active && <motion.div animate={{ scale: [0.6, 1.1, 0.6] }} transition={{ duration: 1.0, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white' }} />}
                        {!done && !active && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />}
                      </motion.div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: (done || active) ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.2, maxWidth: '58px', wordBreak: 'break-word' }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row connector */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '9px', margin: '1px 0' }}>
              <div style={{ width: '2px', height: '10px', background: activeStage >= 4 ? `rgba(${TEAL_RGB},0.45)` : 'rgba(255,255,255,0.05)', borderRadius: '1px', transition: 'background 0.4s' }} />
            </div>

            {/* Row 2: stages 06–10 */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '11px', left: '20px', right: '20px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px' }} />
              <motion.div
                style={{ position: 'absolute', top: '11px', left: '20px', height: '2px', background: `linear-gradient(90deg, ${TEAL}, ${LIME})`, borderRadius: '1px', originX: 0 }}
                animate={{ width: `${row2Pct}%` }} transition={{ duration: 0.55, ease }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {row2.map((s, i) => {
                  const gi = i + 5; const done = gi < activeStage; const active = gi === activeStage;
                  return (
                    <div key={s.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1 }}>
                      <motion.div
                        animate={{ background: (done || active) ? s.color : 'rgba(255,255,255,0.06)', boxShadow: active ? `0 0 0 4px ${s.color}22` : 'none' }}
                        transition={{ duration: 0.28 }}
                        style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1.5px solid ${(done || active) ? s.color : 'rgba(255,255,255,0.09)'}`, flexShrink: 0, zIndex: 1 }}
                      >
                        {done && <span style={{ fontSize: '11.5px', color: 'white', lineHeight: '1' }}>✓</span>}
                        {active && <motion.div animate={{ scale: [0.6, 1.1, 0.6] }} transition={{ duration: 1.0, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white' }} />}
                        {!done && !active && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />}
                      </motion.div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: (done || active) ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.2, maxWidth: '58px', wordBreak: 'break-word' }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active stage intelligence */}
          <div style={{ padding: '8px 16px 6px', minHeight: '82px' }}>
            <AnimatePresence mode="wait">
              {!showOutcome ? (
                <motion.div key={`intel-${activeStage}`}
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.22 }}
                  style={{ background: `${stage.color}0A`, border: `1px solid ${stage.color}22`, borderLeft: `2.5px solid ${stage.color}`, borderRadius: '10px', padding: '10px 13px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-lime)' }}>{stage.phase}</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, background: `${stage.color}18`, color: 'var(--brand-lime)', border: `1px solid ${stage.color}28`, borderRadius: '999px', padding: '1.5px 6px', flexShrink: 0 }}>{stage.module}</div>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.58 }}>
                    {stage.intel.split('\n').map((line, li) => <div key={li}>{line}</div>)}
                  </div>
                  {activeStage < 9 && (
                    <div style={{ display: 'flex', gap: '3px', marginTop: '7px' }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: stage.color }}
                          animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.22 }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="outcome"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ background: `rgba(${LIME_RGB},0.08)`, border: `1px solid rgba(${LIME_RGB},0.22)`, borderRadius: '10px', padding: '12px 14px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: LIME, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Lifecycle Complete</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, background: `rgba(${LIME_RGB},0.15)`, color: LIME, border: `1px solid rgba(${LIME_RGB},0.28)`, borderRadius: '999px', padding: '2px 8px' }}>SETTLED</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                    {[
                      { l: 'Settlement',     v: claim.amt, color: LIME },
                      { l: 'End-to-end',     v: '4.2 hrs',  color: TEAL },
                      { l: 'Manual touches', v: '0',        color: TEAL },
                    ].map(m => (
                      <div key={m.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '7px', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>{m.v}</div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.42)', marginTop: '2px', lineHeight: 1.2 }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar + claim dots */}
          <div style={{ padding: '4px 16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: `linear-gradient(90deg, ${TEAL}, ${LIME})`, borderRadius: '2px', originX: 0 }}
                  animate={{ width: showOutcome ? '100%' : `${(activeStage / 9) * 100}%` }}
                  transition={{ duration: 0.5, ease }}
                />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
                {showOutcome ? '10 / 10' : `${activeStage + 1} / 10`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {VINGS_CLAIM_POOL.map((_, i) => (
                <div key={i} style={{ flex: 1, height: '2px', borderRadius: '1px', background: i === claimIdx ? TEAL : 'rgba(255,255,255,0.07)', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function VingsHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner" style={{ '--hero-col-l': '500px', '--hero-col-r': '560px' } as React.CSSProperties}>
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">Core Claims Operations Engine</span>,
            <h1 key="h1" className="display">
              The engine behind<br />every <span className="hl">claim.</span>
            </h1>,
            <p key="p" className="hero-sub">
              VINGS runs the entire policy and claim lifecycle for Payers — Member Enrolment, Empanelment, Product & Policy configuration, Pre-Authorisation, Claim Processing, Financial Operations, and Re-Insurance, all in one connected system.
            </p>,
            <div key="btns" className="hero-actions">
              <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>Book a Demo <ArrowRight size={14} /></Link>
            </div>,
          ].map((el, i) => (
            <motion.div key={i} variants={{ h: { opacity: 0, y: 14 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.44, ease }}>
              {el}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-visual" style={{ maxWidth: '560px' }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>
          <HeroVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '150M+', l: 'Lives on platform' },
            { v: 'Automated', l: 'Adjudication engine' },
            { v: '99.9%', l: 'Uptime SLA' },
            { v: '20+', l: 'Years domain depth' },
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

// ─── 2. CHALLENGE ───────────────────────────────────────────────────────────

const problems = [
  { Icon: Server,     stat: 'Fragmented', label: 'Infrastructure',    title: 'Fragmented Infrastructure',  desc: 'Policy, claims, network, fraud, and billing run on separate legacy systems with no shared data layer.' },
  { Icon: Zap,        stat: 'Slow',       label: 'Adjudication',      title: 'Manual, Slow Processing',    desc: 'Manual data entry slows every decision. Members wait days for approvals that should be instant.' },
  { Icon: DollarSign, stat: 'Rising',     label: 'Fraud exposure',    title: 'Unchecked Fraud Leakage',    desc: 'Static rule engines miss dynamic fraud patterns. Organised schemes evolve faster than legacy systems respond.' },
  { Icon: Clock,      stat: 'Manual',     label: 'Network operations', title: 'Provider Network Friction', desc: 'Credentialing driven by email and spreadsheet. No real-time network visibility or contract lifecycle management.' },
];

function IndustryProblems() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">The Challenge</span>
              <h2 className="sec-title" style={{ margin: 0 }}>Why insurers are<br />losing ground.</h2>
            </div>
            <p className="sec-sub" style={{ maxWidth: '380px', margin: 0 }}>
              Legacy infrastructure isn't just slow — it compounds into billions in fraud, operational failure, and member attrition every year.
            </p>
          </div>
        </FadeUp>

        <div className="prob-grid prob-grid--2">
          {problems.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.07}>
              <div className="prob-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <span className="prob-icon" style={{ marginBottom: 0 }}><p.Icon size={18} /></span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--teal)',
                      background: 'var(--teal-soft)',
                      border: '1px solid rgba(0,112,113,0.18)',
                      borderRadius: '999px',
                      padding: '4px 11px',
                    }}
                  >
                    {p.stat}
                  </span>
                </div>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--subtle)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>{p.label}</div>
                <div className="prob-title">{p.title}</div>
                <p className="prob-sub">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. SOLUTION — consolidated module list (was: bus diagram + 7-col grid + radial hub) ──

const coreModules = [
  {
    id: 'claims', label: 'Claims',    Icon: Zap,        metric: 'Automated',   mLabel: 'End-to-end claims',
    desc: 'End-to-end claims administration — pre-authorisation, adjudication, appeals, and payment — automated on the VINGS shared data layer.',
    features: ['Pre-auth automation', 'AI-powered adjudication', 'Appeals & review workflow', 'Automated settlement', 'Full audit trail', 'Real-time member notifications'],
    href: '/products/claims-intelligence',
  },
  {
    id: 'fwa', label: 'FWA',          Icon: Shield,     metric: '10K+',        mLabel: 'Clinical fraud rules',
    desc: 'Clinical AI + 10,000+ cognitive rules detect fraud, waste, and abuse before payment — across every claim, every provider, in real time.',
    features: ['Pre-payment fraud scoring', '10,000+ clinical rules', 'Provider profiling', 'Organised scheme detection', 'Cognitive AI models', 'SIU workflow management'],
    href: '/products/fraud-waste-abuse',
  },
  {
    id: 'provider', label: 'Provider', Icon: Network,    metric: 'E2E',         mLabel: 'Provider lifecycle',
    desc: 'Provider empanelment, credentialing, contract lifecycle, and performance management — fully automated across the network.',
    features: ['Automated credentialing', 'Contract management', 'Network adequacy tracking', 'Performance scoring', 'Pan-India partner network', 'Real-time visibility'],
    href: '/products/provider-network',
  },
  {
    id: 'enigma', label: 'ENIGMA',    Icon: Brain,      metric: 'Any format',  mLabel: 'Document extraction',
    desc: 'AI document intelligence that extracts structured data from any format — handwritten forms, PDFs, images — feeding directly into FWA and Claims.',
    features: ['Universal document extraction', 'Multi-language support', 'Handwriting recognition', 'Real-time FWA integration', 'Zero manual keying', 'Structured output API'],
    href: '/products/enigma',
  },
  {
    id: 'policy', label: 'Policy',    Icon: FileText,   metric: 'Flexible',    mLabel: 'Policy configuration',
    desc: 'Build, issue, and manage any policy type — individual, group, or government — with full automation from product config to document generation.',
    features: ['Flexible product builder', 'Automated renewals', 'Endorsement management', 'Benefit configuration', 'Document generation', 'Premium management'],
    href: '/products/vings',
  },
  {
    id: 'member', label: 'Member',    Icon: Smartphone, metric: 'White-label', mLabel: 'Member experience',
    desc: 'White-label member portal and mobile app — claims filing, provider search, benefits view, and real-time status — built on the VINGS data layer.',
    features: ['Digital claims filing', 'Provider search & discovery', 'Policy & benefits view', 'Real-time claim status', 'Push notifications', 'Teleconsultation booking'],
    href: '/products/mobile-app',
  },
  {
    id: 'analytics', label: 'Analytics', Icon: BarChart3, metric: 'Live',      mLabel: 'Unified dashboards',
    desc: 'Cross-module intelligence: loss ratio, fraud trend analysis, utilisation, actuarial modelling — all refreshed live from the VINGS data bus.',
    features: ['Loss ratio analytics', 'Fraud trend reporting', 'Utilisation analysis', 'Predictive modelling', 'Actuarial dashboards', 'Regulatory reporting'],
    href: '/products/vings',
  },
];

function PlatformSolution() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">VINGS Platform</span>
          <h2 className="sec-title" style={{ maxWidth: '620px', margin: '0 auto 12px' }}>One platform. Every insurance workflow.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            VINGS is the shared intelligence layer that unifies claims, fraud detection, provider networks, and member experience — eliminating the fragmented stack.
          </p>
        </FadeUp>

        <div className="why-grid">
          {coreModules.map((m, i) => {
            const isOpen = expanded === m.id;
            return (
              <FadeUp key={m.id} delay={i * 0.05}>
                <div
                  className="why-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <div className="why-icon"><m.Icon size={22} /></div>
                  <h3>{m.label}</h3>
                  <p>{m.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--teal)', letterSpacing: '-0.01em' }}>{m.metric}</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>· {m.mLabel}</span>
                    <ChevronDown size={15} style={{ marginLeft: 'auto', color: 'var(--subtle)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'grid', gap: '9px' }}>
                          {m.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                              <CheckCircle2 size={14} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                              {f}
                            </div>
                          ))}
                        </div>
                        <Link
                          href={m.href}
                          className="prob-arrow"
                          onClick={e => e.stopPropagation()}
                        >
                          Explore {m.label} <ArrowRight size={13} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. WORKFLOW — all stages visible at once (was: click-through pipeline) ──

const stages = [
  {
    n: '01', phase: 'Pre-Auth', title: 'Pre-Authorisation',
    modules: ['Claims', 'Clinical Rules'],
    inputs: 'Treatment request from provider or member',
    process: 'Clinical guidelines applied in real time. Standard procedures auto-approved. Complex cases reviewed with supporting clinical rationale.',
    outputs: 'Fast approval or denial. Provider notified instantly.',
    metric: 'Rapid', mLabel: 'Decision speed',
  },
  {
    n: '02', phase: 'Screen', title: 'Fraud & Document Check',
    modules: ['FWA', 'ENIGMA'],
    inputs: 'Claim submission with supporting documents',
    process: 'ENIGMA extracts structured data. FWA scores against 10,000+ indicators. Suspicious patterns isolated before adjudication begins.',
    outputs: 'Clean claim proceeds. Flagged claims routed to SIU.',
    metric: '10K+', mLabel: 'Clinical fraud rules',
  },
  {
    n: '03', phase: 'Adjudicate', title: 'Claims Adjudication',
    modules: ['Claims Intelligence'],
    inputs: 'Screened claim with FWA score, documents, policy terms',
    process: 'Claims auto-adjudicated by AI with support for ICD 9/10 AM/CM codes, CPT, CDT, and Drug codes. Complex cases pre-loaded with full context — clinical history, provider profile, FWA score — for specialist review.',
    outputs: 'Fast decision for auto cases. Full audit trail generated.',
    metric: 'AI-powered', mLabel: 'Claims adjudication',
  },
  {
    n: '04', phase: 'Appeals', title: 'Appeals & Review',
    modules: ['Claims', 'Policy'],
    inputs: 'Denied claim and member or provider dispute',
    process: 'Structured appeals workflows triggered automatically. Policy terms cross-referenced. Reviewers receive full decision history — no context rebuilding required.',
    outputs: 'Resolved appeal with documented rationale.',
    metric: 'Structured', mLabel: 'Appeals workflow',
  },
  {
    n: '05', phase: 'Pay', title: 'Settlement & Payment',
    modules: ['Claims', 'Provider Network'],
    inputs: 'Approved claim and provider payment instructions',
    process: 'Automated payment trigger on approval. Reconciliation runs without intervention. Audit trail auto-generated. Member notified in real time.',
    outputs: 'Same-day settlement. Full reconciliation records.',
    metric: 'Same day', mLabel: 'Settlement speed',
  },
  {
    n: '06', phase: 'Optimise', title: 'Analytics & Learning',
    modules: ['Analytics Hub'],
    inputs: 'All events from every prior stage',
    process: 'Unified analytics surface loss ratio, fraud trends, and utilisation. AI models retrained on live data. Actuary dashboards auto-refreshed without manual extracts.',
    outputs: 'Operational intelligence. Model improvement. Regulatory reports.',
    metric: 'Live', mLabel: 'Data freshness',
  },
];

function WorkflowOrchestration() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">Workflow Orchestration</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>From first request<br />to final payment.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            Six orchestrated stages. Every handoff automated. Every decision tracked.
          </p>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="rail-list" style={{ maxWidth: '760px' }}>
            {stages.map((s, i) => (
              <motion.div
                className="rail-item"
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="rail-dot" />
                <div className="rail-year">{s.phase}</div>
                <div className="rail-title">{s.title}</div>
                <p className="rail-desc">{s.process}</p>

                <div style={{ display: 'grid', gap: '5px', marginTop: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                  <div><span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>Input — </span>{s.inputs}</div>
                  <div><span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>Output — </span>{s.outputs}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                  {s.modules.map(m => (
                    <span key={m} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-lime)', background: 'rgba(114,191,68,0.12)', border: '1px solid rgba(114,191,68,0.25)', borderRadius: '999px', padding: '3px 10px' }}>{m}</span>
                  ))}
                  <span style={{ marginLeft: 'auto', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    <strong style={{ color: 'var(--brand-lime)', fontWeight: 800 }}>{s.metric}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}> · {s.mLabel}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. FINAL CTA ─────────────────────────────────────────────────────────
// (Was preceded by a standalone "Why It Works" section — three vague
// word-value pairs with no real numbers, immediately followed by this same
// band's own proper 5-stat strip. Dropped as redundant filler rather than
// restyled; the substantive numbers already live in the strip below.)

function FinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {[
              { v: '150M+',        l: 'Lives'      },
              { v: 'Pan-Asia',     l: 'Operations' },
              { v: 'Enterprise',   l: 'Scale'      },
              { v: 'Multi-market', l: 'Reach'      },
              { v: '20+',          l: 'Years'      },
            ].map(s => (
              <div key={s.l} className="stat-strip-cell" style={{ textAlign: 'center' }}>
                <div className="stat-strip-v">{s.v}</div>
                <div className="stat-strip-l">{s.l}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      <FadeUp>
        <h2>See VINGS running your insurance operations.</h2>
        <p>
          Our solutions team will walk you through a demo built around your exact workflows, volumes, rules, regulatory environment, and scale. No generic slides.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Book a Personalised Demo <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No commitment required', 'Tailored to your workflow', 'Response within 24 hours'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              <CheckCircle2 size={11} style={{ color: 'var(--brand-lime)' }} />
              {t}
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

// ─── INLINE CTA BANNER ──────────────────────────────────────────────────────

function InlineCTA({ headline, sub, cta, href = '/contact?intent=demo' }: { headline: string; sub: string; cta: string; href?: string }) {
  return (
    <div style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
      <div className="sec-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '3px', height: '36px', borderRadius: '2px', background: 'var(--teal)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{headline}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>{sub}</div>
          </div>
        </div>
        <Link href={href} className="btn btn-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0, padding: '9px 18px', fontSize: '13px' }}>
          {cta} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function VingsProductPage() {
  return (
    <main className="page">
      <VingsHero />
      <IndustryProblems />
      <PlatformSolution />
      <InlineCTA
        headline="Ready to see these modules in action?"
        sub="A 30-minute demo tailored to your workflows — we walk through the modules most relevant to you."
        cta="Book a Demo"
      />
      <WorkflowOrchestration />
      <FinalCTA />
    </main>
  );
}
