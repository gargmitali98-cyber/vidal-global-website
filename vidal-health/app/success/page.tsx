import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="page active">
      <section className="page-hero" style={{ paddingBottom: '64px' }}>
        <div className="ph-bg" />
        <div className="ph-grid" />
        <div className="ph-in">
          <h1>Thank you — your request is submitted.</h1>
          <p>
            Our team will review your message and contact you within one business day.
          </p>
        </div>
      </section>
      <section className="section section-white">
        <div className="sec-in text-center">
          <p className="sec-sub" style={{ marginBottom: '24px' }}>
            Return to the homepage or explore our products and services.
          </p>
          <div className="cta-btns">
            <Link href="/" className="btn btn-outline btn-lg">
              Back to Home
            </Link>
            <Link href="/products" className="btn btn-teal btn-lg">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
