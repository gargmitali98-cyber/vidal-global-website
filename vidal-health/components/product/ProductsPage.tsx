'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import { productOverview, productCards } from '../../content/products';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function ProductsPage() {
  const sections = Array.from(new Set(productCards.map((item) => item.section)));

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: '64px' }}>
        <div className="ph-bg" />
        <div className="ph-grid" />
        <div className="ph-in">
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span className="cur">All Products</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.07 }}
            >
              {productOverview.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.14 }}
            >
              {productOverview.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="sec-in">
          {sections.map((sectionName, si) => (
            <motion.div
              key={sectionName}
              className="product-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: si * 0.05 }}
            >
              <span className="eyebrow">{sectionName}</span>
              <div className="prod-grid">
                {productCards
                  .filter((card) => card.section === sectionName)
                  .map((card, ci) => (
                    <motion.div
                      key={card.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease, delay: ci * 0.07 }}
                    >
                      <Link href={card.href} className="pcard" style={{ display: 'block', height: '100%' }}>
                        <div className="pcard-icon"><Icon name={card.icon} size={20} /></div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <div className="pcard-link">Learn More →</div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <h2>Not sure where to start?</h2>
          <p>Our team will help you identify the right product for your needs</p>
          <div className="cta-btns">
            <a className="btn btn-teal btn-lg" href="/contact?intent=demo">
              Book a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
