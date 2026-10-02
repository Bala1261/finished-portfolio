import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, Briefcase } from 'lucide-react';
import { playCyberTone } from '../utils/audio';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Contact({ profileData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '', // BEXO anti-spam honeypot
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const email = profileData?.user?.email || 'jothimani782006@gmail.com';
  const phone = profileData?.user?.phone || '+91 94890 25415';
  const openToHire = profileData?.user?.openToHire !== false;

  const directContacts = [
    {
      label: 'Email Address',
      value: email,
      href: `mailto:${email}`,
      icon: 'fas fa-envelope',
      color: 'text-cyan-400',
      spotlight: 'rgba(0, 240, 255, 0.15)',
    },
    {
      label: 'Direct Phone',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      icon: 'fas fa-phone',
      color: 'text-emerald-400',
      spotlight: 'rgba(16, 185, 129, 0.15)',
    },
    {
      label: 'LinkedIn Profile',
      value: 'jothimani-p-7402a2328',
      href: profileData?.profile?.linkedinUrl || 'https://www.linkedin.com/in/jothimani-p-7402a2328',
      icon: 'fab fa-linkedin-in',
      color: 'text-blue-400',
      spotlight: 'rgba(59, 130, 246, 0.15)',
    },
    {
      label: 'GitHub Repositories',
      value: 'github.com/jothimani7806',
      href: profileData?.profile?.githubUrl || 'https://github.com/jothimani7806',
      icon: 'fab fa-github',
      color: 'text-purple-400',
      spotlight: 'rgba(168, 85, 247, 0.15)',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // BEXO Honeypot check: reject if filled by automated bots
    if (formData.honeypot) {
      return;
    }

    // Required fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      playCyberTone(400, 'sawtooth', 0.15, 0.05);
      return;
    }

    // Phone validation if provided
    if (formData.phone.trim()) {
      const phoneClean = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (phoneClean.length < 7 || phoneClean.length > 15 || !/^\d+$/.test(phoneClean)) {
        setErrorMsg('Please provide a valid phone number or leave the field blank.');
        playCyberTone(400, 'sawtooth', 0.15, 0.05);
        return;
      }
    }

    setLoading(true);

    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Jothimani,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}\n\nSent via BEXO Portfolio System`
    );

    // BEXO Direct Mailto Integration
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      playCyberTone(1050, 'sine', 0.2, 0.08);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setSuccess(false), 7000);
    }, 450);
  };

  return (
    <section id="contact" className="relative py-24 px-4 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Send size={13} /> Get In Touch
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Open to internships, cloud engineer roles, and technical collaborations. Reach out directly or send a message!
        </p>

        {/* BEXO Truthful Open-To-Work Status Badge */}
        {openToHire && (
          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Opportunities & Internships</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Direct Channels Column */}
        <div className="lg:col-span-5 space-y-3.5">
          {directContacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => playCyberTone(720 + idx * 40, 'sine', 0.06, 0.03)}
              className="block group"
            >
              <SpotlightCard
                spotlightColor={contact.spotlight}
                className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center gap-4 group-hover:translate-x-1.5 border border-white/10 group-hover:border-cyan-500/40 transition-all duration-200 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-lg ${contact.color} shadow-sm group-hover:scale-105 transition-transform`}>
                  <i className={contact.icon}></i>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {contact.label}
                  </span>
                  <span className="font-mono text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                    {contact.value}
                  </span>
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-7 card-3d-wrap">
          <div className="card-3d-content glass-panel p-6 sm:p-9 rounded-3xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            
            {/* Accessible Live Region for Status Feedback (BEXO Standard) */}
            <div aria-live="polite">
              {success && (
                <div className="p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 animate-fade-in">
                  <CheckCircle2 size={18} />
                  <span>Thank you! Your message has been formatted and opened in your email client.</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium bg-rose-500/15 border border-rose-500/30 text-rose-400 animate-fade-in">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              {/* BEXO Honeypot Anti-Spam Hidden Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_honeypot">Leave blank</label>
                <input
                  type="text"
                  id="company_honeypot"
                  name="company_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sierra Montana"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sierra@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94890 25415"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship / Engineering Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message-input"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Jothimani, I'd like to discuss a cloud infrastructure or DevOps opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(0,240,255,0.3)] hover:shadow-[0_6px_35px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
