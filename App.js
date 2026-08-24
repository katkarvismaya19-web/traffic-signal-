import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { ControlPanel } from "./ControlPanel";
import { SceneObjects } from "./SceneObjects";
import { FreeCameraController } from "./FreeCameraController";

export default function App() {
  const roadWidth = 12;

  const [trees] = useState(() => {
    const arr = [];
    while (arr.length < 10) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      if (Math.abs(x) > roadWidth / 2 + 2 && Math.abs(z) > roadWidth / 2 + 2) arr.push([x, 0, z]);
    }
    return arr;
  });

  const [stones] = useState(() => {
    const arr = [];
    while (arr.length < 15) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      if (Math.abs(x) > roadWidth / 2 + 2 && Math.abs(z) > roadWidth / 2 + 2) arr.push([x, 0, z]);
    }
    return arr;
  });

  const [trafficState, setTrafficState] = useState({
    signalNS: "green",
    signalEW: "red",
    pedSignalNS: "red",
    pedSignalEW: "green",
  });

  // Fetch traffic state from RPC server every second
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch("http://localhost:3001/getTrafficState");
        const data = await res.json();
        setTrafficState(data);
      } catch (err) {
        console.error("Failed to fetch traffic state:", err);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => clearInterval(interval);
  }, []);

  // RPC toggle functions
  const toggleNS = () => fetch("http://localhost:3001/toggleNS", { method: "POST" });
  const toggleEW = () => fetch("http://localhost:3001/toggleEW", { method: "POST" });

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", backgroundColor: "#a0d8f1" }}>
      <ControlPanel
        toggleNS={toggleNS}
        toggleEW={toggleEW}
        signalNS={trafficState.signalNS}
        signalEW={trafficState.signalEW}
        pedSignalNS={trafficState.pedSignalNS}
        pedSignalEW={trafficState.pedSignalEW}
      />

      <Canvas shadows camera={{ position: [30, 20, 30], fov: 55 }}>
        {/* Sky */}
        <Sky distance={450000} sunPosition={[5, 1, 8]} inclination={0.49} azimuth={0.25} turbidity={10} rayleigh={0.5} />

        {/* Lights */}
        <ambientLight intensity={0.4} color="#ffd8a8" />
        <hemisphereLight skyColor="#ffcc99" groundColor="#228833" intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[83, 83, 50, 50]} />
          <meshStandardMaterial
            color="#3cb043"
            roughness={1}
            metalness={0.3}
            flatShading
            emissive="#1d5e20"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Scene Objects */}
        <SceneObjects
          trees={trees}
          stones={stones}
          signalNS={trafficState.signalNS}
          signalEW={trafficState.signalEW}
          pedSignalNS={trafficState.pedSignalNS}
          pedSignalEW={trafficState.pedSignalEW}
        />

        {/* Free camera */}
        <FreeCameraController speed={0.5} lookSpeed={0.002} />
      </Canvas>
    </div>
  );
}
