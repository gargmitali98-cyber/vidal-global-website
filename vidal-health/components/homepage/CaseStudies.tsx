'use client';

import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { whyCards } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* The mid-page stats band was removed: it repeated the four hero stats
   verbatim (150M+ / 20+ / Pan-Asia / Enterprise), splitting attention
   without adding information. `statsBand` is still exported from
   content/homepage.ts if it needs to come back. */

export default function CaseStudies() {
  return (
    <>
      {/* Why Vidal */}
      <section className="section section-white">
        <div className="sec-in">
          <motion.div
            className="section-heading text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <span className="eyebrow">Why Vidal Health</span>
            <h2 className="sec-title">Why Vidal, not a generic platform.</h2>
            <p className="sec-sub">
              Most insurance technology was built to process transactions. Vidal was built to run the operation — with two decades of health insurance focus, and an architecture where every function shares the same intelligence layer.
            </p>
          </motion.div>

          <div className="why-grid">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="why-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <span className="why-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <div className="why-icon"><Icon name={card.icon} size={22} /></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
