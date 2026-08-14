'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { megaMenuSections, productPreviewMap } from '../../content/navigation';

export default function MegaMenu() {
  const [hoveredSlug, setHoveredSlug] = useState('vings');
  const preview = useMemo(
    () => productPreviewMap[hoveredSlug] ?? productPreviewMap['vings'],
    [hoveredSlug]
  );

  return (
    <div className="nav-item" onMouseLeave={() => setHoveredSlug('fraud-waste-abuse')}>
      <Link href="/products" className="nav-link">
        Products
        <svg className="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Link>

      <div className="dropdown">
        {/* Product list */}
        <div className="dd-list">
          {megaMenuSections.map((section) => (
            <div key={section.title}>
              <div className="dd-list-section">{section.title}</div>
              {section.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="mm-item"
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                >
                  <span className="mm-icon">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <div>
                    <div className="mm-label">{item.label}</div>
                    <div className="mm-sub">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
          <div className="dd-view-all">
            <Link href="/products" className="dd-view-all-link">
              View all products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Preview panel */}
        {preview && (
          <div className="dd-preview">
            <div className="dd-preview-header">
              <div className="dd-preview-tag">{preview.tag}</div>
              <div className="dd-preview-title">{preview.title}</div>
              <div className="dd-preview-desc">{preview.desc}</div>
            </div>
            <div className="dd-preview-vis">
              <div className="dd-preview-kpis-grid">
                {preview.kpis.map((kpi) => (
                  <div className="dd-kpi-block" key={kpi.l}>
                    <div className="dd-kpi-v">{kpi.v}</div>
                    <div className="dd-kpi-l">{kpi.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <Link href={preview.prodHref} className="dd-preview-cta">
              <span>Explore {preview.title}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
