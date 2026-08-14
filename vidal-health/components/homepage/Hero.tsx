'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { heroContent } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const easeOut = [0.0, 0.0, 0.2, 1.0] as const;

// ── Data ──────────────────────────────────────────────────────
const claimsPool = [
  { id: 'CLM-00841', amt: '₹ 24,500',   status: 'approved',   label: 'Approved',   time: '0.3s' },
  { id: 'CLM-00842', amt: '₹ 1,12,000', status: 'approved',   label: 'Approved',   time: '0.4s' },
  { id: 'CLM-00843', amt: '₹ 8,200',    status: 'processing', label: 'Processing', time: '1.2s' },
  { id: 'CLM-00844', amt: '₹ 45,800',   status: 'approved',   label: 'Approved',   time: '0.3s' },
  { id: 'CLM-00845', amt: '₹ 72,000',   status: 'approved',   label: 'Approved',   time: '0.5s' },
  { id: 'CLM-00846', amt: '₹ 3,200',    status: 'processing', label: 'Processing', time: '0.9s' },
];

const kpis = [
  { v: '98%',  l: 'Auto-approve', color: '#72BF44' },
  { v: '0.2%', l: 'Fraud Rate',   color: '#F87171' },
  { v: '4.9★', l: 'CSAT Score',   color: '#FBBF24' },
];

const barHeights = [42, 58, 50, 75, 55, 90, 68, 85, 60, 96];

// Sparkline path for the mini-trend
const sparkPath = 'M 0,40 C 10,38 18,30 28,28 C 38,26 46,34 56,30 C 66,26 74,14 84,10 C 94,6 102,12 112,8 C 122,4 130,2 140,0';

// Particle positions (pre-generated, stable)
const PARTICLES = [
  { x: 12,  y: 18,  size: 1.5, dur: 8,  delay: 0   },
  { x: 28,  y: 72,  size: 1,   dur: 11, delay: 1.2 },
  { x: 45,  y: 35,  size: 2,   dur: 9,  delay: 2.5 },
  { x: 62,  y: 88,  size: 1.5, dur: 12, delay: 0.7 },
  { x: 78,  y: 22,  size: 1,   dur: 7,  delay: 3.1 },
  { x: 88,  y: 58,  size: 2,   dur: 10, delay: 1.8 },
  { x: 33,  y: 52,  size: 1,   dur: 13, delay: 4.0 },
  { x: 55,  y: 68,  size: 1.5, dur: 8,  delay: 2.2 },
  { x: 70,  y: 42,  size: 1,   dur: 11, delay: 0.4 },
  { x: 92,  y: 80,  size: 2,   dur: 9,  delay: 1.5 },
  { x: 18,  y: 90,  size: 1,   dur: 14, delay: 3.8 },
  { x: 82,  y: 10,  size: 1.5, dur: 10, delay: 2.9 },
];

// ── Sub-components ────────────────────────────────────────────

function LiveBadge() {
  return (
    <motion.span
      className="eyebrow"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease }}
    >
      {heroContent.badge}
    </motion.span>
  );
}

function HeroStats() {
  return (
    <motion.div
      className="hero-stats-band"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5, ease }}
    >
      <div className="hero-stats-row">
        {heroContent.stats.map((item, i) => (
          <div className="hs-cell" key={item.label}>
            {i > 0 && <div className="hs-divider" />}
            {/* No chevron here: these are static stats, not links, and the
                arrow read as a click affordance for something that isn't
                interactive. */}
            <div className="hs-num">{item.value}</div>
            <div className="hs-lbl">{item.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FloatingCard({ children, className, delay = 0, floatDir = 1 }: {
  children: React.ReactNode;
  className: string;
  delay?: number;
  floatDir?: number;
}) {
  return (
    <motion.div
      className={`hv-float ${className}`}
      initial={{ opacity: 0, y: 20 * floatDir, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: easeOut }}
    >
      <motion.div
        animate={{ y: [0, -5 * floatDir, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Dashboard({ claimCycle }: { claimCycle: number }) {
  const visibleClaims = [0, 1, 2].map(j => claimsPool[(claimCycle + j) % claimsPool.length]);

  return (
    <div className="hv-dashboard">
      {/* Top accent bar */}
      <div className="hv-dash-accent" />

      {/* Window chrome */}
      <div className="hv-dash-chrome">
        <div className="hv-chrome-dots">
          <span className="hv-dot red" /><span className="hv-dot amber" /><span className="hv-dot green" />
        </div>
        <span className="hv-dash-title">Claims Intelligence · Live View</span>
        <span className="hv-live-chip">
          <span className="dash-live-dot" />LIVE
        </span>
      </div>

      {/* Big metric + sparkline */}
      <div className="hv-metric-row">
        <div className="hv-metric-left">
          <motion.div
            className="hv-big-num"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            14,392
          </motion.div>
          <div className="hv-metric-label">Claims Processed Today</div>
          <div className="hv-trend">
            <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1,8 5,2 9,5" fill="none" stroke="#72BF44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ↑ 9.2% vs yesterday
          </div>
        </div>
        <div className="hv-sparkline">
          <svg viewBox="0 0 140 44" preserveAspectRatio="none" style={{ width: '100%', height: '44px' }}>
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,112,113,0.35)" />
                <stop offset="100%" stopColor="rgba(0,112,113,0)" />
              </linearGradient>
            </defs>
            <path d={sparkPath + ' L 140,44 L 0,44 Z'} fill="url(#sparkGrad)" />
            <motion.path
              d={sparkPath}
              fill="none"
              stroke="#007071"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 1.2, ease: easeOut }}
            />
          </svg>
        </div>
      </div>

      {/* Bar chart */}
      <div className="hv-chart">
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            className={`hv-bar${h >= 85 ? ' peak' : ''}`}
            style={{ height: `${h}%`, transformOrigin: 'bottom' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7 + i * 0.04, duration: 0.4, ease }}
          />
        ))}
      </div>

      {/* KPI row */}
      <div className="hv-kpis">
        {kpis.map((k, i) => (
          <motion.div
            key={k.l}
            className="hv-kpi"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 + i * 0.08, duration: 0.3, ease }}
          >
            <div className="hv-kpi-v" style={{ color: k.color }}>{k.v}</div>
            <div className="hv-kpi-l">{k.l}</div>
          </motion.div>
        ))}
      </div>

      {/* Live claim feed */}
      <div className="hv-feed-label">Recent activity</div>
      <div className="hv-claims">
        <AnimatePresence mode="popLayout">
          {visibleClaims.map((c, i) => (
            <motion.div
              key={`${claimCycle}-${i}`}
              className="hv-claim"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: i * 0.06, duration: 0.22, ease }}
              layout
            >
              <span className="hv-claim-id">{c.id}</span>
              <span className="hv-claim-amt">{c.amt}</span>
              <span className="hv-claim-time">{c.time}</span>
              <span className={`hv-claim-status ${c.status}`}>{c.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export default function Hero() {
  const [claimCycle, setClaimCycle] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, 60]);
  const contentY = useTransform(scrollY, [0, 400], [0, -20]);
  const visualY = useTransform(scrollY, [0, 400], [0, -40]);

  useEffect(() => {
    const id = setInterval(() => setClaimCycle(c => (c + 1) % claimsPool.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" ref={ref}>
      {/* ── Background layers ──────────────────────── */}
      {/* Dot grid */}
      <div className="hero-bg-grid" />

      {/* Radial glow — center-left */}
      <motion.div className="hero-bg-glow-left" style={{ y: bgY }} />
      {/* Radial glow — top-right */}
      <motion.div className="hero-bg-glow-right" style={{ y: bgY }} />

      {/* Ambient particles */}
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="hero-particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
            animate={{ opacity: [0, 0.6, 0], y: [-6, 6, -6] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div className="hero-inner">

        {/* Left column */}
        <motion.div className="hero-content" style={{ y: contentY }}>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge */}
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45, ease }}>
              <LiveBadge />
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="display"
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
            >
              Adopt solutions built by{' '}
              <span className="hl hero-hl-glow">practitioners.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-sub"
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease }}
            >
              {heroContent.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-actions"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
            >
              <Link href={heroContent.primaryCta.href} className="btn btn-teal btn-lg">
                {heroContent.primaryCta.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link href={heroContent.secondaryCta.href} className="btn btn-outline btn-lg">
                {heroContent.secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Right column — Visual */}
        <motion.div
          className="hero-visual"
          style={{ y: visualY }}
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.25 }}
        >
          {/* Glow behind the card */}
          <div className="hv-glow-behind" />

          {/* Floating pill — top */}
          <FloatingCard className="hv-fc-top" delay={0.7} floatDir={-1}>
            <div className="hv-fc-inner">
              <div className="hv-fc-icon teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div>
                <div className="hv-fc-val">99.9%</div>
                <div className="hv-fc-lbl">Platform Uptime</div>
              </div>
            </div>
          </FloatingCard>

          {/* Main dashboard */}
          <Dashboard claimCycle={claimCycle} />

          {/* Floating pill — bottom */}
          <FloatingCard className="hv-fc-bottom" delay={0.9} floatDir={1}>
            <div className="hv-fc-inner">
              <div className="hv-fc-icon green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="hv-fc-val">$2.3M</div>
                <div className="hv-fc-lbl">Fraud Recovered (YTD)</div>
              </div>
            </div>
          </FloatingCard>
        </motion.div>
      </div>

      {/* Stats band — closes the first fold, full width. */}
      <HeroStats />
    </section>
  );
}
