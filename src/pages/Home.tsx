import { TechBackground } from '@/components/TechBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { Method } from '@/components/Method';
import { Governance } from '@/components/Governance';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <TechBackground />
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Method />
        <Governance />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
