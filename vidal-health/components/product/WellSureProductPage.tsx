'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Heart, Activity, Brain, Award,
  FileText, ShoppingBag, CheckCircle2, ArrowRight,
  Star, Users, Shield, TrendingDown,
} from 'lucide-react';

const WS = '#007071';
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div style={style} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, ease, delay }}>
      {children}
    </motion.div>
  );
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const liveActivity = [
  { action: 'Health Screening', detail: 'Annual check-up completed',   time: '2 min ago'  },
  { action: 'Step Challenge',   detail: 'Daily activity goal achieved', time: '5 min ago'  },
  { action: 'Nutrition Log',    detail: 'Balanced meal tracked',       time: '8 min ago'  },
  { action: 'MindSure Session', detail: 'Wellness check-in completed', time: '11 min ago' },
];

const challenges = [
  { bigLabel: 'Low',      sublabel: 'Member engagement',        title: 'Wellness Programmes That Miss Members',    desc: 'Most wellness benefits go undiscovered. Without personalisation or incentives, members don\'t engage.', Icon: Users },
  { bigLabel: 'Reactive', sublabel: 'Healthcare spending',      title: 'Spend That Follows Illness, Not Prevention', desc: 'Claims budgets absorb acute admissions that earlier intervention could have avoided.', Icon: TrendingDown },
  { bigLabel: 'Poor',     sublabel: 'Programme participation',  title: 'Wellness Benefits Left Unused',            desc: 'Fragmented, hard-to-access benefits are rarely activated — making ROI invisible to payers and employers.', Icon: Activity },
  { bigLabel: 'Rising',   sublabel: 'Chronic disease burden',   title: 'Preventable Conditions Driving Claims',    desc: 'Diabetes, hypertension, and obesity are the fastest-growing hospitalisation drivers. Prevention requires earlier engagement.', Icon: Heart },
];

const pillars = [
  { id: 'engage',  label: 'Engage',  Icon: Users,  headline: 'Meet members where they are.', desc: 'Personalised wellness programmes delivered through a mobile-first platform — connecting members to the right programme at the right moment, in the right language.' },
  { id: 'prevent', label: 'Prevent', Icon: Shield, headline: 'Intervene before the claim.',   desc: 'From chronic disease management to preventive screenings, WellSure shifts healthcare from reactive treatment to proactive risk reduction across covered populations.' },
  { id: 'reward',  label: 'Reward',  Icon: Award,  headline: 'Incentivise every healthy action.', desc: 'Health Coins reward programme completions, screenings, and daily habits — creating a self-reinforcing engagement loop that sustains participation over time.' },
];

// Every module across every category, flattened into one scannable grid —
// each card carries its own category tag so the grouping isn't lost, but
// nothing is gated behind a click-through tab switcher.
const ecosystemModules = [
  { category: 'Body & Fitness',      CatIcon: Activity,    name: 'FitSure',           desc: 'Step challenges, fitness goals, activity streaks, and workout programmes personalised to member health profiles and risk levels.' },
  { category: 'Body & Fitness',      CatIcon: Activity,    name: 'NutriSure',         desc: 'Nutrition tracking, meal logging, dietary guidance, and food quality assessment — integrated with wellness goals and health outcomes.' },
  { category: 'Body & Fitness',      CatIcon: Activity,    name: 'ActivSure',         desc: 'Activity challenges, group fitness events, and gamified movement programmes for sustained physical engagement across large populations.' },
  { category: 'Mind & Wellbeing',    CatIcon: Brain,       name: 'MindSure',          desc: 'Stress management, guided meditation, sleep tracking, and mental wellness assessments — designed for insured and employee populations at scale.' },
  { category: 'Mind & Wellbeing',    CatIcon: Brain,       name: 'QuitSure',          desc: 'Structured smoking cessation programmes with behavioural coaching, progress milestones, and incentive-linked rewards for sustained abstinence.' },
  { category: 'Protective Care',     CatIcon: Shield,      name: 'ChroniCare',        desc: 'Ongoing management programmes for diabetes, hypertension, and other chronic conditions — reducing hospitalisation risk through continuous, structured engagement.' },
  { category: 'Protective Care',     CatIcon: Shield,      name: 'Weight Management', desc: 'Clinically guided weight management combining nutrition targets, activity goals, and behavioural coaching with measurable outcome tracking at the population level.' },
  { category: 'Health Management',   CatIcon: FileText,    name: 'Smart Reports',     desc: 'AI-powered interpretation of diagnostic and lab reports — surfacing health risk signals, trends, and actionable next steps for members and care managers.' },
  { category: 'Health Management',   CatIcon: FileText,    name: 'Health Files',      desc: 'Centralised personal health record management — aggregating lab reports, prescriptions, screening results, and care history in one accessible member view.' },
  { category: 'Marketplace',         CatIcon: ShoppingBag, name: 'Smart Devices',     desc: 'Curated wearables and health monitoring devices accessible through WellSure — enabling passive health tracking and integration with wellness programme goals.' },
  { category: 'Marketplace',         CatIcon: ShoppingBag, name: 'Memberships',       desc: 'Gym, fitness studio, and wellness centre memberships accessible through the platform for sustained physical health engagement across geographies.' },
  { category: 'Marketplace',         CatIcon: ShoppingBag, name: 'Care Programmes',   desc: 'Specialist care programmes — physiotherapy, preventive screenings, and rehabilitation — accessible through a single, integrated member experience.' },
  { category: 'Rewards Engine',      CatIcon: Award,       name: 'Health Coins',      desc: 'A unified currency for all wellness actions — steps logged, screenings completed, challenges finished, and healthy behaviours rewarded with redeemable coins.' },
  { category: 'Rewards Engine',      CatIcon: Award,       name: 'Rewards Engine',    desc: 'A configurable rules engine for insurers and employers — tie rewards to specific outcomes, programme completions, and biometric milestones. Fully whitelabelled.' },
];

const outcomeItems = [
  { title: 'Measurably higher programme participation', desc: 'More members actively engaged across fitness, nutrition, mental health, and preventive care programmes — not just enrolled.', Icon: Users },
  { title: 'Preventive care becomes the default',        desc: 'Screenings, check-ups, and early interventions driven by the platform — shifting member behaviour before conditions worsen.', Icon: Shield },
  { title: 'Sustained engagement through rewards',       desc: 'Health Coins create a self-reinforcing loop — every wellness action is recognised, and recognition sustains participation.', Icon: Award },
  { title: 'Lower hospitalisation risk over time',       desc: 'Chronic disease management, weight management, and behavioural coaching programmes reduce the acute risk profile of covered populations.', Icon: TrendingDown },
  { title: 'Reduced long-term claims burden',            desc: 'Preventive engagement translates into lower IP claims — measurable at the cohort level for payers and self-insured employers.', Icon: Heart },
];

// ─── HERO VISUAL ─────────────────────────────────────────────────────────────

function WellSureHeroVisual() {
  return (
    <div style={{ background: 'var(--navy)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(1,46,47,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['#EF4444', '#F59E0B', '#22C55E'].map(c => <div key={c} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />)}
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>WellSure — Member Engagement</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,112,113,0.12)', border: '1px solid rgba(0,112,113,0.2)', padding: '2px 7px', borderRadius: '999px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#23B5C9' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#23B5C9', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: '12px 14px 6px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
        {[
          { v: 'Up to 60%', l: 'Engagement rate', t: 'Unique members'    },
          { v: '1,247',     l: 'Active today',      t: 'Across programmes' },
          { v: '28,400',    l: 'Coins earned',      t: 'This month'        },
        ].map(k => (
          <div key={k.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '9px 10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: k.v.length > 5 ? '0.82rem' : '1.05rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)', margin: '2px 0 1px' }}>{k.l}</div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--brand-lime)' }}>{k.t}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '6px 14px 14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Live Activity</div>
        {liveActivity.map((a, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, delay: 0.42 + i * 0.09, ease }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', borderRadius: '7px', padding: '7px 9px', border: '1px solid rgba(255,255,255,0.04)', borderLeft: `2px solid ${WS}` }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.68)' }}>{a.action}</span>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{a.detail}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.22)' }}>{a.time}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '999px', background: 'rgba(114,191,68,0.14)', color: 'var(--brand-lime)' }}>Done</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── 1. HERO ─────────────────────────────────────────────────────────────────

function WellSureHero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow-left" />
      <div className="hero-bg-glow-right" />

      <div className="hero-inner">
        <motion.div className="hero-content" variants={{ s: { transition: { staggerChildren: 0.08 } } }} initial="h" animate="s">
          {[
            <span key="badge" className="eyebrow">Wellness &amp; Engagement Platform — Vidal Health</span>,
            <h1 key="h1" className="display">
              Preventive health.<br />Higher engagement.<br /><span className="hl">Lower claims costs.</span>
            </h1>,
            <p key="p" className="hero-sub">
              WellSure is Vidal Health's enterprise wellness platform — helping insurers and employers drive preventive care adoption, build lasting health habits, and reduce long-term claims costs through unified member engagement.
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
          <WellSureHeroVisual />
        </motion.div>
      </div>

      <div className="hero-stats-band">
        <div className="hero-stats-row">
          {[
            { v: 'Up to 5%',  l: 'IP Cost Reduction'   },
            { v: 'Up to 60%', l: 'Engagement Rate'     },
            { v: 'Payer',     l: 'Enterprise Platform' },
            { v: 'Unified',   l: 'Rewards Engine'      },
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

// ─── 2. CHALLENGE ─────────────────────────────────────────────────────────────

function WellSureChallenge() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">The Challenge</span>
              <h2 className="sec-title" style={{ margin: 0 }}>Why wellness initiatives<br />fail to move the needle.</h2>
            </div>
            <p className="sec-sub" style={{ maxWidth: '380px', margin: 0 }}>
              Most payer and employer wellness programmes underdeliver — not from lack of intent, but from the absence of architecture, personalisation, and sustained engagement.
            </p>
          </div>
        </FadeUp>

        <div className="prob-grid prob-grid--2">
          {challenges.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.07}>
              <div className="prob-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span className="prob-icon" style={{ marginBottom: 0 }}><p.Icon size={18} /></span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.03em', flexShrink: 0 }}>{p.bigLabel}</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>{p.sublabel}</div>
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

// ─── 3. SOLUTION ─────────────────────────────────────────────────────────────

function WellSureSolution() {
  return (
    <section className="impl-section">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow eyebrow-light">The WellSure Platform</span>
          <h2 className="sec-title sec-title-light" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>Engage. Prevent. Reward.</h2>
          <p className="sec-sub sec-sub-light" style={{ margin: '0 auto' }}>
            WellSure creates a virtuous cycle — engagement drives preventive behaviour, preventive behaviour reduces acute risk, and rewards sustain the habits that make it sustainable.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="pl-prod-grid-3" style={{ display: 'grid', gap: '12px', maxWidth: '900px', margin: '0 auto 24px' }}>
            {pillars.map((pillar, i) => (
              <div key={pillar.id} style={{ position: 'relative' }}>
                {i < pillars.length - 1 && (
                  <div style={{ position: 'absolute', right: '-7px', top: '44px', zIndex: 2 }}>
                    <ArrowRight size={13} style={{ color: 'rgba(255,255,255,0.14)' }} />
                  </div>
                )}
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-md)', padding: '24px 22px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', color: 'var(--brand-lime)' }}>
                      <pillar.Icon size={17} />
                    </div>
                    <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--brand-lime)', letterSpacing: '-0.03em' }}>{pillar.label}</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '8px', lineHeight: 1.3 }}>{pillar.headline}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.10em', flexShrink: 0 }}>Platform connects to</div>
            {['Vidal Health Provider Network', 'Claims & ENIGMA', 'Member Mobile App', 'Insurer Analytics', 'Employer HR Systems'].map(tag => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,112,113,0.08)', border: '1px solid rgba(0,112,113,0.14)', borderRadius: '999px', padding: '4px 11px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--brand-lime)', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.52)' }}>{tag}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── 4. PRODUCT ECOSYSTEM — tabbed by category, one screen at a time ──────

function WellSureEcosystem() {
  const categories = Array.from(new Set(ecosystemModules.map(m => m.category)));
  const [active, setActive] = useState(0);
  const activeCategory = categories[active];
  const mods = ecosystemModules.filter(m => m.category === activeCategory);
  const ActiveIcon = mods[0].CatIcon;

  return (
    <section className="section section-white">
      <div className="sec-in">
        <FadeUp style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="eyebrow">Product Ecosystem</span>
          <h2 className="sec-title" style={{ maxWidth: '600px', margin: '0 auto 12px' }}>Every dimension of health.<br />One integrated platform.</h2>
          <p className="sec-sub" style={{ margin: '0 auto' }}>
            Six programme categories. One rewards layer. A unified engagement experience for members and a single view for payers and employers.
          </p>
        </FadeUp>

        <FadeUp style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {categories.map((category, ci) => {
            const CatIcon = ecosystemModules.find(m => m.category === category)!.CatIcon;
            const isActive = ci === active;
            return (
              <button
                key={category}
                onClick={() => setActive(ci)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  fontSize: '13px', fontWeight: 700,
                  color: isActive ? 'white' : 'var(--navy)',
                  background: isActive ? 'var(--teal)' : 'var(--surface-highlight)',
                  border: `1px solid ${isActive ? 'var(--teal)' : 'var(--border)'}`,
                  borderRadius: '999px', padding: '9px 16px 9px 12px',
                  cursor: 'pointer', transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                <CatIcon size={15} />
                {category}
              </button>
            );
          })}
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span className="prob-icon" style={{ marginBottom: 0, width: '32px', height: '32px' }}><ActiveIcon size={16} /></span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{activeCategory}</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '12px', color: 'var(--muted)', flexShrink: 0 }}>{mods.length} module{mods.length > 1 ? 's' : ''}</span>
            </div>
            <div className="why-grid">
              {mods.map(mod => (
                <div key={mod.name} className="why-card">
                  <h3>{mod.name}</h3>
                  <p>{mod.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── 5. OUTCOMES ─────────────────────────────────────────────────────────────

function RingStat({ pct, color }: { pct: number; color: string }) {
  const r = 30, c = 2 * Math.PI * r;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--border)" strokeWidth="7" />
      <circle
        cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} transform="rotate(-90 36 36)"
      />
    </svg>
  );
}

function WellSureOutcomes() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <FadeUp style={{ marginBottom: '36px' }}>
          <span className="eyebrow">Business Outcomes</span>
          <h2 className="sec-title" style={{ margin: 0 }}>Wellness that shows up<br />on the balance sheet.</h2>
        </FadeUp>

        <div className="ws-outcomes-split" style={{ display: 'grid', gap: '32px', alignItems: 'start' }}>
          <div className="pl-prod-grid-2" style={{ display: 'grid', gap: '16px' }}>
            {outcomeItems.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px', height: '100%' }}>
                  <span className="icon-row-icon" style={{ marginBottom: '12px' }}><item.Icon size={18} /></span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--heading)', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { pct: 60, v: 'Up to 60%', label: 'Unique Engagement Rate', desc: 'Unique members actively participating in at least one wellness programme — a direct indicator of platform adoption and sustained behaviour change.', color: WS },
                { pct: 5,  v: 'Up to 5%',  label: 'Reduction in IP Costs',  desc: 'Impact on inpatient claims costs attributable to sustained preventive engagement, chronic disease management, and early intervention programmes.', color: 'var(--brand-lime)' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', gap: '18px', alignItems: 'center', paddingTop: i > 0 ? '28px' : 0, marginTop: i > 0 ? '28px' : 0, borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <RingStat pct={s.pct} color={s.color} />
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>{s.v}</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--heading)', marginBottom: '6px' }}>{s.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.55 }}>{s.desc}</div>
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

// ─── INLINE CTA ───────────────────────────────────────────────────────────────

function WellSureInlineCTA({ headline, sub }: { headline: string; sub: string }) {
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
        <Link href="/contact?intent=demo" className="btn btn-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          Book a Demo <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────

function WellSureFinalCTA() {
  return (
    <section className="cta-band">
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px', marginBottom: '40px' }}>
        <FadeUp>
          <div className="stat-strip stat-strip--dark" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '20px' }}>
            {[
              { v: 'Up to 60%', l: 'Engagement rate'  },
              { v: 'Up to 5%',  l: 'IP cost impact'   },
              { v: 'Unified',   l: 'Rewards engine'   },
              { v: 'Payer',     l: 'Enterprise-grade' },
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
          Enterprise wellness, built for outcomes
        </span>
        <h2>See WellSure working across your member population.</h2>
        <p>
          Our solutions team will walk you through a demo tailored to your member demographics, coverage model, and wellness goals — no generic slides.
        </p>
        <div className="cta-btns">
          <Link href="/contact?intent=demo" className="btn btn-teal btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            Book a Demo <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
          {['No commitment required', 'Tailored to your population', 'Response within 24 hours'].map(t => (
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function WellSureProductPage() {
  return (
    <main className="page">
      <WellSureHero />
      <WellSureChallenge />
      <WellSureInlineCTA
        headline="Recognise any of this? See how WellSure addresses each challenge."
        sub="A 30-minute demo built around your member population and wellness goals."
      />
      <WellSureSolution />
      <WellSureEcosystem />
      <WellSureInlineCTA
        headline="Want to see the full ecosystem in action?"
        sub="We'll walk through the programmes most relevant to your coverage model and member demographics."
      />
      <WellSureOutcomes />
      <WellSureFinalCTA />
    </main>
  );
}
