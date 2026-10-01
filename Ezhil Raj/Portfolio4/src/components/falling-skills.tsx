"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/data/constants";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FallingSkillInstance extends Skill {
    uniqueId: number;
}

export const FallingSkills = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [activeSkills, setActiveSkills] = useState<FallingSkillInstance[]>([]);

    useEffect(() => {
        const handlePress = (e: any) => {
            const skill = e.detail as Skill;
            if (!skill) return;

            const newSkill: FallingSkillInstance = {
                ...skill,
                uniqueId: Date.now() + Math.random(),
            };

            setActiveSkills((prev) => {
                const next = [...prev, newSkill];
                if (next.length > 3) return next.slice(-3);
                return next;
            });
        };

        const handleClear = () => {
            setActiveSkills([]);
        };

        window.addEventListener("keyboard-press", handlePress);
        window.addEventListener("clear-falling-skills", handleClear);

        // Watch for the projects section to start appearing.
        // Fire clear instantly (2% threshold) so skills vanish right when
        // the user scrolls past skills into projects — no debounce delay.
        const projectsEl = document.getElementById("projects");
        let projectsObserver: IntersectionObserver | null = null;
        if (projectsEl) {
            projectsObserver = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setActiveSkills([]);
                    }
                },
                { root: null, rootMargin: "0px", threshold: 0.02 }
            );
            projectsObserver.observe(projectsEl);
        }

        return () => {
            window.removeEventListener("keyboard-press", handlePress);
            window.removeEventListener("clear-falling-skills", handleClear);
            projectsObserver?.disconnect();
        };
    }, []);

    const removeSkill = (uid: number) => {
        setActiveSkills((prev) => prev.filter((s) => s.uniqueId !== uid));
    };

    if (!isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
            <AnimatePresence mode="sync">
                {activeSkills.map((skill) => (
                    <FallingSkillItem
                        key={skill.uniqueId}
                        skill={skill}
                        onRemove={() => removeSkill(skill.uniqueId)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const FallingSkillItem = ({ skill, onRemove }: { skill: FallingSkillInstance; onRemove: () => void }) => {
    const [initialX] = useState(() => Math.random() * (typeof window !== "undefined" ? window.innerWidth - 100 : 200) + 50);

    // Auto-remove after 5s as fallback (scroll-based clear in FallingSkills handles the main case)
    useEffect(() => {
        const timer = setTimeout(onRemove, 5000);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ y: -200, x: initialX, rotate: Math.random() * 360, opacity: 0, scale: 0.5 }}
            animate={{
                y: typeof window !== "undefined" ? window.innerHeight - 150 : 600,
                opacity: 1,
                scale: 1,
                transition: { type: "spring", damping: 10, stiffness: 80 }
            }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            drag
            dragMomentum={false}
            onDragEnd={(_, info) => {
                const velocity = Math.abs(info.velocity.x) + Math.abs(info.velocity.y);
                if (velocity > 400) onRemove();
            }}
            className="absolute pointer-events-auto touch-none cursor-grab active:cursor-grabbing"
            style={{ zIndex: 999999 }}
        >
            <div
                className="p-4 rounded-3xl bg-zinc-950/90 backdrop-blur-2xl border-2 flex flex-col items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ borderColor: skill.color || "#ffffff" }}
            >
                {skill.icon ? (
                    <div className="w-12 h-12 relative">
                        <Image src={skill.icon} alt={skill.label} fill className="object-contain" unoptimized />
                    </div>
                ) : (
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-lg font-bold text-white">
                        {skill.label[0]}
                    </div>
                )}
                <span className="text-[10px] font-bold text-white uppercase tracking-widest px-2">
                    {skill.label}
                </span>
            </div>
        </motion.div>
    );
};
