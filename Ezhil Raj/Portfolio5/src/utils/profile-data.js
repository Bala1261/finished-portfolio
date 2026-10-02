/**
 * BEXO Canonical Profile Data Contract
 * Supplies default normalized profile data and supports injection via window.__BEXO_PROFILE__
 */

export const defaultProfileData = {
  user: {
    name: 'Jothimani',
    email: 'jothimani782006@gmail.com',
    phone: '+91 94890 25415',
    photoUrl: '/portfolio_img.jpeg',
    resumeUrl: '/727624BIT110_Final_Resume_Jothimani-2027.pdf',
    openToHire: true,
  },
  profile: {
    handle: 'jothimani7806',
    headline: 'Aspiring Cloud Engineer & DevOps Developer',
    careerGoal: 'Building resilient cloud infrastructure, container orchestration, and automated CI/CD deployment pipelines.',
    bio: 'Specializing in resilient cloud infrastructure, container orchestration with Docker & Kubernetes, and automated CI/CD deployment pipelines. Building the future of scalable web systems.',
    location: 'Tamil Nadu, India',
    githubUrl: 'https://github.com/jothimani7806',
    linkedinUrl: 'https://www.linkedin.com/in/jothimani-p-7402a2328',
    leetcodeUrl: 'https://leetcode.com/u/Jothimani06/',
  },
  projectEntries: [
    {
      id: 'routine',
      title: 'Routine Tracker (MERN Stack)',
      category: 'web',
      catLabel: 'Full-Stack Web',
      desc: 'A full-stack habit and routine management platform featuring automated streak tracking, completion telemetry analytics, and secure RESTful endpoints.',
      stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth'],
      github: 'https://github.com/jothimani7806',
    },
    {
      id: 'vlc',
      title: 'VLC Hand Gesture Control',
      category: 'ai',
      catLabel: 'Computer Vision',
      desc: 'Touchless human-computer interaction system leveraging OpenCV and MediaPipe to control VLC media player using real-time hand gestures.',
      stack: ['Python', 'OpenCV', 'MediaPipe', 'IPC Sockets', 'NumPy'],
      github: 'https://github.com/jothimani7806',
    },
    {
      id: 'devops-ci',
      title: 'Automated CI/CD Pipeline on AWS',
      category: 'cloud',
      catLabel: 'Cloud & DevOps',
      desc: 'Multi-stage automated delivery pipeline with GitHub Actions, containerized Docker builds, and automated deployments to AWS EC2 with health probes.',
      stack: ['AWS EC2', 'Docker', 'GitHub Actions', 'Nginx', 'Bash'],
      github: 'https://github.com/jothimani7806',
    },
    {
      id: 'linux-sentinel',
      title: 'Linux Server Sentinel CLI',
      category: 'systems',
      catLabel: 'Systems & Shell',
      desc: 'Lightweight systems telemetry utility for Linux hosts monitoring CPU utilization, memory thresholds, open network sockets, and alerting anomalies.',
      stack: ['Bash Shell', 'Linux /proc', 'Cron', 'Systemd', 'awk/sed'],
      github: 'https://github.com/jothimani7806',
    },
  ],
  experienceEntries: [
    {
      period: '2022 — 2023',
      title: 'Foundation of Science & Analytical Logic',
      desc: 'Formed a strong base in analytical reasoning, advanced mathematics, and computational problem solving.',
      tags: ['STEM Studies', 'Analytical Thinking', 'Core Logic'],
    },
    {
      period: '2024',
      title: 'Engineering Fundamentals — B.Tech IT',
      desc: 'Commenced B.Tech in Information Technology at MCET. Mastered procedural programming in C, object-oriented paradigms, and low-level computer architecture.',
      tags: ['C / Java / Python', 'Data Structures', 'Computer Architecture'],
    },
    {
      period: '2025',
      title: 'Full-Stack Development & Competitive Programming',
      desc: 'Built modern web systems (React, Node.js, Express, MongoDB) while maintaining consistent algorithmic practice on LeetCode and HackerRank.',
      tags: ['Full-Stack Web', 'LeetCode Practice', 'Database Engineering'],
    },
    {
      period: '2026',
      title: 'Cloud Systems, DevOps & Container Automation',
      desc: 'Deep-diving into Amazon Web Services, Docker container deployment, Kubernetes pod coordination, Linux system hardening, and automated CI/CD workflows.',
      tags: ['AWS Cloud', 'Docker & K8s', 'Linux Bash', 'CI/CD Automation'],
    },
  ],
  educationEntries: [
    {
      degree: 'B.Tech in Information Technology',
      institution: 'Dr. Mahalingam College of Engineering and Technology (MCET)',
      period: '2024 — 2028 (Undergraduate Engineering)',
      coursework: [
        'Cloud Computing',
        'Operating Systems & Linux',
        'Computer Networks',
        'Database Management Systems',
        'Data Structures & Algorithms',
        'Software Engineering',
        'Web Technologies',
        'Object-Oriented Programming',
      ],
    },
  ],
};

/**
 * Returns normalized profile combining production window.__BEXO_PROFILE__ if present with defaults
 */
export function getProfileData() {
  if (typeof window !== 'undefined' && window.__BEXO_PROFILE__) {
    return {
      ...defaultProfileData,
      ...window.__BEXO_PROFILE__,
      user: {
        ...defaultProfileData.user,
        ...(window.__BEXO_PROFILE__.user || {}),
      },
      profile: {
        ...defaultProfileData.profile,
        ...(window.__BEXO_PROFILE__.profile || {}),
      },
    };
  }
  return defaultProfileData;
}
