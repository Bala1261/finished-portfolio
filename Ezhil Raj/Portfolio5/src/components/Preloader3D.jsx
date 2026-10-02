import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Preloader3D({ onLoaded }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [statusText, setStatusText] = useState('BOOTING 3D ENVIRONMENT');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Fullscreen 3D Scene for Loader
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic 3D Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4, 80);
    cyanPoint.position.set(15, 10, 15);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0xa855f7, 4, 80);
    purplePoint.position.set(-15, -10, 10);
    scene.add(purplePoint);

    // Central 3D Reactor Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Quantum Core
    const coreGeo = new THREE.IcosahedronGeometry(3.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Middle Wireframe Polyhedron
    const midGeo = new THREE.DodecahedronGeometry(5.2, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midMesh);

    // 3. Outer Geodesic Lattice Cage
    const outerGeo = new THREE.IcosahedronGeometry(7.2, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // 4. Concentric 3D Gyroscopic Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    const ringGeo1 = new THREE.TorusGeometry(9.2, 0.08, 16, 100);
    const gyroRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    gyroRing1.rotation.x = Math.PI / 3;
    coreGroup.add(gyroRing1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.5,
    });
    const ringGeo2 = new THREE.TorusGeometry(10.5, 0.08, 16, 100);
    const gyroRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    gyroRing2.rotation.y = Math.PI / 4;
    coreGroup.add(gyroRing2);

    // 5. Converging 3D Particle Vortex
    const vortexCount = 240;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPos = new Float32Array(vortexCount * 3);
    const vortexSpeeds = new Float32Array(vortexCount);
    const vortexRadius = new Float32Array(vortexCount);
    const vortexAngles = new Float32Array(vortexCount);

    for (let i = 0; i < vortexCount; i++) {
      vortexRadius[i] = 12 + Math.random() * 22;
      vortexAngles[i] = Math.random() * Math.PI * 2;
      vortexSpeeds[i] = 0.015 + Math.random() * 0.025;

      vortexPos[i * 3] = Math.cos(vortexAngles[i]) * vortexRadius[i];
      vortexPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      vortexPos[i * 3 + 2] = Math.sin(vortexAngles[i]) * vortexRadius[i];
    }

    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3));
    const vortexMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.65,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    scene.add(vortexPoints);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();
    let isWarping = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous 3D Gyro Rotations
      coreGroup.rotation.y = elapsed * 0.45;
      coreGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.3;

      midMesh.rotation.y = -elapsed * 0.6;
      outerMesh.rotation.z = elapsed * 0.35;
      gyroRing1.rotation.z = elapsed * 0.8;
      gyroRing2.rotation.x = -elapsed * 0.7;

      // Pulse Core
      const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Animate Converging Particle Vortex
      const posArr = vortexPoints.geometry.attributes.position.array;
      for (let i = 0; i < vortexCount; i++) {
        vortexAngles[i] += vortexSpeeds[i];
        // Slowly spiral inward
        vortexRadius[i] -= 0.025;
        if (vortexRadius[i] < 4) {
          vortexRadius[i] = 25 + Math.random() * 8;
        }

        posArr[i * 3] = Math.cos(vortexAngles[i]) * vortexRadius[i];
        posArr[i * 3 + 1] += Math.sin(elapsed * 2 + i) * 0.02;
        posArr[i * 3 + 2] = Math.sin(vortexAngles[i]) * vortexRadius[i];
      }
      vortexPoints.geometry.attributes.position.needsUpdate = true;
      vortexPoints.rotation.y = elapsed * 0.15;

      // Cinematic Warp Zoom on Completion
      if (isWarping && camera.position.z > 6) {
        camera.position.z -= 0.75;
        camera.rotation.z += 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Progress Simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 12) + 7;
        const next = Math.min(prev + increment, 100);

        if (next >= 25 && next < 55) {
          setStatusText('WELCOME VISITOR • PREPARING DIGITAL SPACE...');
        } else if (next >= 55 && next < 85) {
          setStatusText('GREETINGS • SYNCHRONIZING 3D ASSETS...');
        } else if (next >= 85 && next < 100) {
          setStatusText('ALMOST READY • OPTIMIZING LIGHTING...');
        } else if (next >= 100) {
          setStatusText('WELCOME! • ENTERING PORTFOLIO');
          clearInterval(interval);
          isWarping = true;
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onLoaded) onLoaded();
            }, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 65);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      vortexGeo.dispose();
      vortexMat.dispose();
      renderer.dispose();
    };
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-between py-12 px-6 transition-all duration-700 select-none ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D WebGL Background Canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Futuristic Header */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs font-mono tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold">WELCOME VISITOR // 3D PORTFOLIO EXPERIENCE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400 font-mono">
          <span>STATUS: CONNECTED</span>
          <span>GPU: ACCELERATED</span>
          <span className="text-cyan-400">STATE: ONLINE</span>
        </div>
      </div>

      {/* Center 3D Space Overlay: Warm Welcome Greeting */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none my-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          ✨ GREETINGS &amp; WELCOME
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(0,240,255,0.5)]">
          WELCOME
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-mono text-cyan-200/80 mt-3 tracking-wider max-w-md">
          Thank you for visiting my profile &bull; Enjoy the immersive 3D experience
        </p>
        <div className="mt-3 text-[11px] font-mono text-slate-400 uppercase tracking-widest px-3 py-1 rounded bg-white/5 border border-white/10">
          Jothimani K &bull; Cloud &amp; DevOps Engineer
        </div>
      </div>

      {/* Bottom Telemetry HUD & 3D Loading Progress */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-3">
        {/* Modern Cyber Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900/80 border border-cyan-500/30 overflow-hidden relative backdrop-blur-md p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_16px_#00f0ff] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Metrics */}
        <div className="w-full flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-medium tracking-wider">{statusText}</span>
          </div>
          <span className="font-bold text-white text-sm tracking-widest">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

