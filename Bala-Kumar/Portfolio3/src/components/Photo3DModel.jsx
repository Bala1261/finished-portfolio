import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ─── 3D Photo Avatar Holographic Body ──────────────────────────────────
function AvatarHolographicBody({ isRotating, photoUrl, name, headline }) {
  const frameGroup = useRef(null);

  // Smooth continuous 360-degree rotation of the photo frame
  useFrame((_, delta) => {
    if (isRotating && frameGroup.current) {
      frameGroup.current.rotation.y += delta * 0.75;
    }
  });

  // Front Photo Texture
  const frontPhotoTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(photoUrl || '/avatar.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [photoUrl]);

  // Back Tech Monogram Texture
  const backPlaqueTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 756;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Light cyan-blue-violet gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 756, 1024);
    bgGrad.addColorStop(0, '#E0F2FE');
    bgGrad.addColorStop(0.5, '#F5F8FF');
    bgGrad.addColorStop(1, '#EDE9FE');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 756, 1024);

    // Primary blue border
    ctx.strokeStyle = '#0EA5E9';
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, 700, 968);

    // Inner subtle border
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, 660, 928);

    // Corner decorative accents
    ctx.fillStyle = '#8B2CF5';
    const corners = [
      [28, 28],
      [718, 28],
      [28, 986],
      [718, 986],
    ];
    corners.forEach(([x, y]) => {
      ctx.fillRect(x - 6, y - 6, 22, 22);
    });

    // Central Hexagon Emblem
    ctx.save();
    ctx.translate(378, 360);
    ctx.strokeStyle = '#0EA5E9';
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = 110 * Math.cos(angle);
      const y = 110 * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Central Monogram Letters
    const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SR';
    ctx.shadowColor = 'rgba(14, 165, 233, 0.4)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 0, 0);
    ctx.restore();

    // Name Headline
    ctx.shadowColor = 'rgba(14, 165, 233, 0.3)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((name || 'SOLAIRAJ R').toUpperCase(), 378, 550);

    // Role Subtitle
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#2563EB';
    ctx.font = '600 24px sans-serif';
    ctx.fillText((headline || 'FULL STACK DEVELOPER').toUpperCase(), 378, 605);

    // Tech Stack Summary
    ctx.fillStyle = '#64748B';
    ctx.font = '500 20px monospace';
    ctx.fillText('BEXO PREMIUM PORTFOLIO SYSTEM', 378, 665);

    // Bottom Decorative Circuit Line
    ctx.strokeStyle = 'rgba(139, 44, 245, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 800);
    ctx.lineTo(378, 800);
    ctx.lineTo(378, 860);
    ctx.lineTo(636, 860);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [name, headline]);

  // Multi-Face Materials for the 3D Body
  const materials = useMemo(() => {
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DCE6F3'),
      roughness: 0.18,
      metalness: 0.7,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontPhotoTexture,
      roughness: 0.28,
      metalness: 0.08,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backPlaqueTexture,
      roughness: 0.3,
      metalness: 0.45,
    });

    return [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];
  }, [frontPhotoTexture, backPlaqueTexture]);

  const neonGlowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0EA5E9'),
      emissive: new THREE.Color('#0EA5E9'),
      emissiveIntensity: 1.5,
      roughness: 0.15,
      metalness: 0.8,
    });
  }, []);

  const bodyWidth = 1.95;
  const bodyHeight = 2.64;
  const bodyDepth = 0.12;

  return (
    <group ref={frameGroup} position={[0, 0.15, 0]}>
      <mesh position={[0, 0, 0]} material={materials}>
        <boxGeometry args={[bodyWidth, bodyHeight, bodyDepth]} />
      </mesh>

      <mesh position={[0, 0, 0]} material={neonGlowMaterial}>
        <boxGeometry args={[bodyWidth + 0.05, bodyHeight + 0.05, bodyDepth - 0.02]} />
      </mesh>

      {[
        [-bodyWidth / 2, bodyHeight / 2],
        [bodyWidth / 2, bodyHeight / 2],
        [-bodyWidth / 2, -bodyHeight / 2],
        [bodyWidth / 2, -bodyHeight / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]} material={neonGlowMaterial}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main 3D Model Showcase Component ──────────────────────────────────
export default function Photo3DModel({ photoUrl, name, headline }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[480px] sm:h-[530px]">
        <Canvas
          camera={{ position: [0, 0.6, 5.0], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.2} color="#f5f3ff" />
          <directionalLight position={[4, 7, 5]} intensity={2.6} color="#ffffff" />
          <directionalLight position={[-4, 3, -4]} intensity={3.0} color="#c084fc" />
          <directionalLight position={[0, -3, 3]} intensity={0.9} color="#e9d5ff" />
          <pointLight position={[0, 1.5, 2.5]} intensity={1.8} color="#ffffff" />
          <pointLight position={[0, 0, -2.5]} intensity={2.0} color="#a855f7" />

          <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.25}>
            <AvatarHolographicBody
              isRotating={true}
              photoUrl={photoUrl}
              name={name}
              headline={headline}
            />
          </Float>

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.65}
            scale={5.5}
            blur={2.4}
            far={4}
            color="#3b0764"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.85}
          />
        </Canvas>
      </div>
    </div>
  );
}
