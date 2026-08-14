'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';

interface ContactPageProps {
  isDemo?: boolean;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const OFFICES = [
  { city: 'Bangalore', hq: true },
  { city: 'Dubai', hq: false },
  { city: 'Doha', hq: false },
  { city: 'Muscat', hq: false },
];

export default function ContactPage({ isDemo = false }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);

  const headline = isDemo ? 'Schedule a product demo.' : "Let's talk.";
  const headlineHl = isDemo ? 'demo.' : 'talk.';
  const headlinePrefix = isDemo ? 'Schedule a product ' : "Let's ";
  const subline = isDemo
    ? "Tell us about your organisation. We'll arrange a focused walkthrough with our solutions team — tailored to your operations."
    : "Whether you're evaluating the platform or have a specific question, our enterprise solutions team responds within one business day.";
  const formTitle = isDemo ? 'Request a Demo' : 'Send a Message';
  const submitText = isDemo ? 'Request Demo' : 'Send Message';
  const placeholder = isDemo
    ? "Tell us about your use case and what you'd like to see in the demo."
    : 'How can we help you?';

  if (submitted) {
    return (
      <section className="section section-white" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="sec-in" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="why-icon" style={{ margin: '0 auto 20px' }}>
              <Icon name="ShieldCheck" size={22} />
            </div>
            <h2 className="sec-title" style={{ marginTop: 0 }}>Message received</h2>
            <p className="sec-sub" style={{ margin: '0 auto 28px' }}>
              {isDemo
                ? "We'll be in touch within one business day to confirm your demo and share a prep note."
                : 'Our team will respond within one business day.'}
            </p>
            <Link href="/" className="btn btn-teal btn-lg">
              Back to Home
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section section-white" style={{ paddingBottom: '32px' }}>
        <div className="sec-in">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="eyebrow">{isDemo ? 'Demo Request' : 'Get in Touch'}</span>
            <h1 className="display">
              {headlinePrefix}<span className="hl">{headlineHl}</span>
            </h1>
            <p className="hero-sub" style={{ marginBottom: '20px' }}>{subline}</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: 'var(--muted)', fontSize: '14px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                <Icon name="Clock" size={15} className="icon-row-link" />
                Responds within 1 business day
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                <Icon name="Mail" size={15} className="icon-row-link" />
                insurtech@vidalhealth.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section section-white" style={{ paddingTop: '32px' }}>
        <div className="sec-in">
          <div className="contact-grid">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <div className="contact-form-panel">
                <h2 className="sec-title" style={{ fontSize: '1.375rem', margin: '0 0 24px' }}>{formTitle}</h2>

                <form
                  style={{ display: 'grid', gap: '20px' }}
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <div className="form-row">
                    <div className="form-g">
                      <label className="form-lbl">First Name <span>*</span></label>
                      <input className="form-in" type="text" placeholder="First name" id="c-fn" required />
                    </div>
                    <div className="form-g">
                      <label className="form-lbl">Last Name</label>
                      <input className="form-in" type="text" placeholder="Last name" id="c-ln" />
                    </div>
                  </div>

                  <div className="form-g">
                    <label className="form-lbl">Work Email <span>*</span></label>
                    <input className="form-in" type="email" placeholder="you@company.com" id="c-em" required />
                  </div>

                  <div className="form-g">
                    <label className="form-lbl">Company</label>
                    <input className="form-in" type="text" placeholder="Your organisation" id="c-co" />
                  </div>

                  <div className="form-g">
                    <label className="form-lbl">Topic</label>
                    <select className="form-in" id="c-su" defaultValue={isDemo ? 'Book a Demo' : ''}>
                      <option value="">Select a topic...</option>
                      <option>Book a Demo</option>
                      <option>Product Inquiry</option>
                      <option>Partnership</option>
                      <option>Technical Support</option>
                      <option>Pricing</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div className="form-g">
                    <label className="form-lbl">Message <span>*</span></label>
                    <textarea className="form-in" id="c-ms" rows={4} placeholder={placeholder} required />
                  </div>

                  <div>
                    <button className="form-submit" type="submit">
                      {submitText}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                    <p className="form-note" style={{ marginTop: '12px' }}>
                      Your information is only used to respond to your enquiry.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <div className="icon-row-list">
                <div className="icon-row">
                  <span className="icon-row-icon"><Icon name="Mail" size={18} /></span>
                  <div className="icon-row-body">
                    <h3>Email us directly</h3>
                    <a href="mailto:insurtech@vidalhealth.com" className="icon-row-link">insurtech@vidalhealth.com</a>
                    <p style={{ marginTop: '4px' }}>For enterprise enquiries and partnership discussions.</p>
                  </div>
                </div>

                <div className="icon-row">
                  <span className="icon-row-icon"><Icon name="MapPin" size={18} /></span>
                  <div className="icon-row-body">
                    <h3>Our offices</h3>
                    <p>
                      {OFFICES.map((o, i) => (
                        <span key={o.city}>
                          {o.city}{o.hq ? ' (HQ)' : ''}{i < OFFICES.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="icon-row">
                  <span className="icon-row-icon"><Icon name="Clock" size={18} /></span>
                  <div className="icon-row-body">
                    <h3>Within 1 business day</h3>
                    <p>All enquiries are reviewed by our enterprise solutions team — not an automated inbox.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
