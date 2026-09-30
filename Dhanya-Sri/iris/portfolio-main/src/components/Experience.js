import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const certifications = [
    {
      id: 1,
      title: 'Oracle APEX Cloud Developer Certified Professional',
      company: 'Oracle University',
      date: 'May 12, 2025',
      image: '/images/oracle-certificate.jpg',
      description: 'Oracle Certified Professional - APEX Cloud Developer certification recognized by Oracle Corporation.'
    },
    {
      id: 2,
      title: 'MongoDB Certified Associate Developer',
      company: 'MongoDB, Inc.',
      date: 'May 12, 2025',
      image: '/images/mongodb-certificate.jpg',
      description: 'MongoDB Certified Associate Developer certification with comprehensive database design and development skills.'
    },
    {
      id: 3,
      title: 'Java Foundation Course',
      company: 'In Progress',
      date: 'Currently Pursuing',
      description: 'Currently enrolled in Java Foundation Course to strengthen core Java programming skills and object-oriented concepts.',
      inProgress: true
    }
  ];

  const educationEvents = [
    {
      id: 1,
      title: 'CODEFEST 2K25 - CSE Coding Club',
      venue: 'Kongu Engineering College',
      date: 'October 8, 2025',
      image: '/images/codefest-certificate.jpg',
      description: 'Certificate of Participation in CODEFEST 2K25 coding event, INTERFAZE organized by CSE Coding Club.'
    },
    {
      id: 2,
      title: 'Technical Symposium - Hackathon',
      venue: 'Sathyabama University, Chennai',
      date: 'September 12, 2025',
      image: '/images/karate-championship.jpg',
      description: 'Participated in technical hackathon and coding competition at Sathyabama University.'
    },
    {
      id: 3,
      title: 'CODEUP\'25 - Coding Competition',
      venue: 'Kongu Engineering College',
      date: 'January 15, 2025',
      image: '/images/codeup-certificate.jpg',
      description: 'Certificate of Participation in CODEUP\'25 coding competition organized by CSE Department.'
    }
  ];

  const extraCurricular = [
    {
      id: 1,
      title: 'State Level Karate Championship',
      venue: 'S.S.T. Sports Karate Academy',
      date: 'July 24, 2016',
      image: '/images/karate-state.jpg',
      description: 'Secured Third Place in State Level Open Karate Championship 2016 held at Ananthavalli Matriculation Higher Secondary School.'
    },
    {
      id: 2,
      title: 'ISKA Karate-Do - 6th KYU Blue Belt',
      venue: 'Indian Sports Karate Academy',
      date: 'March 24, 2018',
      image: '/images/karate-blue-belt.jpg',
      description: 'Awarded 6th KYU grade (Blue Belt) in ISKA Karate-Do discipline, certified by Karate Association of India.'
    },
    {
      id: 3,
      title: 'Open Karate Championship',
      venue: 'Kacho Toshiro Nagaki',
      date: '2006',
      image: '/images/hackathon-event.jpg',
      description: 'Certificate of Merit from Town Hall OPD to Head Post Office, Mandhapam, Cuddalore for participation in karate championship.'
    }
  ];

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="section-title">Certifications & Education</h2>
        <div className="section-subtitle">Professional achievements and learning journey</div>

        {/* Professional Certifications */}
        <div className="subsection">
          <h3 className="subsection-title">Professional Certifications</h3>
          <div className="certificates-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="certificate-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {cert.image && (
                  <div className="certificate-image" onClick={() => window.open(cert.image, '_blank')}>
                    <img src={cert.image} alt={cert.title} />
                    <div className="certificate-date-badge">{cert.date}</div>
                    <div className="certificate-overlay">
                      <span className="view-text">Click to View</span>
                    </div>
                  </div>
                )}
                <div className="certificate-content">
                  {!cert.image && <div className="certificate-date-badge-text">{cert.date}</div>}
                  <h4>{cert.title}</h4>
                  <p className="certificate-company">{cert.company}</p>
                  <p className="certificate-desc">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Events */}
        <div className="subsection">
          <h3 className="subsection-title">Education & Technical Events</h3>
          <div className="events-grid">
            {educationEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="event-image" onClick={() => window.open(event.image, '_blank')}>
                  <img src={event.image} alt={event.title} />
                  <div className="event-overlay">
                    <span className="view-text">Click to View</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date">{event.date}</div>
                  <h4>{event.title}</h4>
                  <p className="event-venue">{event.venue}</p>
                  <p>{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extra Curricular Activities */}
        <div className="subsection">
          <h3 className="subsection-title">Extra Curricular Activities</h3>
          <div className="events-grid">
            {extraCurricular.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="event-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="event-image" onClick={() => window.open(activity.image, '_blank')}>
                  <img src={activity.image} alt={activity.title} />
                  <div className="event-overlay">
                    <span className="view-text">Click to View</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date">{activity.date}</div>
                  <h4>{activity.title}</h4>
                  <p className="event-venue">{activity.venue}</p>
                  <p>{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
