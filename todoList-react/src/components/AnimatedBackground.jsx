import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const Particles = () => {
  const ref = useRef();
  const sphere = new Float32Array(1000).map(() => (Math.random() - 0.5) * 10);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0015;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const AnimatedBackground3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
    >
      <color attach="background" args={["#000000"]} />
      <Particles />
    </Canvas>
  );
};

export default AnimatedBackground3D;
