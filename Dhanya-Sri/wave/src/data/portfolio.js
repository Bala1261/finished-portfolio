// Portfolio data - Update with your personal information

export const personalInfo = {
  name: "SOLAIRAJ R",
  role: "Web Developer",
  email: "solairaj495@gmail.com",
  phone: "+91 8056453211",
  location: "Theni, Tamil Nadu",
  avatar: "/images/avatar.jpg", // Your photo will be placed here
};

export const socialLinks = {
  github: "https://github.com/SOLAIRAJ28",
  linkedin: "https://www.linkedin.com/in/solairaj-r-754523291",
  leetcode: "https://leetcode.com/u/SOLAIRAJ2804/",
  email: "mailto:solairaj495@gmail.com",
};

export const about = {
  description: `Computer Science fresher with a strong passion for coding and software development. Experienced in UI/UX Design using Figma and completed Java Foundation course from Oracle. Interested in creating meaningful projects and contributing effectively in a professional environment.`,
  
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "Kongu Engineering College | Perundurai",
      year: "2023 - 2027",
      description: "CGPA: 7.72"
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Vailankanni Matha Matric Hr Sec School | Theni",
      year: "2022 - 2023",
      description: "Percentage: 84.83%"
    }
  ],
  
  interests: [
    "MERN Stack Development",
    "UI/UX Design (Figma)",
    "Full Stack Web Development",
    "Database Management",
    "Java Programming"
  ],
  
  softSkills: [
    "Teamwork",
    "Time Management",
    "Creativity",
    "Responsibility"
  ]
};

export const skills = {
  frontend: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 85 },
    { name: "Bootstrap", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "MongoDB", level: 85 },
    { name: "Java", level: 75 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "GitHub", level: 85 },
    { name: "VS Code", level: 95 },
    { name: "Postman", level: 80 },
    { name: "Figma", level: 85 },
  ]
};

export const projects = [
  {
    id: 1,
    title: "Weather App",
    description: "Built a weather app with real-time weather and interactive map search. Added trip planning features with dates, hotels, favourites, and history. Developed secure dual-login for tourists and operators.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Express", "OpenStreetMap API", "Open-Meteo API"],
    github: "https://github.com/SOLAIRAJ28/weather-app",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Inventory Management System",
    description: "Built a full-stack Inventory Management System with secure authentication and role-based access. Implemented stock tracking, notifications, sales analytics, and reporting features for better decision-making.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    technologies: ["React.js", "Node.js", "MySQL", "Express", "JWT", "REST API"],
    github: "https://github.com/SOLAIRAJ28/inventory-management",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Student Performance Analysis Tool",
    description: "Comprehensive student performance tracking and analysis system. Features include grade tracking, performance metrics, attendance monitoring, and data visualization with detailed reports for educators.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    technologies: ["HTML", "CSS", "Python", "SQL", "Flask", "Data Analysis"],
    github: "https://github.com/SOLAIRAJ28/student-performance-analysis-tool",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Netflix Clone",
    description: "Full-featured Netflix clone with modern UI/UX. Implements video streaming interface, user authentication, content browsing, and responsive design using TypeScript and modern web technologies.",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React", "CSS", "API Integration"],
    github: "https://github.com/SOLAIRAJ28/Netflix_clone",
    demo: "#",
    featured: true,
  },
  {
    id: 5,
    title: "Music App",
    description: "Interactive music streaming application with playlist management, search functionality, and audio controls. Built with modern web technologies for seamless music playback experience.",
    image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=800&h=600&fit=crop",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Web Audio API"],
    github: "https://github.com/SOLAIRAJ28/music-app",
    demo: "#",
    featured: true,
  },
  {
    id: 6,
    title: "House Price Prediction",
    description: "Machine learning-based house price prediction system. Analyzes various property features to provide accurate price estimates using HTML interface and predictive algorithms.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    technologies: ["HTML", "Python", "Machine Learning", "Data Science"],
    github: "https://github.com/SOLAIRAJ28/house_price",
    demo: "#",
    featured: true,
  },
];

export const experience = [
  {
    id: 1,
    title: "Bachelor of Computer Science",
    company: "Kongu Engineering College",
    location: "Perundurai, Tamil Nadu",
    period: "2023 - 2027",
    type: "education",
    description: [
      "CGPA: 7.72",
      "Focused on Web Development and MERN Stack",
      "Building full-stack applications with modern technologies"
    ]
  },
  {
    id: 2,
    title: "Higher Secondary Certificate",
    company: "Vailankanni Matha Matric Hr Sec School",
    location: "Theni, Tamil Nadu",
    period: "2022 - 2023",
    type: "education",
    description: [
      "Percentage: 84.83%",
      "Strong foundation in Mathematics and Computer Science",
      "Developed interest in programming and web technologies"
    ]
  },
];

export const achievements = [
  {
    title: "MongoDB Associate Developer",
    description: "MongoDB Global Certification",
    year: "2025"
  },
  {
    title: "APEX Cloud Developer Professional",
    description: "Oracle Global Certification",
    year: "2025"
  },
  {
    title: "Java Foundation Course",
    description: "Oracle Certified Java Foundation",
    year: "2025"
  },
];
