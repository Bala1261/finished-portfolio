import { useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const maxRetries = 2;
    let lastError = null;

    // Retry logic with exponential backoff
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // First attempt gets longer timeout (for cold starts), subsequent attempts get shorter timeout
        const timeout = attempt === 0 ? 30000 : 15000; // 30s first, then 15s
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        console.log(`Attempt ${attempt + 1}/${maxRetries + 1} - Timeout: ${timeout}ms`);

        const response = await fetch(`${apiUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (data.success) {
          setStatus({ 
            type: 'success', 
            message: data.message || 'Message sent successfully! I\'ll get back to you soon.'
          });
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus(''), 5000);
          setIsLoading(false);
          return; // Success - exit the retry loop
        } else {
          setStatus({ type: 'error', message: data.message });
          setIsLoading(false);
          return; // Server responded with error - don't retry
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        lastError = error;
        
        // If this isn't the last attempt, wait before retrying
        if (attempt < maxRetries) {
          const waitTime = Math.min(1000 * Math.pow(2, attempt), 3000); // Exponential backoff: 1s, 2s
          console.log(`Waiting ${waitTime}ms before retry...`);
          
          // Show user we're retrying
          setStatus({ 
            type: 'info', 
            message: `Connection issue detected. Retrying... (${attempt + 2}/${maxRetries + 1})` 
          });
          
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // All retries failed
    setIsLoading(false);
    
    if (lastError?.name === 'AbortError') {
      setStatus({ 
        type: 'error', 
        message: 'Server is taking too long to respond. The server might be starting up - please try again in a moment.' 
      });
    } else {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please check your connection and try again.' 
      });
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '10%', right: '5%' }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '50%', right: '10%' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4"
          >
            📧 Get In Touch
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Left Side - Interactive Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Contact Card with 3D Effect */}
            <motion.div
              className="group relative"
              whileHover={{ y: -8 }}
              onMouseMove={handleMouseMove}
            >
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.15), transparent 50%)',
                  }}
                  animate={{
                    '--mouse-x': `${mouseX.get()}px`,
                    '--mouse-y': `${mouseY.get()}px`,
                  }}
                />

                {/* Animated Icon with Particles */}
                <div className="relative mb-6">
                  <motion.div
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg relative"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <HiMail className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-cyan-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Title with gradient animation */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Contact Me
                </motion.h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. 
                  Let's connect and bring your vision to life.
                </p>

                {/* Interactive Contact Items */}
                <div className="space-y-4">
                  {[
                    { icon: HiMail, label: 'Email', value: personalInfo.email, color: 'cyan' },
                    { icon: HiPhone, label: 'Phone', value: personalInfo.phone, color: 'blue' },
                    { icon: HiLocationMarker, label: 'Location', value: personalInfo.location, color: 'sky' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="group/item flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-white group-hover/item:text-cyan-400 transition-colors">
                          {item.value}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                        whileHover={{ x: 5 }}
                      >
                        <FiSend className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{
                      y: [0, -100],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: 0,
                    }}
                  />
                ))}

                {/* Decorative Element */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-b-2xl"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
              {/* Animated title */}
              <motion.h3
                className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Send a Message
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name with Focus Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Full name
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/10
                               bg-slate-900/50 text-white placeholder-gray-500
                               focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                               transition-all outline-none"
                      placeholder="Your name"
                      whileFocus={{ scale: 1.01 }}
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Email Address with Focus Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/10
                               bg-slate-900/50 text-white placeholder-gray-500
                               focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                               transition-all outline-none"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.01 }}
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Message with Focus Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    Message
                  </label>
                  <div className="relative">
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-white/10
                               bg-slate-900/50 text-white placeholder-gray-500
                               focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                               transition-all outline-none resize-none"
                      placeholder="Tell me about your project..."
                      whileFocus={{ scale: 1.01 }}
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Status Message */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`p-4 rounded-xl border ${
                      status.type === 'success'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : status.type === 'info'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <p className="font-medium">{status.message}</p>
                  </motion.div>
                )}

                {/* Submit Button with Advanced Animation */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500
                           text-white font-semibold overflow-hidden
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 group/button"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                    animate={{
                      x: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <HiPaperAirplane className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </span>

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ scale: 0, opacity: 1 }}
                    whileHover={{
                      scale: 2,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </form>

              {/* Decorative animated border */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-b-2xl"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Corner particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  style={{
                    top: i < 2 ? '10%' : 'auto',
                    bottom: i >= 2 ? '10%' : 'auto',
                    left: i % 2 === 0 ? '5%' : 'auto',
                    right: i % 2 === 1 ? '5%' : 'auto',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
