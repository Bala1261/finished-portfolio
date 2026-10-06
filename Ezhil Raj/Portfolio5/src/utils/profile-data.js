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
  skillEntries: [
    { name: 'Amazon Web Services (AWS)', category: 'cloud', level: 84, icon: 'fab fa-aws', color: '#ff9900' },
    { name: 'Docker & Containers', category: 'cloud', level: 86, icon: 'fab fa-docker', color: '#2496ed' },
    { name: 'Linux System Administration', category: 'cloud', level: 88, icon: 'fab fa-linux', color: '#fcc624' },
    { name: 'Git & GitHub Actions', category: 'cloud', level: 90, icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'Python', category: 'programming', level: 88, icon: 'fab fa-python', color: '#3776ab' },
    { name: 'JavaScript (ES6+)', category: 'programming', level: 85, icon: 'fab fa-js', color: '#f7df1e' },
    { name: 'C Language & Memory', category: 'programming', level: 85, icon: 'fas fa-c', color: '#00599c' },
    { name: 'Java Core', category: 'programming', level: 80, icon: 'fab fa-java', color: '#ea2d2e' },
    { name: 'React.js & Tailwind CSS', category: 'web', level: 84, icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Node.js & Express API', category: 'web', level: 82, icon: 'fab fa-node-js', color: '#68a063' },
    { name: 'MongoDB & SQLite', category: 'data', level: 82, icon: 'fas fa-database', color: '#47a248' },
    { name: 'Machine Learning (Scikit)', category: 'data', level: 78, icon: 'fas fa-brain', color: '#f58220' },
  ],
  certificateEntries: [
    { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Training & Certification', year: '2025', icon: 'fab fa-aws' },
    { title: 'Linux Essentials Certification', issuer: 'LPI / Open Source', year: '2024', icon: 'fab fa-linux' },
    { title: 'Artificial Intelligence Certification', issuer: 'Verified AI Program', year: '2024', icon: 'fas fa-brain' },
    { title: 'Codesoft Internship Offer Letter', issuer: 'Codesoft Technologies', year: '2024', icon: 'fas fa-briefcase' },
    { title: 'Thirax Full-Stack Internship', issuer: 'Thirax Web Solutions', year: '2025', icon: 'fas fa-file-shield' },
    { title: 'Robo Miracle Robotics Internship', issuer: 'Robo Miracle Lab', year: '2024', icon: 'fas fa-robot' },
    { title: 'Unstop Hackathons & Achievements', issuer: 'Unstop National Competitions', year: '2024', icon: 'fas fa-trophy' },
  ],
  achievementEntries: [
    { title: '156+ LeetCode DSA Problems Solved', category: 'Algorithms', metric: '156+' },
    { title: '7+ Production-Grade Engineered Systems', category: 'Engineering', metric: '7+' },
    { title: '9+ Verified Technical Certifications', category: 'Credentials', metric: '9+' },
  ],
};

/**
 * Canonical BEXO Profile Contract Representation
 */
export const canonicalProfile = {
  user: {
    name: defaultProfileData.user.name,
    email: defaultProfileData.user.email,
    phone: defaultProfileData.user.phone,
    photoUrl: defaultProfileData.user.photoUrl,
    resumeUrl: defaultProfileData.user.resumeUrl,
    openToHire: defaultProfileData.user.openToHire,
    location: defaultProfileData.user.location,
  },
  profile: {
    handle: defaultProfileData.profile.handle,
    headline: defaultProfileData.profile.headline,
    careerGoal: defaultProfileData.profile.careerGoal,
    bio: defaultProfileData.profile.bio,
    githubUrl: defaultProfileData.profile.githubUrl,
    linkedinUrl: defaultProfileData.profile.linkedinUrl,
    leetcodeUrl: defaultProfileData.profile.leetcodeUrl,
  },
  projectEntries: defaultProfileData.projectEntries,
  experienceEntries: defaultProfileData.experienceEntries,
  educationEntries: defaultProfileData.educationEntries,
  skillEntries: defaultProfileData.skillEntries,
  certificateEntries: defaultProfileData.certificateEntries,
  achievementEntries: defaultProfileData.achievementEntries,
};

/**
 * Returns normalized profile combining production window.__BEXO_PROFILE__ if present with defaults
 */
export function getProfileData() {
  if (typeof window !== 'undefined' && window.__BEXO_PROFILE__) {
    const injected = window.__BEXO_PROFILE__;
    return {
      ...defaultProfileData,
      ...injected,
      user: {
        ...defaultProfileData.user,
        ...(injected.user || {}),
      },
      profile: {
        ...defaultProfileData.profile,
        ...(injected.profile || {}),
      },
      projectEntries: injected.projectEntries || defaultProfileData.projectEntries,
      experienceEntries: injected.experienceEntries || defaultProfileData.experienceEntries,
      educationEntries: injected.educationEntries || defaultProfileData.educationEntries,
      skillEntries: injected.skillEntries || defaultProfileData.skillEntries,
      certificateEntries: injected.certificateEntries || defaultProfileData.certificateEntries,
      achievementEntries: injected.achievementEntries || defaultProfileData.achievementEntries,
    };
  }
  return defaultProfileData;
}
