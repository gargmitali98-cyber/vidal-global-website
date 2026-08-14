'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FileText, Shield, BarChart3, ArrowRight,
  CheckCircle2, AlertTriangle, Clock, Users, Search, Zap,
  Layers, TrendingUp, Database, Globe, Eye, Copy, TrendingDown, ChevronDown,
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// EC was an arbitrary sky-blue brand pick with no semantic meaning — folded
// into the site's teal. Red/amber/green stay where they carry genuine
// status meaning (pass/warn/fail, risk level), which is a legitimate use of
// colour, not decoration.
const EC = '#007071';
const LIME = '#4D9A2A';

function FadeUp({ children, delay = 0, style = {}, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, ease, delay }}>
      {children}
    </motion.div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const docChallenges = [
  {
    category: 'Document Chaos',
    Icon: FileText,
    stat: 'Most',
    statLabel: 'claims arrive unstructured',
    items: [
      { Icon: Layers,   title: 'Unstructured Formats',              desc: 'Scanned PDFs, handwritten forms, and fax submissions — all requiring separate manual workflows.' },
      { Icon: Globe,    title: 'Complex Provider Tariff Documents',  desc: 'Complicated provider tariff documents need to be digitised, structured, and applied automatically for Straight-Through Processing.' },
      { Icon: Database, title: 'Inconsistent Data',                 desc: 'Non-standard coding and missing fields make automated validation impossible at scale.' },
    ],
  },
  {
    category: 'Fraud & Leakage',
    Icon: AlertTriangle,
    stat: 'Significant',
    statLabel: 'leakage from missed non-payables',
    items: [
      { Icon: Eye,    title: 'Document Tampering',  desc: 'Altered bills and forged discharge summaries pass manual review without AI-assisted checks.' },
      { Icon: Copy,   title: 'Duplicate Billing',   desc: 'Same service billed multiple times or across providers — invisible without cross-claim intelligence.' },
      { Icon: Search, title: 'Missed Non-Payables', desc: 'Personal expenses and policy exclusions slip through manual review undetected, every day.' },
    ],
  },
  {
    category: 'Operational Burden',
    Icon: Clock,
    stat: 'Hours',
    statLabel: 'average manual processing time',
    items: [
      { Icon: Users,      title: 'Manual Queues',     desc: 'Each claim moves through document, clinical, and fraud reviewers — in silos, in sequence.' },
      { Icon: Clock,      title: 'Delayed Decisions', desc: 'Cashless approvals taking many hours — friction for members, disputes with providers.' },
      { Icon: TrendingUp, title: 'Rising Costs',      desc: 'Growing claim volumes with static headcount — cost-per-claim rises every quarter.' },
    ],
  },
];

// Canonical Solution data — supersedes EnigmaIntro's shorter 4-bullet
// differentiator list (same 4 concepts) and its illustrative "live feed"
// mockup, a decorative demo panel rather than a distinct value prop.
const coreCapabilities = [
  {
    id: 'doc-intel', title: 'Document Intelligence', Icon: FileText,
    metric: '4 languages', mLabel: 'English, Arabic, Urdu, Hindi',
    desc: 'AI-powered categorisation, entity extraction, and digitisation of all OP, IP, or Wellness claim-related documents.',
    bullets: [
      'AI categorisation, entity extraction & digitisation of OP, IP, and Wellness documents',
      'Identifies non-payables, detects tampering, and auto-codes ICD/PCS',
      'Proficient in English, Arabic, Urdu, and Hindi',
    ],
  },
  {
    id: 'rules', title: 'Medical Rules Engine', Icon: Shield,
    metric: '7.5M+', mLabel: 'AMA-aligned clinical rules',
    desc: "The industry's most robust deterministic layer. Hard-logic clinical validation across millions of medical standard protocols.",
    bullets: [
      'Runs 7.5M+ AMA-aligned clinical rules across every claim',
      'Condition-specific rules: Cataract, Maternity, common surgical procedures',
      'Policy-linked sublimits, room capping, inclusions & exclusions — automated, without human intervention',
    ],
  },
  {
    id: 'fwa', title: 'FWA & Waste Detection', Icon: AlertTriangle,
    metric: '40+', mLabel: 'clinical abuse triggers',
    desc: 'Identifies document tampering, forgery, syndicate patterns, and 40+ clinical abuse triggers — automatically.',
    bullets: [
      '10+ document-level FWA triggers: tampering, forgery, syndicate analysis',
      '40+ clinical rule-based abuse triggers: inflated billing, provider abuse patterns',
      'Risk-scored alerts enable auto-escalation or auto-rejection per claim',
    ],
  },
  {
    id: 'insights', title: 'Insights & Co-Pilot', Icon: BarChart3,
    metric: 'Real-time', mLabel: 'dashboards & benchmarking',
    desc: 'Real-time dashboards, tariff benchmarking, and an AI co-pilot that recommends final payable amounts.',
    bullets: [
      'Real-time dashboards for TAT, non-payable trends, and claim pipeline status',
      'Tariff benchmarking, provider risk scores, and claim abuse likelihood',
      'Claims Co-Pilot reconciles bills, flags non-medical expenses, recommends final payable with human in loop',
    ],
  },
];

const workflowStages = [
  {
    n: '01', label: 'Claim Ingest', title: 'Multi-Format Claim Ingestion',
    metric: 'Rapid', mLabel: 'Ingest time',
    what: 'Every claim enters ENIGMA — reimbursement or cashless, digital or scanned — automatically normalised across all formats from the moment of receipt.',
    how: 'Accepts EDI, PDF, image, email, and API submissions. Every document auto-classified and queued for AI processing without manual routing.',
    impact: 'Zero manual sorting. Every claim enters the intelligence pipeline automatically, regardless of source, format, or language.',
  },
  {
    n: '02', label: 'AI Digitisation', title: 'AI Digitisation & Categorisation',
    metric: 'Multi-language', mLabel: 'English · Arabic · Urdu · Hindi & more',
    what: 'AI reads, categorises, and extracts structured data from every claim document — discharge summaries, bills, lab reports, prescriptions — in any format or language.',
    how: 'Deep document AI trained on millions of insurance documents. Extracts entities, identifies document type, auto-codes ICD/PCS, and flags non-payable items.',
    impact: 'Every claim fully digitised in seconds. No manual data entry. ICD/PCS codes applied automatically. Non-payables surfaced before adjudication.',
  },
  {
    n: '03', label: 'Rule Validation', title: 'Clinical Rules Engine — 7.5M+ Rules',
    metric: '7.5M+', mLabel: 'AMA-aligned rules',
    what: 'ICD 9, ICD 10 AM/CM, CPT, and CDT code validation, condition-specific adjudication logic, and policy-linked coverage rules applied across every claim in milliseconds.',
    how: 'Includes sublimit enforcement, room capping, coverage exclusions, and condition-specific pathways for Cataract, Maternity, and surgical procedures.',
    impact: 'Billing errors, coverage violations, and coding inconsistencies caught before FWA scoring — no human reviewer required for standard validations.',
  },
  {
    n: '04', label: 'FWA Scoring', title: 'Document Fraud & Abuse Detection',
    metric: '10+', mLabel: 'Doc-level FWA triggers',
    what: 'ENIGMA runs 10+ document-level FWA triggers and 40+ clinical abuse checks — covering tampering, forgery, provider abuse, inflated billing, and syndicate patterns.',
    how: 'Risk-scored alerts generated per claim. High-risk claims auto-escalated to investigation. Confirmed fraud auto-rejected with full audit trail.',
    impact: 'Document fraud, ghost billing, and abuse patterns identified and acted on before any payment is released.',
  },
  {
    n: '05', label: 'Auto-Adjudication', title: 'Decision Support & Auto-Adjudication',
    metric: 'High', mLabel: 'Straight-through processing',
    what: 'Clean claims are auto-adjudicated with a final payable recommendation. Complex cases surface to human reviewers with full AI rationale, evidence, and deduction breakdown.',
    how: 'Claims Co-Pilot reconciles bills, deducts non-payables, and recommends final payable. Human reviewer confirms or overrides with complete audit trail.',
    impact: 'High straight-through processing rate. Human reviewers focus only on exceptions — not routine claims. Turnaround time significantly reduced from manual baseline.',
  },
];

const outcomes = [
  { Icon: Zap,           metric: 'Fast',        label: 'Claims Processing Time',      sub: 'Dramatically reduced from manual baseline' },
  { Icon: TrendingDown,  metric: 'High',        label: 'Straight-Through Processing', sub: 'Claims auto-adjudicated without manual touch' },
  { Icon: AlertTriangle, metric: '40+',         label: 'Fraud Triggers Automated',    sub: 'Document and clinical abuse patterns covered' },
  { Icon: CheckCircle2,  metric: 'Near-zero',   label: 'Missed Non-Payables',         sub: 'Compared to high manual review miss rate' },
  { Icon: BarChart3,     metric: 'Significant', label: 'Cost Reduction Per Claim',    sub: 'Operational savings at scale with ENIGMA' },
];

// ─── HERO VISUAL ────────────────────────────────────────────────────────

const ENIGMA_DOCS = [
  {
    id: '#INS-2024-8821', hospital: 'Apollo Hospital, Mumbai', type: 'IP Cashless',
    lines: ['DISCHARGE SUMMARY', 'Patient: Rajesh Kumar, M / 45', 'Diagnosis: Cholelithiasis', 'ICD-10 Code: K80.2', 'Procedure: Laparoscopic Cholecystectomy', 'CPT Code: 47600', 'Total Billed: ₹ 24,500', 'Attending: Dr. S. Mehta, MS'],
    extractions: [
      { lineIdx: 0, k: 'Document type', v: 'Discharge Summary', color: EC        },
      { lineIdx: 3, k: 'ICD-10',        v: 'K80.2',            color: '#F59E0B' },
      { lineIdx: 5, k: 'CPT Code',       v: '47600',            color: '#F59E0B' },
      { lineIdx: 6, k: 'Billed amount',  v: '₹24,500',         color: '#10B981' },
    ],
    rules: [
      { label: 'ICD K80.2 → Standard surgical protocol', ok: true  },
      { label: 'CPT 47600 → Laparoscopic in-benefit',     ok: true  },
      { label: 'Room type: Daycare → Sublimit applied',   ok: false },
      { label: '7.5M AMA rules — all checks passed',      ok: true  },
    ],
    fwaChecks: [
      { label: 'Document authenticity', result: 'Verified', color: '#10B981' },
      { label: 'Provider risk profile',  result: 'Low risk', color: '#10B981' },
      { label: 'Non-payables flagged',   result: '₹2,400',   color: '#F59E0B' },
    ],
    riskScore: 8,
    status: 'AUTO-APPROVED', statusColor: '#22C55E',
    billed: '₹24,500', deduction: '₹2,400', payable: '₹22,100',
  },
  {
    id: '#INS-2024-8834', hospital: 'Max Super Speciality, Delhi', type: 'OP Reimbursement',
    lines: ['OUTPATIENT PRESCRIPTION', 'Patient: Priya Sharma, F / 32', 'Diagnosis: Acute URTI', 'ICD-10 Code: J06.9', 'Consultation Type: General OP', 'CPT Code: 99213', 'Total Billed: ₹ 8,500', 'Physician: Dr. A. Sinha, MBBS'],
    extractions: [
      { lineIdx: 0, k: 'Document type', v: 'Prescription', color: EC        },
      { lineIdx: 3, k: 'ICD-10',        v: 'J06.9',       color: '#F59E0B' },
      { lineIdx: 5, k: 'CPT Code',       v: '99213',       color: '#F59E0B' },
      { lineIdx: 6, k: 'Billed amount',  v: '₹8,500',     color: '#10B981' },
    ],
    rules: [
      { label: 'ICD J06.9 → OP Consultation protocol', ok: true },
      { label: 'CPT 99213 → GP visit in-benefit',       ok: true },
      { label: 'OP sublimit: ₹5,000/year available',    ok: true },
      { label: '7.5M AMA rules — all checks passed',    ok: true },
    ],
    fwaChecks: [
      { label: 'Document authenticity', result: 'Verified', color: '#10B981' },
      { label: 'Provider risk profile',  result: 'Clean',    color: '#10B981' },
      { label: 'Non-payables flagged',   result: '₹800',     color: '#F59E0B' },
    ],
    riskScore: 4,
    status: 'AUTO-APPROVED', statusColor: '#22C55E',
    billed: '₹8,500', deduction: '₹800', payable: '₹7,700',
  },
  {
    id: '#INS-2024-8847', hospital: 'Narayana Health, Bengaluru', type: 'IP Cashless',
    lines: ['DISCHARGE SUMMARY', 'Patient: Ahmed Khan, M / 58', 'Diagnosis: Atrial Fibrillation', 'ICD-10 Code: I48.0', 'Procedure: ECG + Cardio consult', 'CPT Code: 93000', 'Total Billed: ₹ 52,000', 'Attending: Dr. R. Rao, DM Cardiology'],
    extractions: [
      { lineIdx: 0, k: 'Document type', v: 'Discharge Summary', color: EC        },
      { lineIdx: 3, k: 'ICD-10',        v: 'I48.0',            color: '#F59E0B' },
      { lineIdx: 5, k: 'CPT Code',       v: '93000',            color: '#F59E0B' },
      { lineIdx: 6, k: 'Billed amount',  v: '₹52,000',         color: '#10B981' },
    ],
    rules: [
      { label: 'ICD I48.0 → Cardiac protocol active',    ok: true  },
      { label: 'CPT 93000 → ECG procedure in-benefit',    ok: true  },
      { label: 'Room capping: 2-bed limit applied',       ok: false },
      { label: 'Billing anomaly: inflated charge noted',  ok: false },
    ],
    fwaChecks: [
      { label: 'Document anomaly detected', result: 'Flagged',  color: '#EF4444' },
      { label: 'Provider risk score',        result: 'Elevated', color: '#F59E0B' },
      { label: 'Non-payables found',         result: '₹4,200',  color: '#F59E0B' },
    ],
    riskScore: 62,
    status: 'PENDING REVIEW', statusColor: '#F59E0B',
    billed: '₹52,000', deduction: '₹4,200', payable: '₹47,800',
  },
];

const ENIGMA_PHASE_META = [
  { n: '01', label: 'Document Intake',      color: EC        },
  { n: '02', label: 'AI Digitisation',      color: '#F59E0B' },
  { n: '03', label: 'Clinical Rules Engine', color: '#10B981' },
  { n: '04', label: 'FWA Detection',         color: '#EF4444' },
  { n: '05', label: 'Decision Output',       color: '#22C55E' },
];

const ENIGMA_FPP = 5;
const ENIGMA_FPC = 25;

function DocumentProcessingVisual() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame(f => f + 1), 650);
    return () => clearInterval(id);
  }, []);

  const docIdx   = Math.floor(frame / ENIGMA_FPC) % ENIGMA_DOCS.length;
  const fi       = frame % ENIGMA_FPC;
  const phaseIdx = Math.floor(fi / ENIGMA_FPP);
  const subFrame = fi % ENIGMA_FPP;
  const doc      = ENIGMA_DOCS[docIdx];
  const phase    = ENIGMA_PHASE_META[phaseIdx];

  const activeLine     = Math.min(subFrame * 2, doc.lines.length - 1);
  const visExtractions = doc.extractions.filter(e => e.lineIdx <= activeLine);
  const rulesVisible   = Math.min(subFrame + 1, doc.rules.length);
  const fwaVisible     = Math.min(subFrame + 1, doc.fwaChecks.length);
  const intakeVisible  = Math.min(subFrame + 1, 3);
  const intakeDocs     = ['Discharge Summary', 'Medical Bills & Invoices', 'Supporting Documents'];

  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Chrome */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['#EF4444', '#F59E0B', '#22C55E'] as const).map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>ENIGMA — AI Document Intelligence</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 8px', borderRadius: '999px' }}>
          <div className="live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      {/* Phase strip */}
      <div style={{ padding: '10px 18px 2px', display: 'flex', gap: '3px' }}>
        {ENIGMA_PHASE_META.map((p, i) => (
          <div key={p.n} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= phaseIdx ? p.color : 'rgba(255,255,255,0.06)', transition: 'background 0.35s' }} />
        ))}
      </div>

      {/* Claim + phase header */}
      <div style={{ padding: '10px 18px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Claim {doc.id}</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '1px' }}>{doc.hospital} · {doc.type}</div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={phaseIdx}
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <div style={{ fontSize: '9px', fontWeight: 700, background: `${phase.color}14`, color: phase.color, border: `1px solid ${phase.color}28`, borderRadius: '999px', padding: '2px 8px', flexShrink: 0 }}>
              {phase.n} / 05
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{phase.label}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        <motion.div key={`ph-${phaseIdx}-d-${docIdx}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24 }}
          style={{ padding: '8px 18px 16px', minHeight: '230px' }}
        >
          {/* Phase 0: Document Intake */}
          {phaseIdx === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.48)', marginBottom: '2px' }}>Documents received for AI processing</div>
              {intakeDocs.slice(0, intakeVisible).map((name, i) => (
                <motion.div key={name}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', background: `${EC}0C`, border: `1px solid ${EC}22`, borderRadius: '9px', padding: '9px 12px' }}
                >
                  <div style={{ width: '30px', height: '36px', background: `${EC}12`, border: `1px solid ${EC}28`, borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '3px', padding: '5px', flexShrink: 0 }}>
                    {[1, 0.8, 0.6, 0.6].map((w, j) => <div key={j} style={{ height: '2.5px', borderRadius: '1px', background: 'rgba(255,255,255,0.18)', width: `${w * 100}%` }} />)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.72)' }}>{name}</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Queued for AI processing</div>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: EC, flexShrink: 0 }} />
                </motion.div>
              ))}
              {intakeVisible < 3 && (
                <div style={{ display: 'flex', gap: '4px', padding: '2px' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: EC }}
                      animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.22 }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phase 1: AI Digitisation */}
          {phaseIdx === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '9px', padding: '9px', overflow: 'hidden' }}>
                <div style={{ fontSize: '7.5px', fontWeight: 700, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>Document</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {doc.lines.map((line, i) => (
                    <motion.div key={i}
                      animate={{ background: i === activeLine ? `${EC}18` : 'transparent', color: i <= activeLine ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.42)' }}
                      transition={{ duration: 0.2 }}
                      style={{ fontSize: '8.5px', lineHeight: 1.55, padding: '2px 5px', borderRadius: '3px', borderLeft: `2px solid ${i === activeLine ? EC : 'transparent'}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {line}
                      {i === activeLine && (
                        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                          style={{ display: 'inline-block', width: '4px', height: '8px', background: EC, marginLeft: '2px', verticalAlign: 'middle', borderRadius: '1px' }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '9px', padding: '9px' }}>
                <div style={{ fontSize: '7.5px', fontWeight: 700, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>Extracted</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minHeight: '150px' }}>
                  <AnimatePresence>
                    {visExtractions.map(ex => (
                      <motion.div key={ex.k}
                        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${ex.color}10`, border: `1px solid ${ex.color}22`, borderRadius: '5px', padding: '4px 7px' }}
                      >
                        <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.55)' }}>{ex.k}</span>
                        <span style={{ fontSize: '9.5px', fontWeight: 700, color: ex.color }}>{ex.v}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Clinical Rules Engine */}
          {phaseIdx === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>7.5M+ AMA-aligned clinical rules</div>
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#10B981' }}>{rulesVisible}/{doc.rules.length} validated</div>
              </div>
              {doc.rules.slice(0, rulesVisible).map((rule, i) => (
                <motion.div key={rule.label}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: rule.ok ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)', border: `1px solid ${rule.ok ? 'rgba(16,185,129,0.18)' : 'rgba(245,158,11,0.18)'}`, borderLeft: `2.5px solid ${rule.ok ? '#10B981' : '#F59E0B'}`, borderRadius: '7px', padding: '7px 10px' }}
                >
                  <span style={{ fontSize: '11px', flexShrink: 0, lineHeight: '1' }}>{rule.ok ? '✓' : '⚠'}</span>
                  <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)' }}>{rule.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Phase 3: FWA Detection */}
          {phaseIdx === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>Document & clinical FWA analysis</div>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '-0.03em', color: doc.riskScore < 30 ? '#10B981' : doc.riskScore < 60 ? '#F59E0B' : '#EF4444' }}>{doc.riskScore}/100</div>
              </div>
              {doc.fwaChecks.slice(0, fwaVisible).map((check, i) => (
                <motion.div key={check.label}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${check.color}08`, border: `1px solid ${check.color}20`, borderLeft: `2.5px solid ${check.color}`, borderRadius: '7px', padding: '8px 10px' }}
                >
                  <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.52)' }}>{check.label}</span>
                  <span style={{ fontSize: '9.5px', fontWeight: 700, color: check.color }}>{check.result}</span>
                </motion.div>
              ))}
              {subFrame >= 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '7px', padding: '7px 10px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>Overall risk</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: doc.riskScore < 30 ? '#10B981' : doc.riskScore < 60 ? '#F59E0B' : '#EF4444' }}>{doc.riskScore < 30 ? 'Low' : doc.riskScore < 60 ? 'Medium' : 'High'}</div>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', borderRadius: '2px', background: doc.riskScore < 30 ? '#10B981' : doc.riskScore < 60 ? '#F59E0B' : '#EF4444', originX: 0 }}
                      animate={{ width: `${doc.riskScore}%` }} transition={{ duration: 0.9, ease }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Phase 4: Decision Output */}
          {phaseIdx === 4 && (
            <div style={{ background: `${doc.statusColor}08`, border: `1px solid ${doc.statusColor}25`, borderRadius: '11px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>Claim {doc.id}</div>
                <div style={{ fontSize: '9.5px', fontWeight: 700, background: `${doc.statusColor}18`, color: doc.statusColor, border: `1px solid ${doc.statusColor}30`, borderRadius: '999px', padding: '3px 9px' }}>{doc.status}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                {[
                  { l: 'Billed',      v: doc.billed,    color: 'rgba(255,255,255,0.5)' },
                  { l: 'Non-payable', v: doc.deduction, color: '#F59E0B'                },
                  { l: 'Approved',    v: doc.payable,   color: doc.statusColor          },
                ].map(m => (
                  <div key={m.l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '7px', padding: '9px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{m.l}</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>{m.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '10px', fontSize: '9px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                7.5M rules applied · Document → Decision in seconds
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cycle indicator */}
      <div style={{ padding: '2px 18px 18px', display: 'flex', gap: '4px' }}>
        {ENIGMA_DOCS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '2px', borderRadius: '1px', background: i === docIdx ? EC : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
        ))}
      </div>
    </div>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────────────────────

function EnigmaHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner" style={{ '--hero-col-l': '540px', '--hero-col-r': '480px' } as React.CSSProperties}>
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">ENIGMA — Document Intelligence & Claims Automation</span>,
            <h1 key="h1" className="display">
              From scanned<br />document to<br /><span className="hl">payment decision.</span>
            </h1>,
            <p key="p" className="hero-sub">
              ENIGMA is the AI intelligence layer between claim receipt and payment release — digitising documents, applying 7.5M+ clinical rules, and identifying fraud before any rupee is paid.
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

        <motion.div className="hero-visual" style={{ maxWidth: '480px' }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease, delay: 0.16 }}>
          <DocumentProcessingVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '7.5M+', l: 'Clinical rules'  },
            { v: 'High',  l: 'STP rate'         },
            { v: 'Fast',  l: 'Per-claim speed'  },
            { v: '10+',   l: 'FWA triggers'     },
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

function DocumentChallenge() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">The Challenge</span>
              <h2 className="sec-title" style={{ margin: 0 }}>Documents are the<br />weakest link in claims.</h2>
            </div>
            <p className="sec-sub" style={{ maxWidth: '400px', margin: 0 }}>
              Claims teams process thousands of unstructured documents daily — manually. Fraud slips through, non-payables go undetected, and turnaround times suffer.
            </p>
          </div>
        </FadeUp>

        <div className="prob-grid" style={{ gap: '20px' }}>
          {docChallenges.map((cat, ci) => (
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

function EnigmaSolution() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">What is ENIGMA</span>
          <h2 className="sec-title" style={{ maxWidth: '620px', margin: '0 auto 12px' }}>The intelligence layer between documents and decisions.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            ENIGMA combines Document-Level Intelligence with a Clinical Rule Engine — delivering true end-to-end claim processing automation and FWA identification. From the moment a claim arrives to final adjudication, ENIGMA eliminates manual touchpoints, detects fraud, and ensures every rupee is paid right.
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

function ClaimsWorkflow() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">Claims Intelligence Workflow</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>End-to-end. Automated.<br />Every claim, every time.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            Five intelligent stages from claim receipt to final decision — no manual touchpoints in the standard flow.
          </p>
        </FadeUp>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
    </section>
  );
}

// ─── 5. OUTCOMES ─────────────────────────────────────────────────────────

function EnigmaOutcomes() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow">Business Outcomes</span>
          <h2 className="sec-title" style={{ maxWidth: '520px', margin: '0 auto' }}>Measurable impact from deployment.</h2>
          <p className="sec-sub" style={{ margin: '8px auto 0' }}>
            Built by practitioners. Proven across live deployments with health insurers and TPAs in India, UAE, and Saudi Arabia.
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

// ─── INLINE CTA ────────────────────────────────────────────────────────────

function EnigmaInlineCTA({ headline, sub, cta, href = '/contact?intent=demo' }: { headline: string; sub: string; cta: string; href?: string }) {
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

// ─── FINAL CTA ─────────────────────────────────────────────────────────────

function EnigmaFinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { v: '20+',            l: 'Years experience — model training on practitioner data' },
              { v: 'Live on 5Mn',    l: 'Annualised claims'  },
              { v: '7.5M+',          l: 'Clinical rules'     },
              { v: 'Multi-language', l: 'Support'            },
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
        <h2>See ENIGMA processing your claims in real time.</h2>
        <p>
          Our team will walk you through a demo built around your document types, languages, and fraud patterns — not a generic slide deck.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Book a Personalised Demo <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No commitment required', 'Tailored to your document types', 'Response within 24 hours'].map(t => (
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

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function EnigmaProductPage() {
  return (
    <main className="page">
      <EnigmaHero />
      <DocumentChallenge />
      <EnigmaInlineCTA
        headline="Recognise these problems? See how ENIGMA solves each one."
        sub="A 30-minute demo built around your document types, languages, and fraud patterns."
        cta="Book a Demo"
      />
      <EnigmaSolution />
      <ClaimsWorkflow />
      <EnigmaOutcomes />
      <EnigmaInlineCTA
        headline="See these outcomes applied to your claims portfolio."
        sub="Our team builds the ROI case around your actual claim volumes and document mix."
        cta="Book a Demo"
      />
      <EnigmaFinalCTA />
    </main>
  );
}
