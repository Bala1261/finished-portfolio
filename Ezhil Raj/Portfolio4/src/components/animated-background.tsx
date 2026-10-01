"use client";
import React, { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";

gsap.registerPlugin(ScrollTrigger);

const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 700, y: -400, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 400, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.17, y: 0.17, z: 0.17 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.33, y: 0.33, z: 0.33 },
      position: { x: 0, y: -30, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.17, y: 0.17, z: 0.17 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  certifications: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  "coding-journey": {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 500, y: -250, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
};

type Section = "hero" | "about" | "skills" | "projects" | "certifications" | "coding-journey" | "contact";

const SECTION_ORDER: Section[] = ["hero", "about", "skills", "projects", "certifications", "coding-journey", "contact"];

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [splineApp, setSplineApp] = useState<Application>();
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  // Use refs for values accessed in event handlers to prevent stale closures
  const activeSectionRef = useRef<Section>("hero");
  const [activeSectionState, setActiveSectionState] = useState<Section>("hero");
  const splineAppRef = useRef<Application>();
  const isMobileRef = useRef(isMobile);
  const lastDispatchTime = useRef<number>(0);

  // Animation controller refs (not state — prevents re-render loops)
  const bongoAnimRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const keycapAnimRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const rotateKeyboardTween = useRef<gsap.core.Tween | null>(null);

  // Keep refs in sync
  useEffect(() => { splineAppRef.current = splineApp; }, [splineApp]);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  const getKeyboardState = useCallback((section: Section) => {
    return STATES[section][isMobileRef.current ? "mobile" : "desktop"];
  }, []);

  // Stable section setter without disruptive browser history replaceState on scroll
  const setActiveSection = useCallback((section: Section) => {
    if (activeSectionRef.current === section) return;
    activeSectionRef.current = section;
    setActiveSectionState(section);
  }, []);

  // ===== Spline Interaction Handler (uses refs, not state) =====
  const handleAction = useCallback((e: SplineEvent) => {
    const app = splineAppRef.current;
    if (!app || !e.target) return;

    // Allow interaction during Skills section.
    // On mobile, also allow if skills element is actually visible (handles first-load race condition
    // where IntersectionObserver hasn't fired yet but user is already on skills)
    const isSkillsActive = activeSectionRef.current === "skills";
    const skillsEl = document.getElementById("skills");
    const skillsVisible = skillsEl
      ? skillsEl.getBoundingClientRect().top < window.innerHeight * 0.6 &&
        skillsEl.getBoundingClientRect().bottom > window.innerHeight * 0.2
      : false;
    if (!isSkillsActive && !skillsVisible) return;

    // If detected via DOM check (IntersectionObserver hasn't fired yet),
    // update ref AND immediately make the text visible in the Spline scene.
    if (!isSkillsActive && skillsVisible) {
      activeSectionRef.current = "skills";
      // Force text visible right now so the first tap shows the label
      const targetMode = isMobileRef.current ? "text-mobile" : "text-desktop";
      const textObj = app.findObjectByName(targetMode);
      if (textObj) textObj.visible = true;
    }

    const now = Date.now();
    // Lower throttle to 150ms for ultra-responsive key taps
    if (now - lastDispatchTime.current < 150) return;

    const name = e.target.name;

    let skill: Skill | undefined = SKILLS[name as SkillNames];
    if (!skill) {
      const key = (Object.keys(SKILLS) as SkillNames[]).find(k =>
        name.toLowerCase().includes(k.toLowerCase())
      );
      if (key) skill = SKILLS[key];
    }

    if (skill) {
      lastDispatchTime.current = now;
      if (isMobileRef.current) {
        window.dispatchEvent(new CustomEvent("keyboard-press", { detail: skill }));
      }
      app.setVariable("heading", skill.label);
      app.setVariable("desc", skill.shortDescription);
    }
  }, []); // No deps — uses refs only

  const handleUp = useCallback(() => {
    const app = splineAppRef.current;
    if (app) {
      app.setVariable("heading", "");
      app.setVariable("desc", "");
    }
  }, []);

  // ===== Keyboard reveal on first load =====
  useEffect(() => {
    if (!splineApp || isLoading || keyboardRevealed) return;

    (async () => {
      const kbd = splineApp.findObjectByName("keyboard");
      if (!kbd) return;

      const initial = STATES.hero[isMobile ? "mobile" : "desktop"];
      gsap.set(kbd.scale, initial.scale);
      gsap.set(kbd.position, initial.position);
      gsap.set(kbd.rotation, initial.rotation);

      kbd.visible = true;
      setKeyboardRevealed(true);

      const all = splineApp.getAllObjects();
      const mobileKeys = all.filter(o => o.name === "keycap-mobile");
      const desktopKeys = all.filter(o => o.name === "keycap-desktop");
      const baseKeys = all.filter(o => o.name === "keycap");

      baseKeys.forEach(o => o.visible = false);
      mobileKeys.forEach(o => o.visible = isMobile);
      desktopKeys.forEach(o => o.visible = !isMobile);

      baseKeys.forEach(async (k, i) => {
        await sleep(i * 50);
        k.visible = true;
        gsap.fromTo(k.position, { y: 200 }, { y: 50, duration: 0.5, ease: "bounce.out" });
      });
    })();
  }, [splineApp, isLoading, isMobile, keyboardRevealed]);

  // ===== Section tracking — scroll-based on mobile, IntersectionObserver on desktop =====
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    let lastTransitionTime = 0;
    let committedSection: Section | null = null;
    const DEBOUNCE_MS = 300;

    const transitionTo = (section: Section) => {
      if (activeSectionRef.current === section) return;

      const now = Date.now();
      const elapsed = now - lastTransitionTime;
      if (elapsed < DEBOUNCE_MS) {
        if (committedSection === section) {
          // confirming same target — pass through
        } else {
          return;
        }
      }

      lastTransitionTime = now;
      committedSection = section;

      setActiveSection(section);
      window.dispatchEvent(new CustomEvent("clear-falling-skills"));
      const state = getKeyboardState(section);
      gsap.to(kbd.scale, { ...state.scale, duration: 0.8, overwrite: "auto", ease: "power2.out" });
      gsap.to(kbd.position, { ...state.position, duration: 0.8, overwrite: "auto", ease: "power2.out" });
      gsap.to(kbd.rotation, { ...state.rotation, duration: 0.8, overwrite: "auto", ease: "power2.out" });
    };

    if (isMobileRef.current) {
      // ── Mobile: scroll-position-based detection ──
      // window.scrollY and element.offsetTop are pure document-layout values.
      // They are NEVER affected by the URL bar showing/hiding (only viewport
      // dimensions change, not the scroll position or element positions).
      // This makes section detection completely immune to URL bar events.
      const getSectionAtScroll = (): Section => {
        // The "active" section is the one whose top is closest to 40% from the top of the viewport
        const scrollMid = window.scrollY + window.innerHeight * 0.4;
        let active: Section = "hero";
        for (const sectionId of SECTION_ORDER) {
          const el = document.getElementById(sectionId);
          if (!el) continue;
          if (el.offsetTop <= scrollMid) active = sectionId as Section;
        }
        return active;
      };

      const onScroll = () => {
        transitionTo(getSectionAtScroll());
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      // Fire once immediately to set the initial section
      onScroll();

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    } else {
      // ── Desktop: IntersectionObserver (no URL bar, works great) ──
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((e) => e.isIntersecting);
          if (visibleEntries.length > 0) {
            visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            const bestMatch = visibleEntries[0];
            const sectionId = bestMatch.target.id as Section;
            if (sectionId && SECTION_ORDER.includes(sectionId)) {
              transitionTo(sectionId);
            }
          }
        },
        {
          root: null,
          rootMargin: "-15% 0px -15% 0px",
          threshold: [0.15, 0.4, 0.7],
        }
      );

      SECTION_ORDER.forEach((s) => {
        const el = document.getElementById(s);
        if (el) observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [splineApp, setActiveSection, getKeyboardState]);

  // ===== Text object visibility (section dependent) =====
  useEffect(() => {
    if (!splineApp) return;
    const isSkills = activeSectionState === "skills";
    const textNames = ["text-desktop-dark", "text-desktop", "text-mobile-dark", "text-mobile"];
    textNames.forEach(n => {
      const o = splineApp.findObjectByName(n);
      if (o) o.visible = false;
    });

    const targetMode = isMobile ? "text-mobile" : "text-desktop";
    const obj = splineApp.findObjectByName(targetMode);
    if (obj) obj.visible = isSkills;
  }, [splineApp, isMobile, activeSectionState]);

  // ===== Build animation controllers once when splineApp is ready =====
  useEffect(() => {
    if (!splineApp) return;

    // --- Bongo cat animation ---
    const framesParent = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (frame1 && frame2 && framesParent) {
      let interval: NodeJS.Timeout;
      bongoAnimRef.current = {
        start: () => {
          let i = 0;
          framesParent.visible = true;
          interval = setInterval(() => {
            if (i % 2) {
              frame1.visible = false;
              frame2.visible = true;
            } else {
              frame1.visible = true;
              frame2.visible = false;
            }
            i++;
          }, 100);
        },
        stop: () => {
          clearInterval(interval);
          framesParent.visible = false;
          frame1.visible = false;
          frame2.visible = false;
        },
      };
    }

    // --- Keycap wave animation ---
    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => {
      tweens.forEach(t => t.kill());
      tweens = [];
    };

    keycapAnimRef.current = {
      start: () => {
        removePrevTweens();
        Object.values(SKILLS)
          .sort(() => Math.random() - 0.5)
          .forEach((skill, idx) => {
            const keycap = splineApp.findObjectByName(skill.name);
            if (!keycap) return;
            const t = gsap.to(keycap.position, {
              y: Math.random() * 200 + 200,
              duration: Math.random() * 2 + 2,
              delay: idx * 0.6,
              repeat: -1,
              yoyo: true,
              yoyoEase: "none",
              ease: "elastic.out(1,0.3)",
            });
            tweens.push(t);
          });
      },
      stop: () => {
        removePrevTweens();
        Object.values(SKILLS).forEach((skill) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: 0,
            duration: 4,
            repeat: 0,
            ease: "elastic.out(1,0.8)",
          });
          tweens.push(t);
        });
        setTimeout(removePrevTweens, 4000);
      },
    };

    return () => {
      bongoAnimRef.current?.stop();
      keycapAnimRef.current?.stop();
      removePrevTweens();
    };
  }, [splineApp]);

  // ===== Section-based animation control =====
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Kill previous rotation tween
    if (rotateKeyboardTween.current) {
      rotateKeyboardTween.current.kill();
      rotateKeyboardTween.current = null;
    }

    if (activeSectionState === "hero" && !isMobileRef.current) {
      rotateKeyboardTween.current = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
      });
    }

    const isProjectsBlock = ["projects", "certifications", "coding-journey"].includes(activeSectionState);
    if (isProjectsBlock) {
      const timer = setTimeout(() => bongoAnimRef.current?.start(), 300);
      return () => {
        clearTimeout(timer);
        bongoAnimRef.current?.stop();
      };
    } else {
      bongoAnimRef.current?.stop();
    }

    if (activeSectionState === "contact") {
      const timer = setTimeout(() => keycapAnimRef.current?.start(), 600);
      return () => {
        clearTimeout(timer);
        keycapAnimRef.current?.stop();
      };
    } else {
      keycapAnimRef.current?.stop();
    }

    return () => {
      if (rotateKeyboardTween.current) {
        rotateKeyboardTween.current.kill();
      }
    };
  }, [activeSectionState, splineApp]);

  // ===== Bind Spline event listeners once (stable refs) =====
  useEffect(() => {
    if (!splineApp) return;

    splineApp.addEventListener("mouseDown", handleAction);
    splineApp.addEventListener("mouseHover", handleAction);
    splineApp.addEventListener("keyDown", handleAction);
    splineApp.addEventListener("mouseUp", handleUp);
    splineApp.addEventListener("keyUp", handleUp);

    return () => {
      splineApp.removeEventListener("mouseDown", handleAction);
      splineApp.removeEventListener("mouseHover", handleAction);
      splineApp.removeEventListener("keyDown", handleAction);
      splineApp.removeEventListener("mouseUp", handleUp);
      splineApp.removeEventListener("keyUp", handleUp);
    };
  }, [splineApp, handleAction, handleUp]);

  return (
    <div className="w-full h-full relative" style={{ touchAction: "pan-y" }}>
      <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading...</div>}>
        <Spline
          onLoad={(app) => {
            setSplineApp(app);
            bypassLoading();
          }}
          scene="/assets/skills_keyboard.spline"
        />
      </Suspense>
    </div>
  );
};

export default AnimatedBackground;
