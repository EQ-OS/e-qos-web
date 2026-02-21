// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Gère le scroll vers les ancres (#equipe, #applications…) après une navigation React Router
const ScrollToHash: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);
  return null;
};
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
import WaliApp from './sections/appDetail/waliApp';
import WandiApp from './sections/appDetail/wandiApp';
import MakitiApp from './sections/appDetail/makitiApp';

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

// Composant de page générique réutilisable pour les équipes et applications
const DetailPage: React.FC<{ 
  isMenuOpen: boolean; 
  setIsMenuOpen: (open: boolean) => void;
  Component: React.ComponentType;
}> = ({ 
  isMenuOpen, 
  setIsMenuOpen,
  Component
}) => {
  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Component />
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
      <ScrollToHash />
      <div className="app">
        <Routes>
          {/* Page d'accueil */}
          <Route 
            path="/" 
            element={<HomePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} 
          />
          
          {/* === Pages de détail des équipes === */}
          <Route 
            path="/equipe/direction-generale" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={Management}
              />
            } 
          />
          
          <Route 
            path="/equipe/technique" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={Technical}
              />
            } 
          />

          <Route 
            path="/equipe/marketing" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={Marketing}
              />
            } 
          />

          <Route 
            path="/equipe/support" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={Support}
              />
            } 
          />

          {/* === Pages de détail des applications === */}
          <Route 
            path="/app/wali" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={WaliApp}
              />
            } 
          />

          <Route 
            path="/app/wandi" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={WandiApp}
              />
            } 
          />

          <Route 
            path="/app/makiti" 
            element={
              <DetailPage 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen}
                Component={MakitiApp}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;