import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init('Ax-DTo9Cnp8WdColV');
    console.log('✅ EmailJS initialized');
  }, []);

  const contactDetails = [
    { icon: <FaEnvelope />, title: 'Email', value: 'vishal250820@gmail.com' },
    { icon: <FaPhone />, title: 'Phone', value: '+91 6381180488' },
    { icon: <FaMapMarkerAlt />, title: 'Location', value: 'Cuddalore, Tamil Nadu' }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/Vishal-25-cyber' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/feed/' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/u/K_VISHAL_25/' },
    { icon: <FaInstagram />, url: 'https://instagram.com/vishxl_76' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Map EmailJS template field names to state field names
    const fieldMap = {
      'from_name': 'name',
      'from_email': 'email',
      'subject': 'subject',
      'message': 'message'
    };
    const stateField = fieldMap[name] || name;
    setFormData({
      ...formData,
      [stateField]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('📧 Submitting form...');

    try {
      // Use sendForm - it automatically reads form fields by 'name' attribute
      const result = await emailjs.sendForm(
        'service_x95o5qw',    // Service ID
        'template_os5sr87',   // Template ID (fixed: 'o' not '0')
        formRef.current       // Form reference
      );

      console.log('✅ Email sent successfully:', result);

      setFormStatus({
        type: 'success',
        message: `Thank you ${formData.name}! Your message has been sent successfully. I'll get back to you soon!`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('❌ Email sending failed:', error);
      console.error('Error details:', {
        text: error.text,
        status: error.status,
        message: error.message
      });

      setFormStatus({
        type: 'error',
        message: `Failed to send email: ${error.text || error.message}. Please try again or email me directly at vishal250820@gmail.com`
      });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setFormStatus({ type: '', message: '' });
    }, 8000);
  };


  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-subtitle">Let's work together</div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's talk about everything!</h3>
            <p>
              Have a project in mind or just want to say hi? Feel free to reach out.
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="contact-details">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="contact-icon">{detail.icon}</div>
                  <div>
                    <h4>{detail.title}</h4>
                    <p>{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-links-contact">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input
                type="text"
                name="from_name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="from_email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              {/* Hidden field for Reply To */}
              <input type="hidden" name="email" value={formData.email} />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your Message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <FaPaperPlane /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
