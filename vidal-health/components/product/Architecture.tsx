'use client';

import type { ProductDetail } from '../../types';

export default function Architecture({ product }: { product: ProductDetail }) {
  return (
    <section className="section section-alt">
      <div className="sec-in">
        <span className="eyebrow">Business Impact</span>
        <h2 className="sec-title" style={{ marginBottom: '40px' }}>
          Why this product matters
        </h2>
        <div className="why-grid" id="pd-benefits">
          {product.benefits.map((benefit) => (
            <div key={benefit.t} className="why-card reveal">
              <div className="why-icon">{benefit.i}</div>
              <h3>{benefit.t}</h3>
              <p>{benefit.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
