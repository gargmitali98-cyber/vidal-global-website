import ProductsLandingPage from '../../components/product/ProductsLandingPage';

export const metadata = {
  title: 'Products | Vidal Health InsurTech Platform',
  description: '12 purpose-built health insurance technology products — from claims automation and fraud detection to provider network management and member experience.',
};

export default function ProductsHubPage() {
  return (
    <main className="page active">
      <ProductsLandingPage />
    </main>
  );
}
