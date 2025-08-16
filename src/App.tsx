import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import StepsToPlay from './components/StepsToPlay';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-900 text-white transition-colors duration-300">
          <Header />
          <main>
            <HeroSection />
            <LiveDemo />
            <HowItWorks />
            <StepsToPlay />
            <TechStack />
            <FAQ />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;