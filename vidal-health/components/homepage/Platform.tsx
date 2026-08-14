'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { featureRows } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Platform() {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="eyebrow">Platform Capabilities</span>
          <h2 className="sec-title">Modular by design. Connected by intelligence.</h2>
          <p className="sec-sub">
            Every Vidal product solves a specific problem on its own. Deployed together, they share data and decision context across every workflow — compounding value that disconnected systems can never produce.
          </p>
        </motion.div>

        {featureRows.map((feature, index) => {
          const maxBar = Math.max(...feature.visual.bars);
          return (
            /* A top divider (except row 1) plus the row index carried through
               into the card chrome below give each product its own clearly
               bounded block, instead of every row bleeding into the next
               with nothing marking where one product's story ends and the
               next begins. */
            <div key={feature.tag} className={`feat-row${index > 0 ? ' feat-row--divided' : ''}`}>

              {/* Content column — every row keeps the same side, so scanning
                  down the page doesn't require re-orienting row to row. */}
              <motion.div
                className="feat-c"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="feat-tag">
                  <span className="feat-tag-idx">{String(index + 1).padStart(2, '0')}</span>
                  {feature.tag}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feat-bullets">
                  {feature.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <Link href={feature.cta.href} className="btn btn-dark">
                  {feature.cta.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </motion.div>

              {/* Visual column — a single dark stat card carries the row now;
                  the photo it used to sit on top of has been dropped. The
                  trend line and bar chart were already in the content data
                  but never rendered — surfacing them gives the card enough
                  substance to hold its own next to the copy column instead
                  of floating, under-filled, in the middle of it. */}
              <motion.div
                className="feat-v"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
              >
                <div className="fv-stat">
                  <div className="fv-lbl">{feature.visual.label}</div>
                  <div className="fv-big">{feature.visual.value}</div>
                  <div className="fv-meta">{feature.visual.meta}</div>
                  <div className="fv-trend">{feature.visual.trend}</div>
                  <div className="fv-chart">
                    {feature.visual.bars.map((h, i) => (
                      <div
                        key={i}
                        className={`fv-bar${h === maxBar ? ' peak' : ''}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="fv-kpis">
                    {feature.visual.kpis.map((kpi) => (
                      <div className="fv-kpi" key={kpi.label}>
                        <div className="fv-kpi-v">{kpi.value}</div>
                        <div className="fv-kpi-l">{kpi.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}

        <div className="text-center">
          <Link href="/products" className="btn btn-outline">
            View the full product stack →
          </Link>
        </div>
      </div>
    </section>
  );
}
