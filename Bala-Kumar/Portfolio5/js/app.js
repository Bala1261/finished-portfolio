/**
 * Hero Portfolio - Main Application JavaScript
 * This file handles all animations, interactivity, and dynamic content.
 * Built with vanilla JS and GSAP for high-performance cinematic effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // GLOBAL STATE & UTILITIES
    // ==========================================
    const state = {
        isPageVisible: true,
        isMobile: window.innerWidth <= 768,
        mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        scroll: { y: window.scrollY }
    };

    // Page visibility tracker to pause expensive animations
    document.addEventListener("visibilitychange", () => {
        state.isPageVisible = document.visibilityState === 'visible';
    });

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            state.isMobile = window.innerWidth <= 768;
        }, 250);
    }, { passive: true });

    // Track mouse globally
    window.addEventListener('mousemove', (e) => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
    }, { passive: true });

    // Track scroll globally
    window.addEventListener('scroll', () => {
        state.scroll.y = window.scrollY;
    }, { passive: true });

    // Utility: Lerp (Linear Interpolation)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // ==========================================
    // 1. PRELOADER & HERO TIMELINE
    // ==========================================
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        const loadingBar = document.querySelector('.loading-bar');
        const emblemShape = document.querySelector('.emblem-shape');
        
        if (!preloader || !loadingBar || !emblemShape) return;

        // Ensure overflow is hidden during load
        document.body.style.overflow = 'hidden';

        // Animate emblem stroke (svg polygon)
        // Polygon length needs to be approximated or manually set in CSS stroke-dasharray
        // For standard 6-point polygon in a 200x200 box, ~500 length
        gsap.set(emblemShape, { strokeDasharray: 800, strokeDashoffset: 800 });
        
        const tlLoad = gsap.timeline({
            onComplete: () => {
                // Fade out preloader
                gsap.to(preloader, {
                    scale: 1.1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        preloader.remove();
                        document.body.style.overflow = '';
                        playHeroAnimations();
                    }
                });
            }
        });

        // 1. Draw shape
        tlLoad.to(emblemShape, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);

        // 2. Animate progress bar
        tlLoad.to(loadingBar, {
            width: '100%',
            duration: 2,
            ease: 'power3.inOut'
        }, 0);
    };

    // 6. HERO SECTION ANIMATIONS (Triggered after preloader)
    const playHeroAnimations = () => {
        const heroTl = gsap.timeline();

        // Ensure initial states (could also be done in CSS)
        gsap.set('.hero-badge', { opacity: 0, y: -20 });
        gsap.set('.line-1', { opacity: 0, x: -50 });
        gsap.set('.line-2', { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.hero-subtitle-container', { opacity: 0 });
        gsap.set('.hero-tagline', { opacity: 0, y: 20 });
        gsap.set('.cta-btn', { opacity: 0, y: 30 });
        gsap.set('.hero-stats .stat-item', { opacity: 0 });
        gsap.set('.hero-silhouette-container', { opacity: 0, scale: 0.5 });
        gsap.set('.energy-ring', { scale: 0, rotation: -90 });

        // Sequence
        heroTl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2)
              .to('.line-1', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
              .to('.line-2', { opacity: 1, scaleX: 1, duration: 1, ease: 'expo.out' }, '-=0.5')
              .to('.hero-subtitle-container', { opacity: 1, duration: 0.5 }, '-=0.3')
              .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
              .to('.cta-btn', { opacity: 1, y: 0, duration: 0.4, stagger: 0.2, ease: 'back.out(1.5)' }, '-=0.4')
              .to('.hero-stats .stat-item', { opacity: 1, duration: 0.5, stagger: 0.3 }, '-=0.2')
              .to('.hero-silhouette-container', { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, 0.5)
              .to('.energy-ring', { scale: 1, rotation: 0, duration: 1.5, stagger: 0.2, ease: 'expo.out' }, 0.8);
    };

    // ==========================================
    // 2. CUSTOM CURSOR
    // ==========================================
    const initCursor = () => {
        if (state.isMobile) return; // Don't run on mobile

        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        if (!dot || !outline) return;

        let outlineX = window.innerWidth / 2;
        let outlineY = window.innerHeight / 2;

        const animateCursor = () => {
            if (state.isPageVisible && !state.isMobile) {
                // Dot follows instantly
                dot.style.transform = `translate(${state.mouse.x}px, ${state.mouse.y}px)`;
                
                // Outline lerps
                outlineX = lerp(outlineX, state.mouse.x, 0.15);
                outlineY = lerp(outlineY, state.mouse.y, 0.15);
                outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Hover Effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .social-card, .skill-orb, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                outline.classList.remove('cursor-hover');
            });
        });
    };

    // ==========================================
    // 3. PARTICLE SYSTEM
    // ==========================================
    const initParticles = () => {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        const colors = ['#38c7ff', '#ff526b', '#ffd166', '#39e6a5'];
        const connectionDistance = 120;
        
        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.baseX = this.x;
                this.baseY = this.y;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around
                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;

                // Mouse interaction
                if (!state.isMobile) {
                    const dx = state.mouse.x - this.x;
                    const dy = state.mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = 150;
                    const force = (maxDistance - distance) / maxDistance;
                    const direction = (distance < maxDistance) ? -1 : 0; // Repel

                    if (distance < maxDistance) {
                        this.x += forceDirectionX * direction * force * 2;
                        this.y += forceDirectionY * direction * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const createParticles = () => {
            particles = [];
            const count = state.isMobile ? 50 : 100;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        createParticles();

        const animate = () => {
            if (state.isPageVisible) {
                ctx.clearRect(0, 0, width, height);

                // Update and draw
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();

                    // Connections
                    for (let j = i; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectionDistance) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            const opacity = 1 - (distance / connectionDistance);
                            ctx.strokeStyle = particles[i].color;
                            ctx.globalAlpha = opacity * 0.2;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
                ctx.globalAlpha = 1;
            }
            requestAnimationFrame(animate);
        };
        animate();
    };

    // ==========================================
    // 4. NAVIGATION & SMOOTH SCROLL
    // ==========================================
    const initNavigation = () => {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        const navItems = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            if (!navbar) return;
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Multi-page navigation: only intercept same-page hash links.
        // Cross-page links must use normal browser navigation.
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    };

    // ==========================================
    // 5. TYPED TEXT EFFECT
    // ==========================================
    const initTypedText = () => {
        const target = document.getElementById('typed-output');
        if (!target) return;

        const strings = [
            'Software Engineer',
            'AI-ML Engineer',
            'Flutter Developer',
            'Full-Stack Developer',
            'Cybersecurity Enthusiast',
            'Database Architect',
            'Blockchain Developer'
        ];

        let strIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        const type = () => {
            if (!state.isPageVisible) {
                setTimeout(type, 100);
                return;
            }

            const currentStr = strings[strIndex];
            
            if (isDeleting) {
                target.textContent = currentStr.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30; // Faster deletion
            } else {
                target.textContent = currentStr.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = Math.random() * 50 + 50; // Random human-like typing speed
            }

            if (!isDeleting && charIndex === currentStr.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                strIndex = (strIndex + 1) % strings.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing slightly after load
        setTimeout(type, 2000);
    };

    // ==========================================
    // 7. STAT COUNTERS
    // ==========================================
    const initStatCounters = () => {
        const counters = document.querySelectorAll('.stat-number, .dash-stat-num');
        if (counters.length === 0) return;

        const startCounting = (el) => {
            if (el.classList.contains('counted')) return;
            el.classList.add('counted');
            
            const target = parseInt(el.getAttribute('data-target') || 0);
            
            gsap.to(el, {
                innerHTML: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 }, // Format as integer
                onUpdate: function() {
                    el.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    // ==========================================
    // 8. SCROLL REVEALS
    // ==========================================
    const initScrollReveals = () => {
        const revealElements = document.querySelectorAll('.reveal-card');
        
        revealElements.forEach((el, index) => {
            // Check if element is a specific card type for custom stagger
            const isComic = el.classList.contains('comic-panel');
            
            let yOffset = 60;
            let rotation = 0;
            
            if (isComic) {
                // Alternate rotation for comic panels
                rotation = index % 2 === 0 ? 2 : -2;
            }

            gsap.fromTo(el, 
                { opacity: 0, y: yOffset, scale: 0.95, rotationZ: rotation },
                {
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    rotationZ: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none' // Only play once
                    }
                }
            );
        });
    };

    // ==========================================
    // 9. SKILL ORBS
    // ==========================================
    const initSkillOrbs = () => {
        const skillsSection = document.querySelector('.skills-section');
        const orbs = document.querySelectorAll('.skill-orb');
        if (!skillsSection || orbs.length === 0) return;

        // Circumference of r=45 circle is ~282.74
        const circumference = 2 * Math.PI * 45;

        // Init stroke
        orbs.forEach(orb => {
            const fill = orb.querySelector('.orb-fill');
            if (fill) {
                fill.style.strokeDasharray = circumference;
                fill.style.strokeDashoffset = circumference;
            }
        });

        ScrollTrigger.create({
            trigger: skillsSection,
            start: 'top 70%',
            onEnter: () => {
                orbs.forEach((orb, i) => {
                    const fill = orb.querySelector('.orb-fill');
                    const level = parseFloat(orb.getAttribute('data-level') || 0);
                    if (fill) {
                        const targetOffset = circumference - (circumference * level / 100);
                        
                        gsap.to(fill, {
                            strokeDashoffset: targetOffset,
                            duration: 1.5,
                            ease: 'power2.out',
                            delay: i * 0.1
                        });
                    }
                });
            },
            once: true
        });
    };

    // ==========================================
    // 10. PROJECT CARD TILT EFFECT
    // ==========================================
    const initTiltEffect = () => {
        if (state.isMobile) return;

        const tiltCards = document.querySelectorAll('[data-tilt]');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (!state.isPageVisible) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Max rotation: 10deg
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                
                // Hologram glare effect
                const hologram = card.querySelector('.project-hologram');
                if (hologram) {
                    hologram.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                const hologram = card.querySelector('.project-hologram');
                if (hologram) {
                    hologram.style.background = 'none';
                }
            });
        });
    };

    // ==========================================
    // 11. GITHUB CONTRIBUTION GRAPH
    // ==========================================
    const initGithubGraph = () => {
        const grid = document.getElementById('contrib-grid');
        if (!grid) return;

        // Generate 364 cells (52 weeks x 7 days)
        const totalCells = 364;
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'contrib-cell';
            
            // Random distribution leaning towards 0 and 1
            let level = 0;
            const rand = Math.random();
            if (rand > 0.95) level = 4;
            else if (rand > 0.85) level = 3;
            else if (rand > 0.7) level = 2;
            else if (rand > 0.4) level = 1;
            
            cell.setAttribute('data-level', level);
            
            // Apply colors based on level (can also be done via CSS)
            const colors = ['#1a1a2e', '#0e4429', '#006d32', '#26a641', '#39d353'];
            cell.style.backgroundColor = colors[level];
            
            // Tooltip via title attribute
            const contribCount = level === 0 ? 0 : Math.floor(Math.random() * (level * 5)) + 1;
            cell.title = `${contribCount} contributions on this day`;
            
            fragment.appendChild(cell);
        }
        
        grid.appendChild(fragment);

        // Animate cells in
        const cells = grid.querySelectorAll('.contrib-cell');
        gsap.set(cells, { scale: 0, opacity: 0 });

        ScrollTrigger.create({
            trigger: '.github-section',
            start: 'top 75%',
            onEnter: () => {
                gsap.to(cells, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    stagger: {
                        amount: 1.5,
                        from: "random"
                    },
                    ease: "back.out(2)"
                });
            },
            once: true
        });
    };

    // ==========================================
    // 12 & 13. LEETCODE CHARTS & TOPIC BARS
    // ==========================================
    const initLeetCode = () => {
        const lcSection = document.querySelector('.leetcode-section');
        if (!lcSection) return;

        // 12. Donut Charts
        const donuts = document.querySelectorAll('.donut-chart');
        const circumference = 2 * Math.PI * 50; // r=50

        donuts.forEach(donut => {
            const fill = donut.querySelector('.donut-fill');
            const color = donut.getAttribute('data-color');
            if (fill) {
                fill.style.strokeDasharray = circumference;
                fill.style.strokeDashoffset = circumference;
                fill.style.stroke = color; // set custom color if needed
            }
        });

        ScrollTrigger.create({
            trigger: lcSection,
            start: 'top 75%',
            onEnter: () => {
                // Animate Donuts
                donuts.forEach((donut, i) => {
                    const fill = donut.querySelector('.donut-fill');
                    const val = parseFloat(donut.getAttribute('data-value') || 0);
                    const max = parseFloat(donut.getAttribute('data-max') || 100);
                    
                    if (fill) {
                        const targetOffset = circumference - (circumference * val / max);
                        gsap.to(fill, {
                            strokeDashoffset: targetOffset,
                            duration: 1.5,
                            ease: 'power2.out',
                            delay: i * 0.3
                        });
                    }
                });

                // 13. Topic Bars
                const topicFills = document.querySelectorAll('.topic-fill');
                topicFills.forEach((bar, i) => {
                    const targetWidth = bar.style.getPropertyValue('--fill-width');
                    gsap.fromTo(bar, 
                        { width: '0%' },
                        { 
                            width: targetWidth, 
                            duration: 1.2, 
                            ease: 'power2.out',
                            delay: i * 0.15 
                        }
                    );
                });
            },
            once: true
        });
    };

    // ==========================================
    // 14. REPO ACTIVITY BARS
    // ==========================================
    const initRepoActivity = () => {
        const repoCards = document.querySelectorAll('.repo-card');
        
        repoCards.forEach(card => {
            const bar = card.querySelector('.activity-fill');
            if (bar) {
                const targetWidth = bar.style.width;
                gsap.set(bar, { width: '0%' });
                
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 90%',
                    onEnter: () => {
                        gsap.to(bar, {
                            width: targetWidth,
                            duration: 1,
                            ease: 'power2.out'
                        });
                    },
                    once: true
                });
            }
        });
    };

    // ==========================================
    // 15. LIGHTNING FLASH
    // ==========================================
    const initLightning = () => {
        const bolts = document.querySelectorAll('.lightning-bolt');
        if (bolts.length === 0) return;

        const flash = () => {
            if (!state.isPageVisible) {
                setTimeout(flash, 2000);
                return;
            }

            const bolt = bolts[Math.floor(Math.random() * bolts.length)];
            
            const tl = gsap.timeline();
            tl.to(bolt, { opacity: 0.8, duration: 0.05 })
              .to(bolt, { opacity: 0, duration: 0.05 })
              .to(bolt, { opacity: 1, duration: 0.05 })
              .to(bolt, { opacity: 0, duration: 0.2 });
            
            // Random next flash between 4s and 8s
            setTimeout(flash, Math.random() * 4000 + 4000);
        };

        setTimeout(flash, 3000);
    };

    // ==========================================
    // 16. ENERGY RINGS
    // ==========================================
    const initEnergyRings = () => {
        // Continuous rotation for rings
        gsap.to('.ring-1', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to('.ring-2', {
            rotation: -360,
            duration: 30,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to('.ring-3', {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: "none"
        });
    };

    // ==========================================
    // 17. CONTACT FORM
    // ==========================================
    const initContactForm = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.form-submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnIcon = btn.querySelector('.btn-icon');
            
            // Success State
            btn.classList.add('success');
            btnText.textContent = 'TRANSMITTED';
            btnIcon.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.backgroundColor = '#00ff88';
            btn.style.color = '#000';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                btn.classList.remove('success');
                btnText.textContent = 'TRANSMIT';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        });
    };

    // ==========================================
    // 19. MAGNETIC BUTTONS
    // ==========================================
    const initMagneticButtons = () => {
        if (state.isMobile) return;

        const magneticBtns = document.querySelectorAll('.cta-btn');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;
                
                // Move button towards cursor (max 10px)
                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                // Spring back
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    // ==========================================
    // 21. SECTION PARALLAX
    // ==========================================
    const initParallax = () => {
        if (state.isMobile) return;

        // Subtle parallax on section headers
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(header => {
            gsap.to(header, {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: header.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    };

    // ==========================================
    // 22. FLOATING CODE BITS
    // ==========================================
    const initCodeBits = () => {
        const codeBits = document.querySelectorAll('.code-bit');
        if (codeBits.length === 0) return;

        const radius = 150;
        let timeOffset = 0;

        const animateBits = () => {
            if (state.isPageVisible && !state.isMobile) {
                timeOffset += 0.005; // speed
                
                codeBits.forEach((bit) => {
                    const i = parseFloat(bit.style.getPropertyValue('--i'));
                    const total = 8;
                    
                    // Calculate angle in radians
                    const angle = ((i / total) * Math.PI * 2) + timeOffset;
                    
                    // Orbit position
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius; // Use Z for scaling to create 3D effect
                    
                    // Project 3D to 2D
                    const scale = (z + radius * 1.5) / (radius * 3);
                    const opacity = scale * 0.8 + 0.2;
                    
                    // Apply
                    bit.style.transform = `translate(${x}px, ${z * 0.3}px) scale(${scale})`;
                    bit.style.opacity = opacity;
                    bit.style.zIndex = Math.round(z);
                });
            }
            requestAnimationFrame(animateBits);
        };
        requestAnimationFrame(animateBits);
    };

    // ==========================================
    // INITIALIZATION EXECUTION
    // ==========================================
    initPreloader();
    initCursor();
    initParticles();
    initNavigation();
    initTypedText();
    initStatCounters();
    initScrollReveals();
    initSkillOrbs();
    initTiltEffect();
    initGithubGraph();
    initLeetCode();
    initRepoActivity();
    initLightning();
    initEnergyRings();
    initContactForm();
    initMagneticButtons();
    initParallax();
    initCodeBits();
});
