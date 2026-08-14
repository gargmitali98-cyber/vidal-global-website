'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { productHeroCta } from '../../content/products';
import type { ProductDetail } from '../../types';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function ProductHero({ product }: { product: ProductDetail }) {
  return (
    <section className="page-hero">
      <div className="ph-bg" />
      <div className="ph-grid" />
      <div className="ph-in">
        <div className="prod-hero-grid">

          {/* Left: text */}
          <motion.div
            className="prod-hero-left"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.span
              className="eyebrow"
              style={{ marginBottom: '14px', marginTop: '4px' }}
              variants={fadeUp}
              transition={{ duration: 0.45, ease }}
            >
              {product.tag}
            </motion.span>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.5, ease }}>
              {product.title}
            </motion.h1>

            <motion.p
              style={{ marginTop: '16px' }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease }}
            >
              {product.desc}
            </motion.p>

            <motion.div
              className="prod-hero-actions"
              variants={fadeUp}
              transition={{ duration: 0.45, ease }}
            >
              <Link href={productHeroCta.primary.href} className="btn btn-teal">
                {productHeroCta.primary.label}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: metrics card */}
          <motion.div
            className="prod-metrics"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--subtle)', marginBottom: '4px' }}>
              {product.tag} · Key Metrics
            </p>
            {product.metrics.map((metric, i) => (
              <motion.div
                className="pm-item"
                key={metric.l}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.07 }}
              >
                <div className="pm-v">{metric.v}</div>
                <div className="pm-l">{metric.l}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
