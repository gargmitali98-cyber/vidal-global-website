'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Shield, Brain, Activity, Users, Search,
  Network, CheckCircle2, ArrowRight, Lock,
  AlertTriangle, DollarSign, Clock, BarChart3,
  TrendingDown, Copy, TrendingUp, UserX, FileX,
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// FWA_COLOR was an arbitrary indigo brand pick with no semantic meaning —
// folded into the site's teal. Red/amber/green in the hero visual stay,
// since there they carry genuine risk-level meaning.
const FWA_COLOR = '#007071';

function FadeUp({ children, delay = 0, style = {}, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, ease, delay }}>
      {children}
    </motion.div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const fraudCategories = [
  {
    category: 'Billing Fraud',
    Icon: DollarSign,
    stat: 'Major',
    statLabel: 'annual losses from billing fraud',
    items: [
      { Icon: Copy,          title: 'Duplicate Billing',     desc: 'Same claim submitted multiple times — across payors, periods, or with minor variations to evade detection.' },
      { Icon: TrendingUp,    title: 'Upcoding & Unbundling', desc: 'Procedures billed at inflated codes or artificially split across claims to maximise reimbursement.' },
      { Icon: AlertTriangle, title: 'Payment Leakage',       desc: 'Systematic billing above negotiated rates, tariff manipulation, and duplicate adjudication at scale.' },
    ],
  },
  {
    category: 'Provider Fraud',
    Icon: Users,
    stat: 'Significant',
    statLabel: 'share of claims involve provider fraud',
    items: [
      { Icon: UserX,    title: 'Ghost Providers',            desc: 'Non-existent or inactive facilities billing for services never rendered to real patients.' },
      { Icon: Network,  title: 'Referral Rings & Collusion', desc: 'Coordinated provider networks inflating claims through organised kickbacks and cross-referrals.' },
      { Icon: Activity, title: 'Provider Abuse',             desc: 'Medically unnecessary procedures, inflated stay durations, and surgical over-indication billed systematically.' },
    ],
  },
  {
    category: 'Document & Process',
    Icon: FileX,
    stat: 'Majority',
    statLabel: 'missed by traditional rule engines',
    items: [
      { Icon: FileX,  title: 'Document Manipulation',     desc: 'Forged, altered, or AI-generated medical records and bills submitted to support fraudulent claims.' },
      { Icon: Clock,  title: 'Excessive Utilisation',     desc: 'Medically unjustified investigations, repeat procedures, and unnecessary hospitalisations billed at scale.' },
      { Icon: Search, title: 'Investigation Bottlenecks', desc: 'Manual case-building consumes the majority of investigator time — fraud escapes while teams gather data.' },
    ],
  },
];

// Canonical Solution data — the six protection layers already summarise
// what the two "engines" (rules + cognitive AI) below do, so they become
// the single overview grid rather than repeating the same ground twice.
const protectionLayers = [
  { id: 'rules',    label: 'Clinical Rules Engine',   Icon: Shield,       desc: 'AMA-aligned 7.5M+ rules, ICD/CPT global validation, unbundling and upcoding prevention applied to every claim.' },
  { id: 'ai',       label: 'Cognitive AI Detection',  Icon: Brain,        desc: 'Deep neural networks identify document fraud, forgery, AI-generated content, and emergent billing patterns.' },
  { id: 'syndicate', label: 'Syndicate Analysis',      Icon: Network,      desc: 'Maps provider-policyholder-intermediary nexus to surface referral rings and organised collusion networks.' },
  { id: 'provider', label: 'Provider Risk Profiling',  Icon: Users,        desc: 'Dynamic risk scores built from billing history, fraud indicators, and network connections — applied across every provider in the network.' },
  { id: 'workbench', label: 'Investigation Workbench',  Icon: Search,       desc: 'SIU cases built automatically — AI rationale, evidence, provider profile, and similar historical cases in one view.' },
  { id: 'gate',     label: 'Payment Integrity Gate',   Icon: CheckCircle2, desc: 'The majority of detected fraud blocked before payment release. Full regulatory audit trail auto-generated per decision.' },
];

const detectionStages = [
  {
    n: '01', label: 'Ingestion', title: 'Data Ingestion & Normalisation',
    metric: 'Rapid', mLabel: 'Ingestion time',
    what: 'Every claim enters the ClaimShield AI pipeline — digital submissions, EDI feeds, scanned documents, or manual entries — normalised across hundreds of fields before any analysis begins.',
    how: 'ENIGMA extracts structured data from any format including handwritten forms and images. Zero unscreened claims, full data fidelity from the first step.',
    impact: 'Every claim fully digitised and categorised before reaching the intelligence layers.',
  },
  {
    n: '02', label: 'Rules Validation', title: 'Clinical Rules Engine — 7.5M+ AMA Rules',
    metric: '7.5M+', mLabel: 'AMA-aligned rules',
    what: 'AMA-aligned clinical rules, ICD/CPT global validation, unbundling prevention, and gender/age mismatch checks applied across every claim in milliseconds.',
    how: 'Hard-logic clinical validation across millions of medical standard protocols. Fully configurable per insurer, product, and regulatory environment.',
    impact: 'Duplicate billing, upcoding, unbundling, and coding errors caught before reaching the AI layer.',
  },
  {
    n: '03', label: 'Cognitive AI', title: 'Deep Neural Networks — Document & Pattern',
    metric: 'High', mLabel: 'Detection accuracy',
    what: 'Document digitisation, real-time forgery detection, overwriting and AI manipulation checks — combined with syndicate analysis mapping provider-policyholder-intermediary nexus.',
    how: 'Deep neural networks trained on extensive claims data. Identifies emergent fraud patterns — document fraud, ghost providers, referral rings — that rules never surface.',
    impact: 'High detection accuracy. Catches the sophisticated schemes that pass through every earlier defence.',
  },
  {
    n: '04', label: 'Risk Scoring', title: 'Fraud Probability Score — 0 to 100',
    metric: 'Fast', mLabel: 'Scoring time',
    what: 'Every claim receives a composite fraud probability score combining rule violations, AI signals, document integrity, and network risk — generated in milliseconds.',
    how: 'Ensemble scoring model across all intelligence layers. Score is fully explainable — investigators see exactly which signals triggered each rating.',
    impact: 'Clear, actionable risk classification: high-risk blocked, medium-risk reviewed, low-risk auto-approved.',
  },
  {
    n: '05', label: 'Decision', title: 'Pre-Payment Block, Review, or Clear',
    metric: 'High', mLabel: 'Pre-payment block',
    what: 'Final routing: auto-approve clean claims, route high-risk claims to SIU with complete AI-built case files, or block confirmed fraud before payment releases.',
    how: 'Full audit trail generated automatically. Investigation workbench dashboards surface all evidence, similar cases, and AI rationale in one unified view.',
    impact: 'The majority of detected fraud blocked before payment. Investigation time significantly reduced versus manual processes.',
  },
];

const outcomes = [
  { Icon: TrendingDown,  metric: 'High',     label: 'Fraud Detection Rate',     sub: 'Significant improvement over rules-only baseline' },
  { Icon: AlertTriangle, metric: 'Low',      label: 'False Positive Rate',      sub: 'Precision-tuned to minimise operational disruption' },
  { Icon: Clock,         metric: 'Fast',     label: 'Investigation Turnaround', sub: 'Dramatically reduced from manual baseline' },
  { Icon: BarChart3,     metric: 'Improved', label: 'Recovery Rate',            sub: 'More fraud recovered post-payment' },
  { Icon: Shield,        metric: 'High',     label: 'Pre-Payment Block Rate',   sub: 'Fraud stopped before payment exits' },
];

// ─── HERO VISUAL ──────────────────────────────────────────────────────────

const alertsPool = [
  { id: '#CLM-8821', risk: 98, type: 'Duplicate billing — Cardiology',      color: '#EF4444', status: 'BLOCKED'  },
  { id: '#CLM-8819', risk: 87, type: 'Upcoding anomaly — Procedure 99',     color: '#F59E0B', status: 'FLAGGED'  },
  { id: '#CLM-8814', risk: 72, type: 'Unbundling pattern — Lab cluster',    color: '#F59E0B', status: 'REVIEW'   },
  { id: '#CLM-8809', risk: 22, type: 'Within benchmark — Clean claim',      color: '#10B981', status: 'CLEARED'  },
  { id: '#CLM-8834', risk: 95, type: 'Ghost provider — inactive facility',  color: '#EF4444', status: 'BLOCKED'  },
  { id: '#CLM-8831', risk: 64, type: 'Overutilisation — ICU stay duration', color: '#F59E0B', status: 'REVIEW'   },
  { id: '#CLM-8843', risk: 91, type: 'Document forgery — discharge summary', color: '#EF4444', status: 'BLOCKED' },
  { id: '#CLM-8828', risk: 18, type: 'Standard procedure — OPD visit',      color: '#10B981', status: 'CLEARED'  },
];

function FraudDashboardVisual() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle(c => (c + 1) % 2), 3200);
    return () => clearInterval(id);
  }, []);

  const visibleAlerts = alertsPool.slice(cycle * 4, cycle * 4 + 4);

  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['#EF4444', '#F59E0B', '#22C55E'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>ClaimShield AI — Live Detection</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 7px', borderRadius: '999px' }}>
          <div className="live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: '12px 14px 6px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
        {[
          { v: '14,392', l: 'Claims today',      t: '↑6.4%',      tc: '#22C55E'  },
          { v: '247',    l: 'Flagged high-risk', t: '94% caught', tc: FWA_COLOR  },
          { v: '₹8.2M',  l: 'Blocked pre-pay',   t: 'This month', tc: '#F87171'  },
        ].map(k => (
          <div key={k.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '9px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)', margin: '2px 0 1px' }}>{k.l}</div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: k.tc }}>{k.t}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '6px 14px 14px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>Live Fraud Alerts</div>
        <AnimatePresence mode="wait">
          <motion.div key={cycle}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
          >
            {visibleAlerts.map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.06, ease }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: '7px', padding: '7px 9px', border: '1px solid rgba(255,255,255,0.04)', borderLeft: `2px solid ${a.color}` }}
              >
                <div>
                  <span style={{ fontSize: '9.5px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginRight: '6px' }}>{a.id}</span>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>{a.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)' }}>Risk {a.risk}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '999px', background: `${a.color}18`, color: a.color }}>{a.status}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────────────────────

function FwaHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner">
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">ClaimShield AI — Fraud & Payment Integrity</span>,
            <h1 key="h1" className="display">
              Stop fraud<br />before payment<br /><span className="hl">is released.</span>
            </h1>,
            <p key="p" className="hero-sub">
              ClaimShield AI is the cognitive intelligence layer between claims submission and payment — scoring every claim across clinical, financial, behavioural, network, and document-driven fraud signals in real time.
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

        <motion.div className="hero-visual" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>
          <FraudDashboardVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: 'High',       l: 'Detection accuracy'  },
            { v: 'Strong',     l: 'Pre-payment block'    },
            { v: 'Post Claim', l: 'Audit capability'     },
            { v: 'Low',        l: 'False positive rate'  },
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

// ─── 2. CHALLENGE ─────────────────────────────────────────────────────────

function FraudChallenge() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">The Challenge</span>
              <h2 className="sec-title" style={{ margin: 0 }}>Fraud is evolving.<br />Your defences aren't.</h2>
            </div>
            <p className="sec-sub" style={{ maxWidth: '400px', margin: 0 }}>
              Static rules and manual investigations can't keep pace. Organised fraud rings adapt faster, document manipulation goes undetected, and investigators are overwhelmed.
            </p>
          </div>
        </FadeUp>

        <div className="prob-grid" style={{ gap: '20px' }}>
          {fraudCategories.map((cat, ci) => (
            <FadeUp key={cat.category} delay={ci * 0.07}>
              <div className="prob-card" style={{ padding: '22px', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px' }}>
                  <span className="prob-icon" style={{ marginBottom: 0, width: '38px', height: '38px' }}>
                    <cat.Icon size={18} />
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--teal)', background: 'var(--surface-highlight)', border: '1px solid var(--border)', borderRadius: '999px', padding: '3px 10px', flexShrink: 0 }}>{cat.stat}</span>
                </div>
                <div className="prob-title" style={{ fontSize: '15px', marginBottom: '2px' }}>{cat.category}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '18px' }}>{cat.statLabel}</div>

                <div style={{ display: 'grid', gap: '13px' }}>
                  {cat.items.map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <item.Icon size={14} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '3px' }}>{item.title}</div>
                        <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.55 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. SOLUTION ────────────────────────────────────────────────────────────

function ClaimShieldSolution() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">ClaimShield AI</span>
          <h2 className="sec-title" style={{ maxWidth: '620px', margin: '0 auto 12px' }}>The intelligence layer between claims and payment.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            ClaimShield AI continuously monitors every claim before payment is released — combining rule-based guardrails with cognitive AI that learns and adapts as fraud patterns evolve.
          </p>
        </FadeUp>

        <div className="why-grid">
          {protectionLayers.map((layer, i) => (
            <FadeUp key={layer.id} delay={i * 0.05}>
              <div className="why-card">
                <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <div className="why-icon"><layer.Icon size={22} /></div>
                <h3>{layer.label}</h3>
                <p>{layer.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. WORKFLOW ─────────────────────────────────────────────────────────

function DetectionFlow() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">Detection Flow</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>From claim submission<br />to payment decision.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            Five stages. Every claim. Completed before a single rupee is released.
          </p>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="rail-list" style={{ maxWidth: '760px' }}>
            {detectionStages.map((s, i) => (
              <motion.div
                className="rail-item" key={s.n}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              >
                <span className="rail-dot" />
                <div className="rail-year">{s.label}</div>
                <div className="rail-title">{s.title}</div>
                <p className="rail-desc">{s.what}</p>
                <div style={{ display: 'grid', gap: '5px', marginTop: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                  <div><span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>How — </span>{s.how}</div>
                  <div><span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>Outcome — </span>{s.impact}</div>
                </div>
                <div style={{ marginTop: '12px', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--brand-lime)', fontWeight: 800 }}>{s.metric}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}> · {s.mLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. OUTCOMES ─────────────────────────────────────────────────────────

function BusinessOutcomes() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow">Proven Outcomes Across Global Operations</span>
          <h2 className="sec-title" style={{ maxWidth: '560px', margin: '0 auto' }}>Measurable impact on fraud, operations, and payment integrity.</h2>
          <p className="sec-sub" style={{ margin: '8px auto 0' }}>
            Proven outcomes across MENA and South Asia insurance markets.
          </p>
        </FadeUp>

        <div className="outcome-row">
          {outcomes.map((o, i) => (
            <FadeUp key={o.label} delay={i * 0.05} className="outcome-cell">
              <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <span className="prob-icon" style={{ margin: '0 auto 14px' }}><o.Icon size={18} /></span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>{o.metric}</div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--heading)', marginBottom: '5px', lineHeight: 1.3 }}>{o.label}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)', lineHeight: 1.4 }}>{o.sub}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INLINE CTA BANNERS ───────────────────────────────────────────────────

function FwaInlineCTA({ headline, sub, cta, href = '/contact?intent=demo' }: { headline: string; sub: string; cta: string; href?: string }) {
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

// ─── 6. FINAL CTA ─────────────────────────────────────────────────────────

function FwaFinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {[
              { v: 'Broad',       l: 'Coverage reach' },
              { v: 'Extensive',   l: 'Claims screened' },
              { v: 'Significant', l: 'Fraud prevented' },
              { v: 'Global',      l: 'Reach' },
              { v: 'Experienced', l: 'Track record' },
            ].map(s => (
              <div key={s.l} className="stat-strip-cell" style={{ textAlign: 'center' }}>
                <div className="stat-strip-v">{s.v}</div>
                <div className="stat-strip-l">{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'].map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                <Lock size={11} style={{ color: 'var(--brand-lime)' }} />
                {c}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      <FadeUp>
        <h2>See ClaimShield AI protecting your claims in real time.</h2>
        <p>
          Our team will walk you through a demo built around your exact claim volumes, fraud patterns, and regulatory environment — not a generic slide deck.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Book a Personalised Demo <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No commitment required', 'Tailored to your fraud profile', 'Response within 24 hours'].map(t => (
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

// ─── PAGE ─────────────────────────────────────────────────────────────────

export default function FwaProductPage() {
  return (
    <main className="page">
      <FwaHero />
      <FraudChallenge />
      <FwaInlineCTA
        headline="Recognise any of these? See how ClaimShield AI stops each one."
        sub="A 30-minute demo built around your fraud exposure — duplicate billing, provider abuse, document manipulation, and more."
        cta="Book a Demo"
      />
      <ClaimShieldSolution />
      <DetectionFlow />
      <BusinessOutcomes />
      <FwaInlineCTA
        headline="See these outcomes applied to your portfolio."
        sub="Our solutions team builds the ROI case around your actual fraud exposure and claim volumes."
        cta="Book a Demo"
      />
      <FwaFinalCTA />
    </main>
  );
}
