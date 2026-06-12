'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Menu, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useResolvedAsset } from '@/lib/assets';

export default function Header() {
  const { selectedPackage, isSplashActive } = useStudio();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const logoSrc = useResolvedAsset('/assets/logo/logo.png');

  // Monitor scroll direction to auto-hide or show navbar
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 15) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 12) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Portofolio', href: '/portfolio' },
    { name: 'Project', href: '/project' },
    { name: 'Harga', href: '/pricing' },
    { name: 'Proses', href: '/process' },
    { name: 'Testimoni', href: '/testimonials' },
    { name: 'Kontak', href: '/contact' },
  ];

  if (isSplashActive) return null;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 px-4 md:px-8 py-4 pointer-events-none transition-transform duration-300 ease-out ${
        isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#0F1020]/75 border border-white/5 md:border-white/10 rounded-2xl px-6 py-3.5 backdrop-blur-xl shadow-lg shadow-purple-950/10 pointer-events-auto">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Try to load logo image */}
              <img
                src={logoSrc}
                alt="OijiStudio Logo"
                className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0';
                  const svgNode = (e.target as HTMLImageElement).nextElementSibling;
                  if (svgNode) {
                    svgNode.classList.remove('hidden');
                  }
                }}
              />
              {/* Native SVG Logo Fallback - hidden initially unless error occurs or logo.png not found */}
              <svg viewBox="0 0 500 500" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)] group-hover:rotate-45 transition-transform duration-500 hidden">
                <path
                  d="M250 80 Q250 250 100 250 Q250 250 250 420 Q250 250 400 250 Q250 250 250 80 Z"
                  fill="url(#headerLogoGrad)"
                />
                <defs>
                  <linearGradient id="headerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EDE9FE" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-extrabold tracking-[0.2em] text-white text-sm uppercase">
              OIJI <span className="text-[#a78bfa] font-light">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="header-active-pill"
                      className="absolute inset-0 bg-violet-500/10 border border-violet-500/20 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action button CTA / Checkout Bag */}
          <div id="header-action-group" className="flex items-center gap-3">
            <Link
              href="/payment"
              className={`relative flex items-center justify-center h-9 w-9 rounded-lg border transition-all duration-300 ${
                selectedPackage
                  ? 'border-violet-500/35 bg-violet-600/15 text-violet-300 animate-pulse'
                  : 'border-white/10 hover:border-violet-500/20 text-zinc-400 hover:text-white'
              }`}
              title="Konfigurasi & Bayar"
            >
              <ShoppingBag className="h-4 w-4" />
              {selectedPackage && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
              )}
            </Link>

            <Link
              href="/services"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest font-semibold uppercase rounded-lg bg-white text-black hover:bg-violet-400 hover:text-white transition-all duration-300"
            >
              BUAT WEB
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Toggle Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Sliding Sidebar Panel - Mounted OUTSIDE header to escape pointer-events-none and scroll-translate limitations */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer z-50"
            />
            {/* Sidebar Right Rail */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-[290px] max-w-[85vw] h-full z-50 bg-gradient-to-b from-[#0F1020] to-[#07080f] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                  {/* Brand signature */}
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 500 500" className="w-5 h-5 text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.4)]">
                      <path
                        d="M250 80 Q250 250 100 250 Q250 250 250 420 Q250 250 400 250 Q250 250 250 80 Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="font-extrabold tracking-[0.15em] text-white text-xs uppercase">
                      OIJI <span className="text-[#a78bfa] font-light">STUDIO</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <span className="text-[9px] font-mono text-violet-400 tracking-[0.3em] uppercase mb-4 block">
                  ✦ MENU UTAMA
                </span>

                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-xs tracking-wider uppercase font-mono font-medium transition-all ${
                          isActive
                            ? 'bg-violet-500/10 text-violet-300 border-l-[3px] border-violet-500 pl-3 font-bold'
                            : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 flex flex-col gap-3">
                <span className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase">Portal Transaksi</span>
                <Link
                  href="/payment"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600/10 border border-violet-500/25 text-violet-300 text-xs tracking-widest font-bold uppercase transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  PEMBAYARAN
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white text-black text-xs tracking-widest font-bold uppercase hover:bg-violet-500 hover:text-white transition-all font-sans"
                >
                  MULAI PROYEK
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
