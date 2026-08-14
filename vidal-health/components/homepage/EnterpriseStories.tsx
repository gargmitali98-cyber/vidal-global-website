'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Icon from '../ui/Icon';
import { caseStudies } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type CaseStudy = (typeof caseStudies)[number];

function MiniCard({ cs, onView }: { cs: CaseStudy; onView: () => void }) {
  return (
    <article className="cs-card cs-card--mini">
      <div className="cs-card-head">
        <div className="cs-head-top">
          <span className="cs-icon-badge"><Icon name={cs.icon} size={18} /></span>
          <span className="cs-category">{cs.category}</span>
        </div>
        <div className="cs-client">{cs.client}</div>
      </div>

      <div className="cs-mini-body">
        <p className="cs-mini-outcome">{cs.outcome}</p>

        <div className="cs-mini-kpis">
          {cs.kpis.slice(0, 2).map((kpi) => (
            <span className="cs-mini-kpi" key={kpi.label}>
              <Check size={12} strokeWidth={2.5} aria-hidden />
              {kpi.value}
            </span>
          ))}
        </div>

        <button type="button" className="cs-view-link" onClick={onView}>
          View full case study
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </article>
  );
}

function CaseDetail({ cs }: { cs: CaseStudy }) {
  return (
    <article className="cs-card cs-modal-card">
      <div className="cs-card-head">
        <div className="cs-head-top">
          <span className="cs-icon-badge"><Icon name={cs.icon} size={18} /></span>
          <span className="cs-category">{cs.category}</span>
        </div>
        <div className="cs-client">{cs.client}</div>
      </div>

      <div className="cs-body">
        <div className="cs-phase">
          <div className="cs-phase-label"><span className="cs-step">01</span>Challenge</div>
          <p className="cs-phase-text">{cs.challenge}</p>
        </div>

        <div className="cs-phase cs-phase--solution">
          <div className="cs-phase-label"><span className="cs-step">02</span>Solution</div>
          <p className="cs-phase-text">{cs.solution}</p>
        </div>

        <div className="cs-outcome-block">
          <div className="cs-outcome-label"><span className="cs-step cs-step--out">03</span>Outcome</div>
          <p className="cs-outcome-text">{cs.outcome}</p>
        </div>
      </div>

      <div className="cs-kpis">
        {cs.kpis.map((kpi) => (
          <div className="cs-kpi" key={kpi.label}>
            <span className="cs-kpi-chip">
              <Check size={16} strokeWidth={2.5} aria-hidden />
              {kpi.value}
            </span>
            <div className="cs-kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function EnterpriseStories() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? caseStudies[openIdx] : null;

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenIdx(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx]);

  return (
    <section className="section cs-section">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Client Success</span>
          <h2 className="sec-title">What it looks like in practice.</h2>
          <p className="sec-sub">
            Fraud reduction, claims automation, provider network consolidation — three deployments, three different starting points, one consistent outcome: the operation works differently.
          </p>
        </motion.div>

        <div className="cs-grid">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              <MiniCard cs={cs} onView={() => setOpenIdx(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="cs-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIdx(null)}
          >
            <motion.div
              className="cs-modal"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.client} case study`}
            >
              <button type="button" className="cs-modal-close" onClick={() => setOpenIdx(null)} aria-label="Close">
                <X size={18} />
              </button>
              <CaseDetail cs={active} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
