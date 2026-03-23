"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

function FloatingOrbs() {
  const group = useRef<any>();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-2, 1, -2]}>
          <meshStandardMaterial color="#3b82f6" opacity={0.6} transparent wireframe />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere args={[0.3, 32, 32]} position={[2, -1, -3]}>
          <meshStandardMaterial color="#8b5cf6" opacity={0.5} transparent wireframe />
        </Sphere>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.7, 32, 32]} position={[0, 0, -5]}>
          <meshStandardMaterial color="#10b981" opacity={0.3} transparent wireframe />
        </Sphere>
      </Float>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <FloatingOrbs />
      </Canvas>
    </motion.div>
  );
}
