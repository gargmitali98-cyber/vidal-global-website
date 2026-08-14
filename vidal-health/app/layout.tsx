import '../styles/globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/layout/CustomCursor';
import ClientEffects from '../components/layout/ClientEffects';

export const metadata = {
  title: 'Vidal Health | Health Insurance Intelligence Platform',
  description: 'Enterprise health insurance technology for insurers and TPAs — AI-powered claims, fraud detection, and network management on one platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <CustomCursor />
        <ClientEffects />
        {children}
        <Footer />
      </body>
    </html>
  );
}
