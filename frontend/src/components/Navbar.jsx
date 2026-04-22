import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Services',   href: '#services'      },
  { name: 'Portfolio',  href: '#projects'       },
  { name: 'About',      href: '#about'          },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact',    href: '#contact'        },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle }        = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-border-light shadow-lg shadow-indigo-500/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group"
              aria-label="TechPrix home"
            >
              {/* Logo mark */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-300/40 group-hover:scale-110 transition-transform duration-300">
                <img src={logo} alt="Tp" />
              </div>
              <span className="text-xl italic font-black font-display tracking-tight gradient-text">
                TechPrix
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200 group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right side: theme toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                id="theme-toggle"
                onClick={toggle}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="theme-toggle"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={dark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
              <a
                href="#contact"
                id="nav-cta"
                className="btn-primary px-6 py-2.5 text-sm inline-block"
              >
                Get Started ✦
              </a>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggle}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="theme-toggle"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                id="mobile-menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-indigo-50 transition-all duration-200 relative z-50"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate:   0, opacity: 1 }}
                    exit={{    rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer - positioned independently */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden w-full pointer-events-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="glass mx-4 p-5 rounded-2xl border border-border-light shadow-xl pointer-events-auto">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                      setTimeout(() => {
                        const element = document.querySelector(link.href);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0,   opacity: 1  }}
                    transition={{ delay: i * 0.06 }}
                    className="px-4 py-3 rounded-xl text-text-secondary hover:text-primary hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-medium transition-all duration-200 block"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    close();
                    setTimeout(() => {
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1  }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="btn-primary mt-3 px-6 py-3 text-sm text-center block"
                >
                  Get Started ✦
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
