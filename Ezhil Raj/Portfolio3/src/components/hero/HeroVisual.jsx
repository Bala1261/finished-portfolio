import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import * as THREE from 'three';

function AbstractShape({ mouse }) {
  const meshRef = useRef(null);
  const time = useRef(0);

  // Accent color from CSS variable
  const color = useMemo(() => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim() || '#C8FF00';
    return new THREE.Color(accent);
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    if (!meshRef.current) return;

    // Subtle idle drift
    meshRef.current.rotation.x = Math.sin(time.current * 0.25) * 0.12;
    meshRef.current.rotation.z = Math.sin(time.current * 0.18) * 0.08;

    // Mouse reaction
    const targetRotY = mouse.current.x * 0.3;
    const targetRotX = -mouse.current.y * 0.2 + meshRef.current.rotation.x;

    meshRef.current.rotation.y +=
      (targetRotY - meshRef.current.rotation.y) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.6, 0.42, 180, 24, 2, 3]} />
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

function WireOverlay({ mouse }) {
  const meshRef = useRef(null);
  const time = useRef(0);

  const color = useMemo(() => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim() || '#C8FF00';
    return new THREE.Color(accent);
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(time.current * 0.25) * 0.12;
    meshRef.current.rotation.z = Math.sin(time.current * 0.18) * 0.08;
    const targetRotY = mouse.current.x * 0.3;
    meshRef.current.rotation.y +=
      (targetRotY - meshRef.current.rotation.y) * 0.04;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.6, 0.42, 180, 24, 2, 3]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.5}
        wireframe={true}
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

export default function HeroVisual() {
  const mouse = useMouseParallax();

  return (
    <div
      className="r3f-canvas"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[8, 8, 8]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-8, -4, 4]} intensity={1.2} color="#C8FF00" />
        <AbstractShape mouse={mouse} />
        <WireOverlay mouse={mouse} />
      </Canvas>
    </div>
  );
}
