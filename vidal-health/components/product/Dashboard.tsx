'use client';

import type { ProductDetail } from '../../types';

export default function Dashboard({ product }: { product: ProductDetail }) {
  return (
    <div className="stats-band">
      <div className="stats-in">
        {product.metrics.map((metric) => (
          <div key={metric.l} className="stat-it reveal">
            <div className="stat-n">{metric.v}</div>
            <div className="stat-lbl">{metric.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
