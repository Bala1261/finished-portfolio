import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import {
  MessageSquare,
  X,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Phone,
} from 'lucide-react';

export default function FloatingActions() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <>
      {/* ─── Bottom-Right Single Floating Contact Launcher ─── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setContactOpen((prev) => !prev)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-md border cursor-pointer ${
            contactOpen
              ? 'bg-white border-[#DCE6F3] text-[#111827] shadow-md'
              : 'bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#8B2CF5] border-[#0EA5E9]/30 text-white shadow-md shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50'
          }`}
          aria-label="Toggle Quick Contact"
        >
          {contactOpen ? (
            <X size={24} />
          ) : (
            <div className="relative">
              <MessageSquare size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white" />
            </div>
          )}
        </motion.button>
      </div>

      {/* ─── Quick Contact Modal Drawer ─── */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-panel p-6 shadow-2xl border border-[#DCE6F3] bg-white/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE6F3] mb-4">
              <div>
                <h4 className="text-base font-bold text-[#111827] tracking-tight">
                  Let&apos;s Connect!
                </h4>
                <div className="text-xs text-[#0EA5E9] flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Full-Stack Developer</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Direct Email Card with 1-Click Copy */}
            <div className="p-3 rounded-xl bg-slate-50 border border-[#DCE6F3] mb-3 space-y-1.5">
              <div className="text-[11px] font-medium text-[#64748B]">
                Direct Email
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#0EA5E9] font-semibold truncate">
                  {personalInfo.email}
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-2 py-1 rounded-md bg-white border border-[#DCE6F3] hover:bg-slate-100 text-[#111827] text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} className="text-[#10B981]" />
                      <span className="text-[#10B981] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-3 py-2.5 rounded-xl bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail size={14} />
                <span>Send Email</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="px-3 py-2.5 rounded-xl bg-[#2563EB]/10 hover:bg-[#2563EB]/20 border border-[#2563EB]/30 text-[#2563EB] text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone size={14} />
                <span>Call Directly</span>
              </a>
            </div>

            {/* Social Shortcuts */}
            <div className="pt-3 border-t border-[#DCE6F3] flex items-center justify-between text-xs text-[#64748B]">
              <span>Find me online:</span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748B] hover:text-[#0EA5E9] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={11} />
                </a>
                <span>•</span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748B] hover:text-[#0EA5E9] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>GitHub</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
