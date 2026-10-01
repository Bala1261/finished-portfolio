"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  category: string;
  icon: string;
  color?: string;
}

const ROW_1_SKILLS: SkillItem[] = [
  { name: "C", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "HTML5", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "GraphQL", category: "API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Socket.IO", category: "Realtime", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
];

const ROW_2_SKILLS: SkillItem[] = [
  { name: "MongoDB", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Redis", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Firebase", category: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
  { name: "Supabase", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Git", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub Actions", category: "CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "AWS", category: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Postman", category: "Testing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "TensorFlow", category: "AI/ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-learn", category: "AI/ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "NumPy", category: "AI/Data", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Neural Networks", category: "AI/ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "RESTful APIs", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
];

export const LogoLoop: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4 py-8 overflow-hidden relative select-none">
      {/* Gradient Mask Overlays on Left & Right for seamless infinite fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Marquee */}
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS].map((skill, index) => (
          <SkillBadge key={`r1-${index}`} skill={skill} />
        ))}
      </div>

      {/* Row 2: Rightward Marquee */}
      <div className="flex w-max animate-marquee-reverse gap-3 hover:[animation-play-state:paused]">
        {[...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS].map((skill, index) => (
          <SkillBadge key={`r2-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillBadge: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3.5 py-2 rounded-xl",
        "bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-purple-500/40",
        "backdrop-blur-md transition-all duration-300 group cursor-default shadow-sm hover:scale-105"
      )}
    >
      <div className="w-5 h-5 relative shrink-0">
        <Image
          src={skill.icon}
          alt={skill.name}
          width={20}
          height={20}
          className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all"
          unoptimized
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-zinc-200 group-hover:text-white whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    </div>
  );
};

export default LogoLoop;
