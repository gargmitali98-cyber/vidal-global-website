import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, MapPin } from 'lucide-react';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const platformLinks = [
  { label: 'VINGS Platform',      href: '/products/vings' },
  { label: 'ClaimShield AI',      href: '/products/fraud-waste-abuse' },
  { label: 'ENIGMA Doc AI',       href: '/products/enigma' },
  { label: 'PriceIQ',             href: '/products/priceiq' },
  { label: 'India Network Access',href: '/products/india-network-access' },
  { label: 'WellSure',            href: '/products/wellsure' },
];

const companyLinks = [
  { label: 'About Us',   href: '/about' },
  { label: 'Solutions',  href: '/solutions' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book a Demo',href: '/contact?intent=demo' },
];

const contactItems = [
  { icon: Mail, label: 'insurtech@vidalhealth.com' },
  { icon: Globe, label: 'global.vidalhealth.com' },
  { icon: MapPin, label: 'Bangalore · Dubai · Qatar · Oman' },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-in">

        {/* Brand column */}
        <div>
          <Link href="/" className="footer-logo-link">
            <Image
              src="/VHC-white.svg"
              alt="Vidal Health"
              width={180}
              height={37}
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-desc">
            Enterprise health insurance technology for insurers and TPAs — covering every dimension of the insurance lifecycle on one integrated AI-powered platform.
          </p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/vidal-health/about/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://www.facebook.com/VidalHealthcare/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          </div>
        </div>

        {/* Platform */}
        <div className="footer-col">
          <h4>Platform</h4>
          <ul className="footer-links">
            {platformLinks.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            {companyLinks.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          {contactItems.map((item) => (
            <div className="footer-ci" key={item.label}>
              <span className="footer-ci-icon"><item.icon size={15} strokeWidth={1.75} aria-hidden /></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bot">
        <span>© 2025 Vidal Health. All Rights Reserved. A Bajaj Finserv Health Company.</span>
        <span>Enterprise InsurTech Platform</span>
      </div>
    </footer>
  );
}
