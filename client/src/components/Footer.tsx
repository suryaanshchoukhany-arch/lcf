import { Mail, Phone, MapPin, Youtube, Instagram } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { MAYO } from '@/lib/mayo-images';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Competitions', href: '/competitions' },
  { label: 'Itinerary', href: '/itinerary' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Francomania', href: '/francomania' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden">
      {/* Architectural background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={MAYO.footerBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.12) saturate(0.3)' }}
        />
        <div className="absolute inset-0 bg-[#05070B]/90" />
      </div>

      {/* Volumetric accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#2A5A9A]/[0.012] blur-[110px] pointer-events-none" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/lcf-logo-white.png" className="w-10 h-10" alt="LCF" />
              <div>
                <div className="font-heading font-bold text-white tracking-[0.15em] text-[10px]">LCF DU MAYO</div>
                <div className="text-[7px] tracking-[0.2em] text-[#4A6A8A] font-heading font-bold mt-0.5 uppercase">XIIIth EDITION</div>
              </div>
            </div>
            <p className="text-xs text-[#4A6A8A]/40 leading-relaxed mb-6 font-body">
              Le Concours de la Francophonie du Mayo — celebrating 13 years of French language excellence at Mayo College, Ajmer.
            </p>
            <div className="flex gap-3">
              <Magnetic range={40} strength={0.35}>
                <a
                  href="https://youtube.com/@leconcoursdelafrancophonie7907?si=LPpXcHNTy4OFRttS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/[0.01] border border-white/[0.03] flex items-center justify-center text-[#4A6A8A]/30 hover:text-white hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300 block"
                >
                  <Youtube size={14} />
                </a>
              </Magnetic>
              <Magnetic range={40} strength={0.35}>
                <a
                  href="https://www.instagram.com/lcfdumayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/[0.01] border border-white/[0.03] flex items-center justify-center text-[#4A6A8A]/30 hover:text-white hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-300 block"
                >
                  <Instagram size={14} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-bold text-white text-[9px] tracking-[0.25em] uppercase mb-6">QUICK LINKS</h3>
            <ul className="space-y-3 font-body">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#4A6A8A]/60 hover:text-[#F8FAFC] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-[1px] bg-[#4A6A8A]/20 group-hover:bg-[#2A5A9A] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-heading font-bold text-white text-[9px] tracking-[0.25em] uppercase mb-6">CONTACT</h3>
            <div className="space-y-4 text-xs text-[#4A6A8A]/60 font-body">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#2A5A9A] mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  Mayo College<br />
                  Srinagar Road<br />
                  Ajmer, Rajasthan 305001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#2A5A9A] shrink-0" />
                <span>+91 98281 83415</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#2A5A9A] shrink-0" />
                <a href="mailto:help@lcfdumayo.com" className="hover:text-[#F8FAFC] transition-colors">
                  help@lcfdumayo.com
                </a>
              </div>
            </div>
          </div>

          {/* Register CTA Column */}
          <div>
            <h3 className="font-heading font-bold text-white text-[9px] tracking-[0.25em] uppercase mb-6">JOIN US</h3>
            <p className="text-xs text-[#4A6A8A]/50 leading-relaxed mb-6 font-body">
              Register your school for the XIIIth Edition — October 8–10, 2026.
            </p>
            <Magnetic range={50} strength={0.35}>
              <a
                href="https://forms.gle/iVtMpHNNsRXPmx348"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-sweep py-3 px-6 text-[9px] font-heading font-bold tracking-wider block text-center bg-[#2A5A9A] hover:bg-[#1E4A80] transition-colors"
              >
                <span>Register Now</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-[1px] bg-white/[0.03] mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-wider font-heading font-bold text-[#4A6A8A]/50 text-center md:text-left uppercase">
            © 2026 Mayo College, Ajmer. All rights reserved.
          </p>
          <p className="text-[9px] tracking-wider font-heading font-bold text-[#4A6A8A]/50 uppercase">
            Le Concours de la Francophonie du Mayo — XIIIth Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
