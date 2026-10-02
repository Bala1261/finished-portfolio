import React from 'react';
import { Heart } from 'lucide-react';
import { playCyberTone } from '../utils/audio';

export default function Footer() {
  const socialLinks = [
    { href: 'https://github.com/jothimani7806', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/jothimani-p-7402a2328', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/Jothimani06/', icon: 'fas fa-code', label: 'LeetCode' },
    { href: 'mailto:jothimani782006@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-14 px-4 z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Brand */}
        <div>
          <div className="font-display font-black text-xl text-white tracking-tight mb-2">
            Jothimani
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
            Aspiring Cloud Engineer & DevOps Enthusiast crafting high-availability architectures and scalable systems.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((social, idx) => {
            const isIconString = typeof social.icon === 'string';
            const IconComponent = !isIconString ? social.icon : null;
            return (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberTone(700 + idx * 40, 'sine', 0.05, 0.02)}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                {isIconString ? <i className={social.icon}></i> : <IconComponent size={18} />}
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 md:text-right space-y-1">
          <p>© 2026 Jothimani. All rights reserved.</p>
          <p className="flex items-center justify-center md:justify-end gap-1.5">
            <span>Built with</span>
            <Heart size={13} className="text-cyan-400 fill-cyan-400 animate-pulse" />
            <span>& Three.js 3D WebGL</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
