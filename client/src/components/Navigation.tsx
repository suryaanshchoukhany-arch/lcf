import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Messages', href: '/messages' },
    { label: 'Competitions', href: '/competitions' },
    { label: 'Doorknobs', href: '/doorknobs' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Francomania', href: '/francomania' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 origin-left z-[99999]"
        style={{ scaleX }}
      />

      {/* ═══ Main Navigation ═══ */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[backdrop-filter,background-color] [backface-visibility:hidden] ${
          scrolled
            ? 'top-0 bg-[#05070B]/80 backdrop-blur-xl border-b border-white/[0.04]'
            : 'top-0 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>

            {/* Logo / Brand */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <img src="/lcf-logo-white.png" className="w-7 h-7" alt="LCF" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-white text-[11px] tracking-[0.12em] leading-none">
                  LCF DU MAYO
                </span>
                <span className="text-[7px] tracking-[0.18em] text-white/25 font-body font-medium mt-1 uppercase">
                  XIIIth Edition
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-[9px] font-body font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/30 hover:text-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0.5 left-3 right-3 h-[1px] bg-white/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Registration CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 relative z-10">
              <a
                href="https://forms.gle/iVtMpHNNsRXPmx348"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[9px] font-body font-semibold tracking-[0.15em] uppercase bg-white text-[#05070B] hover:bg-white/90 transition-all duration-400"
              >
                Register
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 text-white/40 hover:text-white transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ Full-Screen Mobile Menu ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#05070B]/98 backdrop-blur-2xl xl:hidden flex flex-col justify-center"
          >
            {/* Close button */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/30 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col items-center gap-1">
              {navItems.map((item, idx) => {
                const isActive = location === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: idx * 0.04, duration: 0.5, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-8 py-3 font-heading font-medium text-2xl md:text-3xl tracking-[0.04em] transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-white/20 hover:text-white/60'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navItems.length * 0.04, duration: 0.5, ease: EASE }}
                className="mt-8"
              >
                <a
                  href="https://forms.gle/iVtMpHNNsRXPmx348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-[10px] font-body font-semibold tracking-[0.15em] uppercase bg-white text-[#05070B] hover:bg-white/90 transition-colors"
                >
                  Register Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
