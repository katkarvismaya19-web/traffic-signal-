// TrafficLight.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function TrafficLight({ position, rotationY = 0, carSignal, pedSignal }) {
  const redRef = useRef();
  const yellowRef = useRef();
  const greenRef = useRef();
  const pedRedRef = useRef();
  const pedGreenRef = useRef();

  useFrame(() => {
    if (redRef.current) redRef.current.material.emissive.setHex(carSignal === "red" ? 0x8B0000 : 0x000000);
    if (yellowRef.current) yellowRef.current.material.emissive.setHex(carSignal === "yellow" ? 0xBA8E23 : 0x000000);
    if (greenRef.current) greenRef.current.material.emissive.setHex(carSignal === "green" ? 0x013220 : 0x000000);
    if (pedRedRef.current) pedRedRef.current.material.emissive.setHex(pedSignal === "red" ? 0x8B0000 : 0x000000);
    if (pedGreenRef.current) pedGreenRef.current.material.emissive.setHex(pedSignal === "green" ? 0x013220 : 0x000000);
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 4, 16]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Main light box */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Car Lights */}
      <mesh ref={redRef} position={[0, 5.3, 0.32]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#330000" emissive={0xff0000} emissiveIntensity={2} />
      </mesh>
      <mesh ref={yellowRef} position={[0, 4.85, 0.32]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#333300" emissive={0x000000} emissiveIntensity={2} />
      </mesh>
      <mesh ref={greenRef} position={[0, 4.45, 0.32]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#003300" emissive={0x000000} emissiveIntensity={2} />
      </mesh>

      {/* Pedestrian Light Box */}
      <mesh position={[1, 4.3, 0]}>
        <boxGeometry args={[0.45, 1.0, 0.45]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Pedestrian Lights */}
      <mesh ref={pedRedRef} position={[1, 4.7, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#330000" emissive={0xff0000} emissiveIntensity={2} />
      </mesh>
      <mesh ref={pedGreenRef} position={[1, 3.9, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#003300" emissive={0x00ff00} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}
