'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { solutionCards } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Products() {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Find Your Solution</span>
          <h2 className="sec-title">What brings you here?</h2>
          <p className="sec-sub">
            Select your challenge — we'll take you straight to the right solution.
          </p>
        </motion.div>

        <div className="prob-grid">
          {solutionCards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
            >
              <Link href={item.href} className="prob-card">
                <span className="prob-icon"><Icon name={item.icon} size={18} /></span>
                <div className="prob-title">{item.title}</div>
                <div className="prob-sub">{item.description}</div>
                <span className="prob-arrow">Explore →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
