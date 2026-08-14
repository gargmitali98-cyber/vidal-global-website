'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { navLinks, productSummaryItems } from '../../content/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => { setMenuOpen(false); setProductsOpen(false); };

  return (
    <>
      <nav id="nav" className="nav at-top">
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo" onClick={close}>
            <Image
              src="/VHC.svg"
              alt="Vidal Health"
              width={180}
              height={48}
              className="nav-logo-img"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <MegaMenu />
            {navLinks
              .filter((link) => !link.dropdown)
              .map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-actions">
            <Link href="/contact?intent=demo" className="nav-cta">
              Book a Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={`nav-ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`nav-ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`nav-ham-line ${menuOpen ? 'open' : ''}`} />
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-mobile-overlay" onClick={close} aria-hidden="true" />
      )}
      <div className={`nav-mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-mobile-inner">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="nav-mobile-group">
                <button
                  type="button"
                  className="nav-mobile-link nav-mobile-toggle"
                  aria-expanded={productsOpen}
                  onClick={() => setProductsOpen((o) => !o)}
                >
                  {link.label}
                  <ChevronDown size={16} className={`nav-mobile-chevron ${productsOpen ? 'open' : ''}`} />
                </button>
                <div className={`nav-mobile-submenu ${productsOpen ? 'open' : ''}`}>
                  <div className="nav-mobile-submenu-inner">
                    {productSummaryItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="nav-mobile-sublink"
                        onClick={close}
                      >
                        {item.title}
                      </Link>
                    ))}
                    <Link href={link.href} className="nav-mobile-sublink nav-mobile-sublink-all" onClick={close}>
                      View all products
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="nav-mobile-link"
                onClick={close}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact?intent=demo"
            className="btn btn-teal btn-lg nav-mobile-cta"
            onClick={close}
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </>
  );
}
