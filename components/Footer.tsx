'use client';

import * as React from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { Mail, Instagram, ArrowUp, Send, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useResolvedAsset } from '@/lib/assets';

export default function Footer() {
  const { isSplashActive } = useStudio();
  const logoSrc = useResolvedAsset('/assets/logo/logo.png');

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSplashActive) return null;

  return (
    <footer className="relative bg-[#07080f] text-white border-t border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-12 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Identity Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Try to load logo image */}
                <img
                  src={logoSrc}
                  alt="OijiStudio Logo"
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                    const svgNode = (e.target as HTMLImageElement).nextElementSibling;
                    if (svgNode) {
                      svgNode.classList.remove('hidden');
                    }
                  }}
                />
                {/* Native SVG Logo Fallback - hidden initially unless error occurs or logo.png not found */}
                <svg viewBox="0 0 500 500" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)] hidden">
                  <path
                    d="M250 80 Q250 250 100 250 Q250 250 250 420 Q250 250 400 250 Q250 250 250 80 Z"
                    fill="url(#footerLogoGrad)"
                  />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Kami merancang dan membangun pengalaman kreatif digital imersif kelas dunia, desain kustom, dan portofolio buku tahunan digital yang indah dan responsif.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/oijistudio"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white hover:border-violet-500/35 hover:bg-violet-500/10 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:oijistudio@gmail.com"
                className="h-8 w-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white hover:border-violet-500/35 hover:bg-violet-500/10 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Studio Quick Links */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.2em] text-violet-400 uppercase">
              PORTAL STUDIO
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Halaman Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Filosofi Studio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Layanan Interaktif
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Portofolio Unggulan
                </Link>
              </li>
              <li>
                <Link href="/project" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Ekosistem Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing & Checkout Links */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.2em] text-violet-400 uppercase">
              SUMBER DAYA
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/pricing" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Daftar Harga Resmi
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Blueprint Alur Kerja
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Ulasan Klien
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-zinc-400 hover:text-white text-xs tracking-wider transition-colors">
                  Sistem Pembayaran
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Cinematic newsletter */}
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-mono tracking-[0.2em] text-violet-400 uppercase">
              KINETIK KONEK
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Ikuti tren desain web futuristik terbaru dan pembaruan diskon kustom kami.
            </p>
            <div className="flex items-center gap-1.5 p-1 bg-[#121323] border border-white/5 rounded-lg">
              <input
                type="email"
                placeholder="Masukkan alamat email"
                className="bg-transparent text-xs text-white placeholder-zinc-500 px-3 py-2 outline-none w-full font-mono"
              />
              <button className="bg-violet-600 hover:bg-violet-500 text-white rounded-md p-2 transition-colors cursor-pointer">
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Dividing Boundary */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
            <span>© 2026 OIJI STUDIO.</span>
            <span>Hak cipta dilindungi. Dibuat dengan</span>
            <Heart className="h-3 w-3 text-violet-500 shrink-0" />
            <span>oleh @mhmyl_</span>
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/25 hover:text-violet-300 font-mono text-[10px] tracking-wider text-zinc-400 transition-all cursor-pointer"
          >
            KEMBALI KE ATAS
            <ArrowUp className="h-3 w-3 text-violet-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
