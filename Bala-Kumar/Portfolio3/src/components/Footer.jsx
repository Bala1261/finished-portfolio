import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { FileText } from 'lucide-react';

export default function Footer() {
  const { user } = useProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 bg-white/80 border-t border-[#DCE6F3] text-center text-sm text-[#64748B]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#64748B] text-xs tracking-wider uppercase font-mono">
          &copy; {currentYear} {user.name} • BEXO Portfolio System
        </p>

        {/* Conditional Resume Link in Footer */}
        {user.resumeUrl && (
          <a
            href={user.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#0EA5E9] hover:text-[#2563EB] flex items-center gap-1.5 font-mono font-medium"
          >
            <FileText size={14} />
            <span>Download Resume</span>
          </a>
        )}
      </div>
    </footer>
  );
}