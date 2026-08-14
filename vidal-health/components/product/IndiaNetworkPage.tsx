'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle2, ArrowRight, Lock, Star,
  Shield, Zap, Clock, Users, Globe, Activity,
  Network, Search, Layers,
} from 'lucide-react';

const INA = '#007071';
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function FadeUp({ children, delay = 0, style = {}, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, ease, delay }}>
      {children}
    </motion.div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const whyIndiaPoints = [
  {
    stat: 'Growing', label: 'International patient flow into India', Icon: Globe,
    context: 'India is a leading medical tourism destination — significantly lower costs, world-class specialists, and zero language barrier for the diaspora.',
  },
  {
    stat: 'Extensive', label: 'Indian diaspora members covered by global health plans', Icon: Users,
    context: 'NRIs, expats returning home, and diaspora holding international plans all need India coverage. Without a local network, claims are reimbursement-only.',
  },
  {
    stat: 'Multi-year', label: 'effort to build a comparable network from scratch', Icon: Clock,
    context: 'Provider contracting, rate negotiations, credentialing, cashless setup, and technology integration — each takes years. Vidal has already done it.',
  },
];

const networkCategories = [
  { Icon: Layers,   label: 'Hospitals & Specialty',   count: '12,500+',       desc: 'Multi-specialty, super-specialty, and single-specialty hospitals. Includes NABH-accredited and CGHS-empanelled facilities for inpatient procedures.' },
  { Icon: Users,    label: 'Practicing Doctors',      count: '100,000+',      desc: 'General and specialist physicians for outpatient consultations, specialist referrals, and teleconsultation across all clinical disciplines.' },
  { Icon: Search,   label: 'Diagnostics & Pathology', count: 'Comprehensive', desc: 'Imaging centres, pathology labs, and NABL-accredited diagnostic facilities — cashless-enabled for seamless member experience.' },
  { Icon: Activity, label: 'Concierge & Support',     count: 'Dedicated',     desc: 'Health Concierge offering by Vidal — end-to-end care coordination, appointments, referrals, and wellness services for covered members.' },
];

const whyVidalCards = [
  { id: 'credentialed', Icon: Shield,  title: 'Pre-Credentialed Network',       desc: 'Every provider assessed against NABH/NABL standards and Vidal Health quality benchmarks. Your members access care immediately — no onboarding lag.', proof: 'Credentialed before onboarding' },
  { id: 'cashless',     Icon: Zap,     title: 'Cashless Infrastructure, Built', desc: 'Direct billing agreements, pre-auth protocols, and negotiated tariff schedules already live across our hospital network. Yours from day one — not negotiated from scratch.', proof: 'Direct billing agreements in place' },
  { id: 'relationships', Icon: Network, title: 'A Decade of Relationships',     desc: 'Provider trust, rate negotiations, and quality governance built over a decade. No new entrant can replicate this network — or these relationships — in months.', proof: 'A decade of relationships, impossible to shortcut' },
  { id: 'tech',         Icon: Globe,   title: 'Live Technology Layer',          desc: 'Real-time eligibility, digital pre-authorisation, e-claims submission, and a provider portal — operational the moment you go live.', proof: 'Real-time, no integration backlog' },
];

const activityPool = [
  { city: 'Mumbai',    event: 'Cashless Pre-Auth',   detail: 'Apollo Hospital — Cardiology',       time: '1 min ago' },
  { city: 'Delhi',     event: 'Specialist Referral', detail: 'Fortis — Neurology Consult',         time: '3 min ago' },
  { city: 'Bangalore', event: 'Diagnostic Auth',     detail: 'Manipal Diagnostics — MRI Brain',    time: '5 min ago' },
  { city: 'Chennai',   event: 'Emergency Cashless',  detail: 'MIOT International — ER Admission',  time: '7 min ago' },
  { city: 'Hyderabad', event: 'OP Consultation',     detail: 'Care Hospital — Internal Medicine',  time: '2 min ago' },
  { city: 'Pune',      event: 'Lab Authorization',   detail: 'SRL Diagnostics — Blood Panel',      time: '4 min ago' },
];

// ─── NETWORK STATUS VISUAL ─────────────────────────────────────────────────

function NetworkStatusVisual() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle(c => (c + 1) % activityPool.length), 3000);
    return () => clearInterval(id);
  }, []);

  const visibleActivity = [0, 1, 2, 3].map(j => activityPool[(cycle + j) % activityPool.length]);

  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['#EF4444', '#F59E0B', '#22C55E'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>India Network Access — Live</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 7px', borderRadius: '999px' }}>
          <div className="live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: '10px 14px 6px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Network Coverage</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
          {['North', 'South', 'West', 'East'].map(region => (
            <div key={region} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '7px 8px', border: '1px solid rgba(0,112,113,0.15)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>{region}</div>
              <div style={{ fontSize: '8.5px', fontWeight: 600, color: INA, marginTop: '1px' }}>Active</div>
              <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>Coverage active</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '6px 14px 8px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>Live Authorisations</div>
        <AnimatePresence mode="wait">
          <motion.div key={cycle}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}
          >
            {visibleActivity.map((a, i) => (
              <motion.div key={`${cycle}-${i}`}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: i * 0.06, ease }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: '7px', padding: '6px 9px', border: '1px solid rgba(255,255,255,0.04)', borderLeft: `2px solid ${INA}` }}
              >
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{a.city} — {a.event}</div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)' }}>{a.detail}</div>
                </div>
                <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.22)', flexShrink: 0, marginLeft: '8px' }}>{a.time}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ padding: '8px 14px 14px' }}>
        <div style={{ background: 'rgba(0,112,113,0.08)', border: '1px solid rgba(0,112,113,0.2)', borderRadius: '10px', padding: '10px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[{ v: 'Extensive', l: 'Network' }, { v: 'Pan-India', l: 'Coverage' }, { v: 'National', l: 'Reach' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: INA, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.35)', marginTop: '2px', fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COVERAGE HEATMAP ─────────────────────────────────────────────────────
// Coordinates are in the SVG's native viewBox space: 0 0 1000 1000. Recalibrated
// from each city's real latitude/longitude against the landmass's actual
// rendered bounding box in public/india.svg.svg (measured via getBBox: x 99.9,
// y 45.5, width 800.2, height 909.0) — the previous hand-approximated values
// drifted off the coastline/border for several cities (Bangalore, Bhopal,
// Indore, Mangalore) and put their dots outside the landmass outline.

const METRO_DOTS = [
  { name: 'Delhi',     cx: 349.5, cy: 310.7  },
  { name: 'Mumbai',    cx: 232.4, cy: 590.7  },
  { name: 'Bangalore', cx: 360.4, cy: 771.4  },
  { name: 'Chennai',   cx: 429.0, cy: 768.1  },
  { name: 'Hyderabad', cx: 384.5, cy: 641.4  },
  { name: 'Kolkata',   cx: 653.3, cy: 488.4  },
];

const T2_DOTS = [
  { name: 'Pune',        cx: 258.6, cy: 607.7 },
  { name: 'Ahmedabad',   cx: 223.8, cy: 474.9 },
  { name: 'Jaipur',      cx: 311.2, cy: 360.5 },
  { name: 'Lucknow',     cx: 451.6, cy: 362.2 },
  { name: 'Kochi',       cx: 324.2, cy: 860.8 },
  { name: 'Chandigarh',  cx: 338.0, cy: 247.9 },
  { name: 'Bhopal',      cx: 355.2, cy: 468.0 },
  { name: 'Nagpur',      cx: 400.9, cy: 530.3 },
  { name: 'Vizag',       cx: 513.3, cy: 632.2 },
  { name: 'Guwahati',    cx: 745.2, cy: 383.1 },
  { name: 'Patna',       cx: 565.6, cy: 399.4 },
];

const T3_DOTS = [
  { name: 'Amritsar',    cx: 286.1, cy: 221.4 },
  { name: 'Agra',        cx: 371.8, cy: 352.6 },
  { name: 'Varanasi',    cx: 506.6, cy: 407.3 },
  { name: 'Surat',       cx: 230.6, cy: 529.6 },
  { name: 'Indore',      cx: 313.0, cy: 483.9 },
  { name: 'Nashik',      cx: 256.7, cy: 564.1 },
  { name: 'Mysore',      cx: 334.3, cy: 791.0 },
  { name: 'Coimbatore',  cx: 343.3, cy: 828.7 },
  { name: 'Trivandrum',  cx: 342.4, cy: 902.4 },
  { name: 'Bhubaneswar', cx: 584.1, cy: 555.3 },
  { name: 'Mangalore',   cx: 286.3, cy: 774.2 },
  { name: 'Raipur',      cx: 470.1, cy: 527.3 },
  { name: 'Ranchi',      cx: 570.3, cy: 465.7 },
  { name: 'Jodhpur',     cx: 235.7, cy: 380.2 },
  { name: 'Udaipur',     cx: 253.7, cy: 429.2 },
  { name: 'Shimla',      cx: 348.7, cy: 237.0 },
  { name: 'Imphal',      cx: 805.0, cy: 422.0 },
  { name: 'Kohima',      cx: 809.8, cy: 397.1 },
  { name: 'PortBlair',   cx: 772.0, cy: 811.0 },
];

// Derived from METRO_DOTS by city name so the connector lines can never
// drift out of sync with the dot coordinates above.
const metroByName = Object.fromEntries(METRO_DOTS.map(d => [d.name, d]));
const CONN_PAIRS: [string, string][] = [
  ['Delhi', 'Kolkata'],
  ['Delhi', 'Hyderabad'],
  ['Mumbai', 'Bangalore'],
  ['Bangalore', 'Chennai'],
  ['Bangalore', 'Hyderabad'],
  ['Hyderabad', 'Chennai'],
  ['Hyderabad', 'Kolkata'],
  ['Delhi', 'Mumbai'],
];
const CONN_LINES: [number,number,number,number][] = CONN_PAIRS.map(([a, b]) => [
  metroByName[a].cx, metroByName[a].cy, metroByName[b].cx, metroByName[b].cy,
]);

function CoverageHeatmap() {
  return (
    <div style={{
      position: 'relative',
      height: '480px',
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
        <img
          src="/india.svg.svg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'brightness(0) saturate(100%) invert(45%) sepia(80%) saturate(400%) hue-rotate(155deg) brightness(0.7) opacity(0.55)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: '12px', boxSizing: 'border-box' }}
      >
        <defs>
          <filter id="glow-metro">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {CONN_LINES.map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" strokeDasharray="4 6"
          />
        ))}

        {/* One white dot per location, tier-agnostic. Three colours split the
            map into teal/amber/purple clusters, which read as three small,
            separate footprints instead of one dense national network — the
            opposite of the point this section makes. Size still varies a
            little so the map keeps depth, but the legend is gone: nothing on
            screen now needs decoding. */}
        {T3_DOTS.map((d, i) => (
          <motion.circle key={d.name}
            cx={d.cx} cy={d.cy} r={4.5}
            fill="#fff"
            style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.55 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease }}
          />
        ))}

        {T2_DOTS.map((d, i) => (
          <motion.circle key={d.name}
            cx={d.cx} cy={d.cy} r={6}
            fill="#fff"
            style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3, ease }}
          />
        ))}

        {METRO_DOTS.map((d, i) => (
          <g key={d.name}>
            <motion.circle
              cx={d.cx} cy={d.cy} r={14}
              fill="none" stroke="#fff" strokeWidth="1.2"
              style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 3.0, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={d.cx} cy={d.cy} r={8}
              fill="#fff"
              filter="url(#glow-metro)"
              style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.35, ease }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────────────────────

function INAHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner">
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">India Network Access — Vidal Health</span>,
            <h1 key="h1" className="display">
              India's healthcare<br />ecosystem.<br /><span className="hl">Day one access.</span>
            </h1>,
            <p key="p" className="hero-sub">
              Vidal Health has spent over a decade building India's most comprehensive healthcare provider network. Global insurers, TPAs, and assistance companies access it in weeks — not years.
            </p>,
            <div key="btns" className="hero-actions">
              <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                Discuss Network Access <ArrowRight size={14} />
              </Link>
            </div>,
          ].map((el, i) => (
            <motion.div key={i} variants={{ h: { opacity: 0, y: 14 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.44, ease }}>
              {el}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-visual" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease, delay: 0.18 }}>
          <NetworkStatusVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: '12,500+',   l: 'Hospitals (IP Network)'  },
            { v: '100,000+',  l: 'Practicing Doctors (OP)' },
            { v: 'Up to 30%', l: 'Cost Advantage'          },
            { v: 'Pan-India', l: 'Coverage'                },
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

// ─── 2. WHY INDIA ─────────────────────────────────────────────────────────

function WhyIndia() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow">Why India Matters to Global Health Plans</span>
        </FadeUp>

        <div className="outcome-row">
          {whyIndiaPoints.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.07} className="outcome-cell">
              <div style={{ padding: '0 20px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <span className="prob-icon"><item.Icon size={18} /></span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1, margin: '10px 0 8px' }}>{item.stat}</div>
                <div className="prob-title" style={{ fontSize: '13.5px' }}>{item.label}</div>
                <p className="prob-sub">{item.context}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. NETWORK AT SCALE ──────────────────────────────────────────────────

function NetworkAtScale() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">The Network</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>India's most comprehensive<br />provider network.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            Hospitals, clinics, diagnostics, and wellness — spanning every major Indian city and hundreds of towns across all tiers. No other international network comes close.
          </p>
        </FadeUp>

        <div className="pl-prod-grid-2" style={{ display: 'grid', gap: '16px' }}>
          <FadeUp delay={0.06}>
            <CoverageHeatmap />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {networkCategories.map(cat => (
                <div key={cat.label}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-md)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', color: 'var(--brand-lime)', flexShrink: 0 }}>
                    <cat.Icon size={17} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-lime)', letterSpacing: '-0.04em', lineHeight: 1 }}>{cat.count}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{cat.label}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{cat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── 4. WHY VIDAL ─────────────────────────────────────────────────────────

function WhyVidal() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">Why Vidal Health</span>
          <h2 className="sec-title" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>Built over a decade.<br />Impossible to replicate overnight.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            India's healthcare ecosystem runs on relationships, trust, and local knowledge. Vidal Health has spent a decade building exactly that — so you don't have to.
          </p>
        </FadeUp>

        <div className="why-grid why-grid--4">
          {whyVidalCards.map((card, i) => (
            <FadeUp key={card.id} delay={i * 0.07}>
              <div className="why-card">
                <div className="why-icon"><card.Icon size={22} /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--teal)' }}>{card.proof}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INLINE CTA ────────────────────────────────────────────────────────────

function INAInlineCTA({ headline, sub, cta, href = '/contact?intent=demo' }: { headline: string; sub: string; cta: string; href?: string }) {
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

function INAFinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {[
              { v: '12,500+',   l: 'Hospitals'          },
              { v: '100,000+',  l: 'Practicing Doctors' },
              { v: 'Up to 30%', l: 'Cost Advantage'     },
              { v: 'Pan-India', l: 'Coverage'           },
              { v: 'Rapid',     l: 'Go-live'            },
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
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(114,191,68,0.14)', border: '1px solid rgba(114,191,68,0.3)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--brand-lime)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '18px' }}>
          <Star size={9} fill="#72BF44" />
          India's most connected health network
        </span>
        <h2>Access India's healthcare ecosystem through Vidal Health.</h2>
        <p>
          Whether you're a global insurer, TPA, assistance company, or travel health plan — we'll walk you through the network, coverage map, and a go-live plan for your specific use case.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Discuss Network Access <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No lock-in, modular access', 'Rapid go-live deployment', 'Backed by a decade of India operations'].map(t => (
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

export default function IndiaNetworkPage() {
  return (
    <main className="page">
      <INAHero />
      <WhyIndia />
      <NetworkAtScale />
      <INAInlineCTA
        headline="Want to see the full network for your coverage geography?"
        sub="We'll walk you through provider density, cashless coverage, and specialty access for your key markets."
        cta="Request a Network Walkthrough"
      />
      <WhyVidal />
      <INAFinalCTA />
    </main>
  );
}
