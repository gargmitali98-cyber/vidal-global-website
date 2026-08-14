import Hero from '../components/homepage/Hero';
import Products from '../components/homepage/Products';
import Platform from '../components/homepage/Platform';
import EnterpriseStories from '../components/homepage/EnterpriseStories';
import Implementation from '../components/homepage/Implementation';
import CaseStudies from '../components/homepage/CaseStudies';
import CTA from '../components/homepage/CTA';

export default function HomePage() {
  return (
    <main className="page active">
      <Hero />
      <Products />
      <Platform />
      <EnterpriseStories />
      <Implementation />
      <CaseStudies />
      <CTA />
    </main>
  );
}
