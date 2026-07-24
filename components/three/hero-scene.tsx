"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#1fe6c4";

function DistortedCore({ accent }: { accent: string }) {
  const group = React.useRef<THREE.Group>(null);
  const mesh = React.useRef<THREE.Mesh>(null);
  const target = React.useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Gentle continuous rotation, subtly steered by pointer position.
    target.current.x = state.pointer.y * 0.25;
    target.current.y = state.pointer.x * 0.35;

    if (group.current) {
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.03;
      group.current.rotation.y += (target.current.y - group.current.rotation.y + delta * 0.12) * 0.04;
    }
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.5, 6]} />
          <MeshDistortMaterial
            color={accent}
            attach="material"
            distort={0.42}
            speed={1.8}
            roughness={0.15}
            metalness={0.6}
            emissive={accent}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 8);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={40} color={ACCENT} />
      <pointLight position={[-4, -3, -2]} intensity={16} color="#5b8cff" />
      <group scale={Math.max(scale, 0.62)}>
        <DistortedCore accent={ACCENT} />
      </group>
      <Sparkles count={60} scale={7} size={2} speed={0.3} opacity={0.5} color={ACCENT} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      className="!touch-none"
    >
      <React.Suspense fallback={null}>
        <SceneContent />
      </React.Suspense>
    </Canvas>
  );
}
