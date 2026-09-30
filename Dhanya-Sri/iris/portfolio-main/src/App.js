import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioPage from './components/PortfolioPage';
import HireMe from './components/HireMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel';
import ScrollToTop from './components/ScrollToTop'; // <--- Import here
import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

  if (showAdmin) {
    return (
      <div className="App">
        <AdminPanel />
        <button 
          className="btn btn-secondary"
          style={{position: 'fixed', top: '20px', left: '20px', zIndex: 1000}}
          onClick={() => {setShowAdmin(false); window.history.pushState({}, '', '/');}}
        >
          ← Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop /> {/* <--- Keeps every page view starting from the top */}
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/hire-me" element={<HireMe />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;