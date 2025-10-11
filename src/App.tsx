import React from 'react';
import { useState, useEffect } from 'react'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Footer from './components/footer/Footer'
import Stats from './components/stats/Stats'
import About from './sections/about'
import Applications from './sections/applications'
import Market from './sections/market'
import Team from './sections/team'
import Partners from './sections/partners'
import Contact from './sections/contact'
import './styles/globals.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
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
    </div>
  )
}

export default App