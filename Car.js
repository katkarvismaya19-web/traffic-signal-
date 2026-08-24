import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Car({ position, direction, speed = 0.15, signal, color = null }) {
  const carRef = useRef();
  const stopLine = 5;

  const carColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff8800", "#aa00ff"];
  const carColor = color || carColors[Math.floor(Math.random() * carColors.length)];

  const rotationY = {
    NS: 0,
    SN: Math.PI,
    EW: -Math.PI / 2,
    WE: Math.PI / 2,
  }[direction] || 0;

  useFrame(() => {
    if (!carRef.current) return;
    const { x, z } = carRef.current.position;
    let stop = false;

    switch(direction) {
      case "NS":
        stop = (signal === "red" || signal === "yellow") && z > stopLine;
        carRef.current.position.z -= stop ? 0 : speed;
        if (carRef.current.position.z < -40) carRef.current.position.z = 40;
        break;
      case "SN":
        stop = (signal === "red" || signal === "yellow") && z < -stopLine;
        carRef.current.position.z += stop ? 0 : speed;
        if (carRef.current.position.z > 40) carRef.current.position.z = -40;
        break;
      case "EW":
        stop = (signal === "red" || signal === "yellow") && x < -stopLine;
        carRef.current.position.x += stop ? 0 : speed;
        if (carRef.current.position.x > 40) carRef.current.position.x = -40;
        break;
      case "WE":
        stop = (signal === "red" || signal === "yellow") && x > stopLine;
        carRef.current.position.x -= stop ? 0 : speed;
        if (carRef.current.position.x < -40) carRef.current.position.x = 40;
        break;
    }
  });

  return (
    <group ref={carRef} position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.5, 2]} />
        <meshStandardMaterial color={carColor} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.9, 0.25, 1.5]} />
        <meshStandardMaterial color={carColor} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.85, 0.2, 1.4]} />
        <meshStandardMaterial color="#66ccff" transparent opacity={0.5} />
      </mesh>
      {[
        [-0.45, 0.1, -0.8],
        [0.45, 0.1, -0.8],
        [-0.45, 0.1, 0.8],
        [0.45, 0.1, 0.8],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.35, 0.4, -1.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffcc" emissive={0xffffaa} emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.35, 0.4, -1.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffcc" emissive={0xffffaa} emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.35, 0.4, 1.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive={0xff3300} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-0.35, 0.4, 1.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff0000" emissive={0xff3300} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
