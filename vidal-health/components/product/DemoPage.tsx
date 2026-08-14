'use client';

export default function DemoPage() {
  return (
    <div className="form-page">
      <div className="form-wrap">
        <div className="form-head">
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>
            Get Started
          </span>
          <h1>Book Your Personalised Demo</h1>
          <p>
            Our InsurTech specialists will walk you through a demo tailored to your organisation's needs, scale, and product interest.
          </p>
        </div>
        <div className="form-card">
          <div className="form-row">
            <div className="form-g">
              <label className="form-lbl">
                First Name <span>*</span>
              </label>
              <input className="form-in" type="text" placeholder="First name" id="d-fn" />
            </div>
            <div className="form-g">
              <label className="form-lbl">
                Last Name <span>*</span>
              </label>
              <input className="form-in" type="text" placeholder="Last name" id="d-ln" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-g">
              <label className="form-lbl">
                Work Email <span>*</span>
              </label>
              <input className="form-in" type="email" placeholder="name@company.com" id="d-em" />
            </div>
            <div className="form-g">
              <label className="form-lbl">Phone Number</label>
              <input className="form-in" type="tel" placeholder="+1 000 000 0000" id="d-ph" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-g">
              <label className="form-lbl">
                Company Name <span>*</span>
              </label>
              <input className="form-in" type="text" placeholder="Your company" id="d-co" />
            </div>
            <div className="form-g">
              <label className="form-lbl">
                Your Role <span>*</span>
              </label>
              <input className="form-in" type="text" placeholder="CTO / Head of Claims" id="d-ro" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-g">
              <label className="form-lbl">
                Organisation Type <span>*</span>
              </label>
              <select className="form-in" id="d-ot">
                <option value="">Select type...</option>
                <option>Insurance Carrier / Payer</option>
                <option>Third Party Administrator (TPA)</option>
                <option>Health Network / Provider Group</option>
                <option>Reinsurer</option>
                <option>Broker / Intermediary</option>
                <option>Government Health Programme</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-g">
              <label className="form-lbl">Country</label>
              <select className="form-in" id="d-cn">
                <option value="">Select country...</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Kuwait</option>
                <option>Qatar</option>
                <option>Bahrain</option>
                <option>Oman</option>
                <option>India</option>
                <option>Singapore</option>
                <option>Malaysia</option>
                <option>Indonesia</option>
                <option>Thailand</option>
                <option>Philippines</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-g">
            <label className="form-lbl">
              Product(s) of Interest <span>*</span>
            </label>
            <select className="form-in" id="d-pr">
              <option value="">Select product...</option>
              <option>VINGS Platform (Full Suite)</option>
              <option>Fraud, Waste & Abuse Management</option>
              <option>ENIGMA (Document Digitization)</option>
              <option>Claims Management</option>
              <option>Policy Admin & Management</option>
              <option>Sales Platform</option>
              <option>PriceIQ</option>
              <option>Pharmacy Benefit Management</option>
              <option>Provider Network Management</option>
              <option>India Network Access</option>
              <option>Mobile App</option>
              <option>Doctors Practice Management</option>
              <option>Not sure — help me find the right fit</option>
            </select>
          </div>
          <div className="form-g">
            <label className="form-lbl">Tell us about your challenge</label>
            <textarea className="form-in" rows={4} placeholder="Describe what you're trying to solve..." id="d-ms" />
          </div>
          <button className="form-submit" type="button" onClick={() => window.location.assign('/success')}>
            Request Demo →
          </button>
          <p className="form-note">
            🔒 Your information is confidential. We respond within 1 business day.
          </p>
        </div>
      </div>
    </div>
  );
}
