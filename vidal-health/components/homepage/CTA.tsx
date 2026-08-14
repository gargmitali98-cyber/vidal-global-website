'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { homepageCta } from '../../content/homepage';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function CTA() {
  return (
    <div className="cta-band">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <h2>{homepageCta.title}</h2>
        <p>{homepageCta.description}</p>
        <div className="cta-btns">
          <Link href={homepageCta.primary.href} className="btn btn-teal btn-lg">
            {homepageCta.primary.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
