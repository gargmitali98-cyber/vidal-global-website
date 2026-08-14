'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FileText, Brain, Shield, BarChart3, ArrowRight, Lock,
  CheckCircle2, AlertTriangle, Clock, Users, Search, Zap,
  Layers, TrendingUp, TrendingDown, Database, Target, Settings, ChevronDown,
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Two-token palette — teal for the platform, lime for a positive/ready
// outcome — replacing the ~10 arbitrary per-item hex accents the page used
// to carry (amber/red/purple/pink/green all meaning roughly "category").
const TEAL = '#007071';
const LIME = '#4D9A2A';
const AMBER = '#FEBC2E'; // matches the amber already established by Home's dashboard mockup (.hv-dot.amber)

function FadeUp({ children, delay = 0, style = {}, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, ease, delay }}>
      {children}
    </motion.div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const pricingChallenges = [
  {
    category: 'Speed & Throughput',
    Icon: Clock,
    stat: 'Slow',
    statLabel: 'RFP turnaround — multi-day cycles',
    items: [
      { Icon: FileText, title: 'Slow RFP Response',  desc: 'Manual data extraction from broker emails delays every quote cycle — competitive bids are missed daily.' },
      { Icon: Users,    title: 'Bottlenecked Teams', desc: 'Underwriters manually compile data and model risk across disconnected spreadsheets and legacy tools.' },
      { Icon: Clock,    title: 'Missed Bid Windows', desc: 'Late responses lose bids to faster-responding competitors — every delayed quote is a potential loss.' },
    ],
  },
  {
    category: 'Accuracy & Governance',
    Icon: AlertTriangle,
    stat: 'High',
    statLabel: 'rate of pricing errors from manual entry',
    items: [
      { Icon: Settings,   title: 'Spreadsheet Risk',     desc: 'Complex Excel models with version drift — one miscalculation propagates through every downstream decision.' },
      { Icon: TrendingUp, title: 'Inconsistent Pricing', desc: 'Different underwriters price the same risk differently — no guardrails, no audit trail, no consistency.' },
      { Icon: Lock,       title: 'No Approval Controls', desc: 'Pricing decisions leave without sign-off, compliance documentation, or override tracking in place.' },
    ],
  },
  {
    category: 'Profitability',
    Icon: BarChart3,
    stat: 'Significant',
    statLabel: 'loss ratio deviation from targets',
    items: [
      { Icon: TrendingDown, title: 'Loss Ratio Drift',    desc: 'Without credibility-weighted models, group pricing drifts from actuarial targets every renewal cycle.' },
      { Icon: Database,     title: 'Disconnected Claims', desc: 'Historical claims data siloed in legacy systems — never connected to the live pricing model.' },
      { Icon: Search,       title: 'Flat Risk Pricing',   desc: 'Uniform pricing across risk bands cross-subsidises high-cost groups and leaves revenue on the table.' },
    ],
  },
];

// Canonical Solution data — supersedes PriceIQIntro's shorter 4-bullet
// differentiator list (same 4 concepts, restated here with full depth) and
// its illustrative "today's dashboard" mockup, which was a decorative demo
// panel with example numbers, not a distinct value prop.
const coreCapabilities = [
  {
    id: 'automation', title: 'Underwriting Automation', Icon: Zap,
    metric: 'Automated', mLabel: 'End-to-end intake flow',
    desc: 'Email ingestion, automatic data capture, market report reading, and standardised TOB generation — the entire intake flow automated end-to-end.',
    bullets: [
      'Email integration — auto-ingest claims & member data from brokers in any format',
      'Auto-reads market reports, loss runs, and census files in any layout',
      'Auto-captures past policy benefits for seamless renewal processing',
      'Standardised TOB generation at the click of a button',
    ],
  },
  {
    id: 'product', title: 'Product Design Engine', Icon: Layers,
    metric: 'Consistent', mLabel: 'Loss ratio outcomes',
    desc: 'What-if simulations, risk-based pricing, credibility-weighted models, and sales guardrails — all in one product design workspace.',
    bullets: [
      'What-If: set target price & thresholds — system designs the optimum product',
      'Sales platform for straight-through pricing with embedded guardrails',
      'Age-banded & credibility-weighted pricing models per group',
      'Benefit configuration with sublimits, room capping, and exclusions',
    ],
  },
  {
    id: 'governance', title: 'Governance & Approvals', Icon: Shield,
    metric: '100%', mLabel: 'Audit-ready decisions',
    desc: 'Version-controlled pricings, multi-level approval workflows, full audit trail, and TOB-to-policy integration — compliance built into every decision.',
    bullets: [
      'Repetitive tasks automated — actuaries focus on judgement, not data entry',
      'Version-controlled pricings for negotiations & approvals',
      'TOB-to-policy integration for automated policy configuration',
      'Full audit trail & intelligent dashboards for management reporting',
    ],
  },
  {
    id: 'intelligence', title: 'Pricing Intelligence', Icon: Brain,
    metric: 'Significant', mLabel: 'Time saved per RFP',
    desc: 'Historical claims analysis, loss ratio modelling, scenario simulations, and risk segmentation to drive profitable underwriting every time.',
    bullets: [
      'Historical claims data integrated directly into live pricing models',
      'Loss ratio modelling with credibility algorithms and risk segmentation',
      'Scenario simulations to test pricing sensitivity before quoting',
      'Pricing guardrails prevent underpricing at the point of sale',
    ],
  },
];

const workflowStages = [
  {
    n: '01', label: 'RFP Intake', metric: 'Rapid', mLabel: 'Intake time',
    title: 'Automated RFP Intake & Data Capture',
    what: 'Every broker RFP — email, PDF, Excel, or portal submission — is automatically ingested, classified, and queued for data extraction without manual handling.',
    how: 'Email integration auto-reads census data, member lists, loss runs, and benefit schedules from any format, normalising all inputs into a standard underwriting record.',
    impact: 'Zero manual intake. RFPs that previously took hours to process arrive fully parsed and ready for risk assessment — instantly.',
  },
  {
    n: '02', label: 'Data Extraction', metric: 'High', mLabel: 'Data accuracy',
    title: 'AI Data Extraction & Normalisation',
    what: 'AI reads market reports, loss run documents, and member census data — extracting structured inputs regardless of format, layout, or document quality.',
    how: 'Document AI trained on insurance submissions extracts demographics, historical claims, benefit structures, and policy history — then normalises all fields automatically.',
    impact: 'Manual data entry eliminated. Every RFP arrives pre-populated with all required underwriting inputs — no re-keying, no transcription errors.',
  },
  {
    n: '03', label: 'Risk Assessment', metric: 'Real-time', mLabel: 'Risk scoring',
    title: 'Risk Segmentation & Assessment',
    what: 'PriceIQ segments the group by age band, claims history, benefit utilisation, and chronic conditions — building a complete risk profile before pricing begins.',
    how: 'Credibility-weighted algorithms apply historical claims data and actuarial benchmarks. Risk flags surface automatically for underwriter review before any number is entered.',
    impact: 'Underwriters start with a complete risk picture — not a blank spreadsheet. Mispriced groups identified before the quote is issued, not after claims emerge.',
  },
  {
    n: '04', label: 'Pricing Simulation', metric: 'Consistent', mLabel: 'Loss ratio targeting',
    title: 'Pricing Simulation & What-If Analysis',
    what: 'Underwriters set target loss ratios and pricing thresholds. The system simulates product variants and selects the configuration that meets profitability targets.',
    how: 'What-if engine tests thousands of product and pricing combinations instantly. Age-banded models, sublimit configurations, and benefit packages all simulated in seconds.',
    impact: 'Actuaries test product profitability before quoting. Loss ratio deviation eliminated at design stage — not discovered at renewal after the damage is done.',
  },
  {
    n: '05', label: 'Approval Workflow', metric: '100%', mLabel: 'Decisions audit-trailed',
    title: 'Underwriting Decision & Approval Workflow',
    what: 'Pricing decisions route automatically through the approval chain based on group size, risk band, and deviation from pricing guardrails.',
    how: 'Version-controlled submissions include full rationale, risk flags, and comparable historical groups. Approvers review and sign off in a single consolidated view.',
    impact: 'No off-system approvals or email chains. Every decision is tracked, timestamped, and audit-ready for compliance review at any time.',
  },
  {
    n: '06', label: 'Quote Generation', metric: 'Same-day', mLabel: 'Quote delivery',
    title: 'Automated Quote & TOB Generation',
    what: 'Approved pricing auto-generates a formatted TOB, quote document, and benefit schedule — ready to send to the broker without any manual document work.',
    how: 'TOB-to-policy integration carries approved benefits forward into policy configuration without re-entry. Standardised formatting applied across all output documents.',
    impact: 'What took days now takes minutes. Brokers receive complete, accurate quote packs — the same day the RFP arrives.',
  },
];

// The two pricing engines run continuously across every stage above, rather
// than being a stage themselves — presented as a cross-cutting pair beneath
// the workflow instead of as a fourth, competing diagram.
const intelligenceEngines = [
  {
    id: 'actuarial', title: 'Actuarial Rules Engine', subtitle: 'Deterministic pricing layer',
    desc: 'Hard-coded actuarial logic on every RFP. Age-band tables, credibility factors, benefit loadings, and regulatory rate floors — deterministic and fully auditable.',
    metric: '100%', mLabel: 'Audit-ready decisions',
    capabilities: [
      { text: 'Age-Banded & Credibility-Weighted Pricing', sub: 'Actuarially sound models per group size and demographic profile' },
      { text: 'Benefit Loading & Sublimit Controls',        sub: 'Automatic loading for high-cost benefits and coverage extensions' },
      { text: 'Regulatory Rate Floor Validation',           sub: 'Pricing never breaches regulatory minimums — validated automatically' },
      { text: 'Renewal Guardrails — Max Deviation Alerts',  sub: 'Flags renewals that exceed maximum allowable rate change' },
    ],
  },
  {
    id: 'predictive', title: 'Predictive Intelligence', subtitle: 'Machine learning pricing layer',
    desc: 'ML models trained on historical claims data identify risk patterns, simulate pricing scenarios, and help underwriters price competitively without eroding margins.',
    metric: 'Measurable', mLabel: 'Win rate improvement',
    capabilities: [
      { text: 'Claims Trend Analysis & Loss Ratio Forecasting', sub: 'Historical patterns modelled forward to predict future group costs' },
      { text: 'Risk Segmentation & Outlier Identification',     sub: 'High-cost members and chronic conditions flagged before pricing' },
      { text: 'What-If Scenario Simulation Engine',             sub: 'Thousands of product configurations tested before committing to a quote' },
      { text: 'Competitive Win Rate Optimisation',              sub: 'Price at the right level — not too high to lose, not too low to lose margin' },
    ],
  },
];

const outcomes = [
  { Icon: Zap,          metric: 'More',        label: 'RFP Throughput',          sub: 'Multiple quotes per day vs. manual baseline' },
  { Icon: Clock,        metric: 'Significant', label: 'Time Saved per RFP',      sub: 'Dramatically reduced from manual turnaround' },
  { Icon: TrendingUp,   metric: 'Improved',    label: 'Win Rate Outcomes',       sub: 'Faster, sharper quotes win more bids' },
  { Icon: Target,       metric: 'Consistent',  label: 'Loss Ratio Targeting',    sub: 'Target set and achieved at the pricing stage' },
  { Icon: CheckCircle2, metric: 'Zero',        label: 'Manual Data Entry Steps', sub: 'Fully automated from RFP intake to TOB' },
];

// ─── HERO VISUAL ──────────────────────────────────────────────────────────

const cyclingRFPs = [
  {
    id: '#RFP-2024-0441', client: 'TechCorp Solutions', members: '450 Members', type: 'Group Health',
    fields: [{ k: 'Product', v: 'PPO Enhanced' }, { k: 'Type', v: 'Renewal' }, { k: 'History', v: '3yr Claims' }],
    steps: [
      { label: 'AI Data Extraction & Normalisation', time: '0.8s' },
      { label: 'Risk Segmentation — Medium Risk',    time: '1.2s' },
      { label: 'Credibility Weighting Applied',      time: '1.6s' },
      { label: 'Pricing Simulation — 847 variants',  time: '2.1s' },
    ],
    risk: 'Medium', rate: '₹4,280 / member / month', status: 'QUOTE READY', ready: true,
  },
  {
    id: '#RFP-2024-0452', client: 'MediCare Group', members: '1,200 Members', type: 'Group Health',
    fields: [{ k: 'Product', v: 'PPO Comprehensive' }, { k: 'Type', v: 'New Business' }, { k: 'Risk', v: 'High' }],
    steps: [
      { label: 'AI Data Extraction & Normalisation', time: '0.9s' },
      { label: 'Risk Segmentation — High Risk',      time: '1.4s' },
      { label: 'Credibility Weighting Applied',      time: '1.8s' },
      { label: 'Pricing Simulation — 1,240 variants', time: '2.4s' },
    ],
    risk: 'High', rate: '₹6,850 / member / month', status: 'REVIEW REQUIRED', ready: false,
  },
  {
    id: '#RFP-2024-0467', client: 'GlobalTech Enterprises', members: '280 Members', type: 'Group Health',
    fields: [{ k: 'Product', v: 'HMO Standard' }, { k: 'Type', v: 'Renewal' }, { k: 'History', v: '5yr Claims' }],
    steps: [
      { label: 'AI Data Extraction & Normalisation', time: '0.7s' },
      { label: 'Risk Segmentation — Low Risk',       time: '1.0s' },
      { label: 'Credibility Weighting Applied',      time: '1.3s' },
      { label: 'Pricing Simulation — 524 variants',  time: '1.7s' },
    ],
    risk: 'Low', rate: '₹3,140 / member / month', status: 'QUOTE READY', ready: true,
  },
];

function PricingDashboardVisual() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle(c => (c + 1) % cyclingRFPs.length), 5200);
    return () => clearInterval(id);
  }, []);

  const rfp = cyclingRFPs[cycle];
  const statusColor = rfp.ready ? LIME : AMBER;

  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Window chrome */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>PriceIQ — Underwriting Engine</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 7px', borderRadius: '999px' }}>
          <div className="live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      {/* Cycling content */}
      <AnimatePresence mode="wait">
        <motion.div key={cycle}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease }}
        >
          {/* RFP card */}
          <div style={{ padding: '12px 14px 8px' }}>
            <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 12px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: '32px', height: '42px', background: `${TEAL}18`, border: `1px solid ${TEAL}35`, borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '3px', padding: '6px', flexShrink: 0 }}>
                {[1, 1, 0.75, 0.75, 0.5].map((w, i) => (
                  <div key={i} style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.22)', width: `${w * 100}%` }} />
                ))}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.72)' }}>RFP {rfp.id}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{rfp.client} — {rfp.members} | {rfp.type}</div>
                <div style={{ display: 'flex', gap: '5px', marginTop: '7px', flexWrap: 'wrap' }}>
                  {rfp.fields.map(f => (
                    <div key={f.k} style={{ fontSize: '9px', background: `${TEAL}12`, border: `1px solid ${TEAL}22`, borderRadius: '4px', padding: '2px 7px', color: TEAL, fontWeight: 600 }}>
                      <span style={{ color: 'rgba(255,255,255,0.38)' }}>{f.k}: </span>{f.v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline steps */}
          <div style={{ padding: '0 14px 8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>Underwriting Pipeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {rfp.steps.map((step, i) => (
                <motion.div key={step.label}
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.26, delay: 0.3 + i * 0.18, ease }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: '7px', padding: '7px 9px', border: '1px solid rgba(255,255,255,0.04)', borderLeft: `2px solid ${TEAL}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <CheckCircle2 size={10} style={{ color: TEAL, flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.62)' }}>{step.label}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', fontWeight: 500, flexShrink: 0 }}>{step.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote result */}
          <div style={{ padding: '8px 14px 14px' }}>
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + rfp.steps.length * 0.18 + 0.3, duration: 0.3, ease }}
              style={{ background: `${statusColor}14`, border: `1px solid ${statusColor}30`, borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Target Loss Ratio: 85% | Risk: {rfp.risk}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>
                  Rate: <span style={{ color: statusColor }}>{rfp.rate}</span>
                </div>
              </div>
              <div style={{ fontSize: '9px', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', background: `${statusColor}20`, color: statusColor, flexShrink: 0 }}>{rfp.status}</div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────────────────────

function PriceIQHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner">
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">PriceIQ — Group & Individual Health Pricing Platform</span>,
            <h1 key="h1" className="display">
              Price smarter.<br />Underwrite faster.<br /><span className="hl">Win more.</span>
            </h1>,
            <p key="p" className="hero-sub">
              PriceIQ replaces the spreadsheet-driven underwriting cycle with an AI-powered decision engine — from broker RFP to approved quote in minutes, not days.
            </p>,
            <div key="btns" className="hero-actions">
              <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                Book a Demo <ArrowRight size={14} />
              </Link>
            </div>,
          ].map((el, i) => (
            <motion.div key={i} variants={{ h: { opacity: 0, y: 14 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.44, ease }}>
              {el}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-visual" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>
          <PricingDashboardVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '+/- 50 bps', l: 'Loss Ratio Estimated vs Actual' },
            { v: '100%',       l: 'Automated RFP intake'           },
            { v: 'Up to 70%',  l: 'Time saved'                     },
            { v: '3x',         l: 'Increased in conversion'        },
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

function PricingChallenge() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">The Challenge</span>
              <h2 className="sec-title" style={{ margin: 0 }}>Health insurance pricing is<br />still running on spreadsheets.</h2>
            </div>
            <p className="sec-sub" style={{ maxWidth: '400px', margin: 0 }}>
              Underwriting teams face mounting RFP volumes with manual tools. Every quote is a race against time — and against competitors who move faster.
            </p>
          </div>
        </FadeUp>

        <div className="prob-grid">
          {pricingChallenges.map((cat, ci) => {
            const lead = cat.items[0];
            return (
              <FadeUp key={cat.category} delay={ci * 0.07}>
                <div className="prob-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '20px 22px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <span className="prob-icon" style={{ marginBottom: '10px' }}><cat.Icon size={18} /></span>
                      <div className="prob-title" style={{ marginBottom: '2px' }}>{cat.category}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{cat.statLabel}</div>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--teal)', background: 'var(--surface-highlight)', border: '1px solid var(--border)', borderRadius: '999px', padding: '3px 10px', flexShrink: 0 }}>{cat.stat}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '11px', padding: '13px 22px', borderTop: '1px solid var(--border)' }}>
                    <lead.Icon size={15} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '3px' }}>{lead.title}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.55 }}>{lead.desc}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 3. SOLUTION ────────────────────────────────────────────────────────────

function PriceIQSolution() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">What is PriceIQ</span>
          <h2 className="sec-title" style={{ maxWidth: '620px', margin: '0 auto 12px' }}>One platform for pricing, underwriting, and product design.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            PriceIQ transforms the complexity of Group and Individual Health Pricing & Underwriting into a process that is simpler, accurate and accountable — low implementation effort, measurable improvement in loss ratio and win rates.
          </p>
        </FadeUp>

        <div className="why-grid">
          {coreCapabilities.map((cap, i) => {
            const isOpen = expanded === cap.id;
            return (
              <FadeUp key={cap.id} delay={i * 0.06}>
                <div className="why-card" style={{ cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : cap.id)} role="button" tabIndex={0}>
                  <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <div className="why-icon"><cap.Icon size={22} /></div>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--teal)', letterSpacing: '-0.01em' }}>{cap.metric}</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>· {cap.mLabel}</span>
                    <ChevronDown size={15} style={{ marginLeft: 'auto', color: 'var(--subtle)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease }} style={{ overflow: 'hidden' }}>
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'grid', gap: '9px' }}>
                          {cap.bullets.map(b => (
                            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                              <CheckCircle2 size={14} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '1px' }} />
                              {b}
                            </div>
                          ))}
                        </div>
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

// ─── 4. WORKFLOW ─────────────────────────────────────────────────────────

function UnderwritingWorkflow() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">Pricing & Underwriting Workflow</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>From RFP to approved quote.<br />Under 30 minutes.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            Six intelligent stages from broker submission to final quote delivery — no manual touchpoints in the standard flow.
          </p>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <div className="rail-list" style={{ maxWidth: '760px' }}>
            {workflowStages.map((s, i) => (
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
                  <div><span style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>Impact — </span>{s.impact}</div>
                </div>
                <div style={{ marginTop: '12px', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--brand-lime)', fontWeight: 800 }}>{s.metric}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}> · {s.mLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two engines that run underneath every stage above */}
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="eyebrow eyebrow-light">Two Engines, Every RFP</span>
          </div>
          <div className="pl-prod-grid-2" style={{ display: 'grid', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {intelligenceEngines.map(eng => (
              <div key={eng.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '3px' }}>{eng.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--brand-lime)', fontWeight: 600 }}>{eng.subtitle}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-lime)', letterSpacing: '-0.04em', lineHeight: 1 }}>{eng.metric}</div>
                    <div style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{eng.mLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '16px' }}>{eng.desc}</p>
                <div style={{ display: 'grid', gap: '9px' }}>
                  {eng.capabilities.map(cap => (
                    <div key={cap.text} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand-lime)', flexShrink: 0, marginTop: '6px' }} />
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'rgba(255,255,255,0.78)' }}>{cap.text}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '1px' }}>{cap.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
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
          <span className="eyebrow">Business Outcomes</span>
          <h2 className="sec-title" style={{ maxWidth: '520px', margin: '0 auto' }}>Measurable impact from deployment.</h2>
          <p className="sec-sub" style={{ margin: '8px auto 0' }}>
            Built by practitioners. The numbers reflect real deployments with health insurers, TPAs, and reinsurers across India, UAE, and Saudi Arabia.
          </p>
        </FadeUp>

        <div className="outcome-row">
          {outcomes.map((o, i) => (
            <FadeUp key={o.label} delay={i * 0.05} className="outcome-cell">
              <div
                style={{
                  textAlign: 'center',
                  padding: '0 16px',
                  borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                }}
              >
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

// ─── 6. FINAL CTA ─────────────────────────────────────────────────────────

function PriceIQFinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {[
              { v: '20+',       l: 'Years domain depth' },
              { v: '150M+',     l: 'Lives covered'       },
              { v: 'Extensive', l: 'RFPs processed'      },
              { v: 'Faster',    l: 'Quote delivery'      },
              { v: 'Improved',  l: 'Win rate outcomes'   },
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
        <h2>See PriceIQ quoting your next RFP in real time.</h2>
        <p>
          Our team will walk you through a demo built around your product mix, RFP volumes, and loss ratio targets — not a generic slide deck.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Book a Personalised Demo <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No commitment required', 'Tailored to your product mix', 'Response within 24 hours'].map(t => (
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

// ─── INLINE CTA ────────────────────────────────────────────────────────────

function PriceIQInlineCTA({ headline, sub, cta, href = '/contact?intent=demo' }: { headline: string; sub: string; cta: string; href?: string }) {
  return (
    <div style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
      <div className="sec-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '3px', height: '36px', borderRadius: '2px', background: 'var(--teal)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{headline}</div>
            <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>{sub}</div>
          </div>
        </div>
        <Link href={href} className="btn btn-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {cta} <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function PriceIQProductPage() {
  return (
    <main className="page">
      <PriceIQHero />
      <PricingChallenge />
      <PriceIQSolution />
      <PriceIQInlineCTA
        headline="Ready to replace the spreadsheet? See PriceIQ in action."
        sub="Walk through a live RFP — from email intake to approved quote — in under 30 minutes."
        cta="Book a Demo"
      />
      <UnderwritingWorkflow />
      <BusinessOutcomes />
      <PriceIQFinalCTA />
    </main>
  );
}
