// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';
import Stats from './components/stats/Stats';
import About from './sections/about';
import Applications from './sections/applications';
import Market from './sections/market';
import Team from './sections/team';
import Partners from './sections/partners';
import Contact from './sections/contact';
import Management from './sections/teamDetail/management';
import Technical from './sections/teamDetail/technical';
import Marketing from './sections/teamDetail/marketing';
import Support from './sections/teamDetail/support';

import './styles/globals.css';

// Page principale avec toutes les sections
const HomePage: React.FC<{ isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }> = ({ 
  isMenuOpen, 
  setIsMenuOpen 
}) => {
  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Applications />
        <Market />
        <Team />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

// Composant de page générique réutilisable pour toutes les équipes
const TeamDetailPage: React.FC<{ 
  isMenuOpen: boolean; 
  setIsMenuOpen: (open: boolean) => void;
  TeamComponent: React.ComponentType;
}> = ({ 
  isMenuOpen, 
  setIsMenuOpen,
  TeamComponent
}) => {
  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <TeamComponent />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Page d'accueil */}
          <Route 
            path="/" 
            element={<HomePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} 
          />
          
          {/* Pages de détail des équipes - version réutilisable */}
          <Route 
            path="/equipe/direction-generale" 
            element={
              <TeamDetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                TeamComponent={Management}
              />
            } 
          />
          
          <Route 
            path="/equipe/technique" 
            element={
              <TeamDetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                TeamComponent={Technical}
              />
            } 
          />

          <Route 
            path="/equipe/marketing" 
            element={
              <TeamDetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                TeamComponent={Marketing}
              />
            } 
          />

          <Route 
            path="/equipe/support" 
            element={
              <TeamDetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                TeamComponent={Support}
              />
            } 
          />
          
          {/* Vous pouvez facilement ajouter d'autres équipes plus tard */}
          {/* <Route 
            path="/equipe/marketing" 
            element={
              <TeamDetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                TeamComponent={Marketing}
              />
            } 
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;