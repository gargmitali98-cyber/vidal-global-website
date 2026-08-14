import ContactPage from '../../components/product/ContactPage';

interface Props {
  searchParams: { intent?: string };
}

export default function Contact({ searchParams }: Props) {
  const isDemo = searchParams.intent === 'demo';
  return (
    <main className="page active">
      <ContactPage isDemo={isDemo} />
    </main>
  );
}
