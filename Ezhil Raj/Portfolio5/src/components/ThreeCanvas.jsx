import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050711, 0.018);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 48);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // 2. Responsive 3D Multi-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 120);
    cyanLight.position.set(28, 20, 25);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 110);
    purpleLight.position.set(-25, -20, 20);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3, 90);
    blueLight.position.set(10, -15, 30);
    scene.add(blueLight);

    // 3. Main 3D Kinetic Sculpture Group (Positioned on the right to keep left text pristine)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Initial positioning
    const isMobile = window.innerWidth < 1024;
    mainGroup.position.set(isMobile ? 0 : 20, isMobile ? 8 : 0, isMobile ? -18 : 0);

    // A. Metallic PBR Torus Knot Core
    const knotGeo = new THREE.TorusKnotGeometry(8.2, 2.0, 160, 32, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x081026,
      emissive: 0x020817,
      roughness: 0.16,
      metalness: 0.94,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    mainGroup.add(knotMesh);

    // B. Luminous Wireframe Hologram Overlayer
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireMesh = new THREE.Mesh(knotGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    mainGroup.add(wireMesh);

    // C. Concentric Gyro Gimbal Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.32,
    });
    const ringGeo1 = new THREE.TorusGeometry(13.8, 0.08, 16, 120);
    const gyroRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    gyroRing1.rotation.x = Math.PI / 3;
    mainGroup.add(gyroRing1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.28,
    });
    const ringGeo2 = new THREE.TorusGeometry(15.5, 0.08, 16, 120);
    const gyroRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    gyroRing2.rotation.y = Math.PI / 4;
    mainGroup.add(gyroRing2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.22,
    });
    const ringGeo3 = new THREE.TorusGeometry(17.2, 0.07, 16, 120);
    const gyroRing3 = new THREE.Mesh(ringGeo3, ringMat3);
    gyroRing3.rotation.z = Math.PI / 6;
    mainGroup.add(gyroRing3);

    // D. Small Orbiting Satellites on the Rings
    const satGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const satMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const sat1 = new THREE.Mesh(satGeo, satMatCyan);
    mainGroup.add(sat1);

    const satMatPurple = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const sat2 = new THREE.Mesh(satGeo, satMatPurple);
    mainGroup.add(sat2);

    // 4. Floating 3D Peripheral Polyhedra Constellation (Depth Crystals)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    const crystals = [];
    const crystalGeos = [
      new THREE.OctahedronGeometry(1.6, 0),
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.TetrahedronGeometry(1.8, 0),
      new THREE.DodecahedronGeometry(1.5, 0),
    ];

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x0d1c3a,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });

    const crystalWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // 8 peripheral crystals distributed in space
    const crystalCoords = [
      { x: -35, y: 18, z: -15, spdX: 0.012, spdY: 0.015 },
      { x: -40, y: -16, z: -10, spdX: -0.01, spdY: 0.012 },
      { x: -28, y: -28, z: -20, spdX: 0.015, spdY: -0.01 },
      { x: 36, y: 24, z: -12, spdX: -0.012, spdY: 0.014 },
      { x: 42, y: -18, z: -18, spdX: 0.011, spdY: 0.013 },
      { x: 30, y: -30, z: -14, spdX: -0.014, spdY: -0.012 },
      { x: -15, y: 32, z: -22, spdX: 0.01, spdY: 0.015 },
      { x: 15, y: 34, z: -25, spdX: -0.015, spdY: 0.01 },
    ];

    crystalCoords.forEach((coord, i) => {
      const geo = crystalGeos[i % crystalGeos.length];
      const mesh = new THREE.Mesh(geo, crystalMat);
      const wire = new THREE.Mesh(geo, crystalWireMat);
      wire.scale.set(1.05, 1.05, 1.05);
      mesh.add(wire);

      mesh.position.set(coord.x, coord.y, coord.z);
      crystalGroup.add(mesh);
      crystals.push({
        mesh,
        baseY: coord.y,
        phase: i * 0.8,
        spdX: coord.spdX,
        spdY: coord.spdY,
      });
    });

    // 5. Delicate 3D Starfield Particles (80 clean points, zero noise)
    const starCount = 80;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 120;
      starPos[i + 1] = (Math.random() - 0.5) * 80;
      starPos[i + 2] = (Math.random() - 0.5) * 60;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.85,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 6. Interactive Event Listeners (Mouse Parallax & Scroll Depth)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentScroll = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      currentScroll = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const mobile = window.innerWidth < 1024;
      if (mobile) {
        mainGroup.position.set(0, 8, -20);
        mainGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        mainGroup.position.set(20, 0, 0);
        mainGroup.scale.set(1, 1, 1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 7. Smooth High-Performance Animation Loop
    let clock = new THREE.Clock();
    let animId;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(animate);
      }
      const elapsed = clock.getElapsedTime();

      // Main Knot Rotations
      knotMesh.rotation.x = elapsed * 0.18;
      knotMesh.rotation.y = elapsed * 0.24;
      wireMesh.rotation.x = elapsed * 0.18;
      wireMesh.rotation.y = elapsed * 0.24;

      // Concentric Gimbals
      gyroRing1.rotation.z = elapsed * 0.32;
      gyroRing2.rotation.x = elapsed * 0.28;
      gyroRing3.rotation.y = -elapsed * 0.22;

      // Orbiting Satellites
      sat1.position.x = Math.cos(elapsed * 1.2) * 13.8;
      sat1.position.y = Math.sin(elapsed * 1.2) * 13.8 * Math.sin(Math.PI / 3);
      sat1.position.z = Math.sin(elapsed * 1.2) * 13.8 * Math.cos(Math.PI / 3);

      sat2.position.x = Math.sin(elapsed * 0.9) * 15.5 * Math.cos(Math.PI / 4);
      sat2.position.y = Math.cos(elapsed * 0.9) * 15.5;
      sat2.position.z = Math.sin(elapsed * 0.9) * 15.5 * Math.sin(Math.PI / 4);

      // Peripheral Floating Crystals
      crystals.forEach((c) => {
        c.mesh.rotation.x += c.spdX;
        c.mesh.rotation.y += c.spdY;
        c.mesh.position.y = c.baseY + Math.sin(elapsed * 1.2 + c.phase) * 2.5;
      });

      // Stars Slow Spatial Drift
      stars.rotation.y = elapsed * 0.012;

      // Smooth Mouse Parallax Spring
      targetRotY += (mouseX * 0.45 - targetRotY) * 0.05;
      targetRotX += (mouseY * 0.45 - targetRotX) * 0.05;

      mainGroup.rotation.y = targetRotY;
      mainGroup.rotation.x = targetRotX;
      crystalGroup.rotation.y = targetRotY * 0.5;
      crystalGroup.rotation.x = targetRotX * 0.5;

      // Dynamic Light Tracking
      cyanLight.position.x = 28 + mouseX * 8;
      cyanLight.position.y = 20 - mouseY * 8;

      // Scroll Linked Depth Modulation: Smoothly shifts back to keep content crystal readable
      const scrollDepth = Math.min(currentScroll * 0.018, 16);
      const isMob = window.innerWidth < 1024;
      mainGroup.position.z = (isMob ? -20 : 0) - scrollDepth;
      mainGroup.rotation.z = currentScroll * 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      satGeo.dispose();
      satMatCyan.dispose();
      satMatPurple.dispose();
      crystalGeos.forEach((g) => g.dispose());
      crystalMat.dispose();
      crystalWireMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

