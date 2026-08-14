'use client';

import type { ProductDetail } from '../../types';

export default function Features({ product }: { product: ProductDetail }) {
  return (
    <section className="section section-white">
      <div className="sec-in">
        <span className="eyebrow">Key Capabilities</span>
        <h2 className="sec-title" style={{ marginBottom: '40px' }}>
          {product.title} — Key Features
        </h2>
        <div className="feat-grid">
          {product.features.map((feature) => (
            <div key={feature.t} className="fc reveal">
              <div className="fc-icon">{feature.i}</div>
              <h4>{feature.t}</h4>
              <p>{feature.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
