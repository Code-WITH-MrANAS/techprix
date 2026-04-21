import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Home    from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import logo from './assets/logo.png';

/* ── Smooth page-load curtain ── */
const PageLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="page-curtain"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        {/* Logo */}
        <div className="w-18 h-18 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(99,102,241,0.4)]">
          <img src={logo} alt="Tp" />
        </div>
        {/* Loading bar */}
        <div className="w-32 h-1 rounded-full bg-bg-tertiary overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366F1, #38BDF8, #A78BFA)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          {loading && <PageLoader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col min-h-screen bg-bg-main text-text-main transition-colors duration-400"
        >
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service/:serviceId" element={<ServiceDetail />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
