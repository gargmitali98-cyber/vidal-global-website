import { notFound } from 'next/navigation';
import ProductHero from './ProductHero';
import Features from './Features';
import Architecture from './Architecture';
import Dashboard from './Dashboard';
import { productDetails } from '../../content/products';

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const product = productDetails[slug];
  if (!product) {
    notFound();
  }

  return (
    <main className="page active">
      <ProductHero product={product} />
      <Features product={product} />
      <Dashboard product={product} />
      <Architecture product={product} />
      <div className="cta-band">
        <h2>See it in action</h2>
        <p>Get a personalised demo tailored to your specific use case</p>
        <div className="cta-btns">
          <a className="btn btn-teal btn-lg" href="/contact?intent=demo">
            Book a Demo
          </a>
        </div>
      </div>
    </main>
  );
}
