import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export function Pedestrian({ startPosition, direction, canCross, onFinish }) {
  const pedRef = useRef();
  const [crossingStarted, setCrossingStarted] = useState(false);
  const speed = 0.3;

  useFrame(() => {
    if (!pedRef.current) return;
    if (canCross && !crossingStarted) setCrossingStarted(true);

    if (crossingStarted) {
      switch (direction) {
        case "NS":
          pedRef.current.position.z -= speed;
          if (pedRef.current.position.z < -6) onFinish();
          break;
        case "SN":
          pedRef.current.position.z += speed;
          if (pedRef.current.position.z > 6) onFinish();
          break;
        case "EW":
          pedRef.current.position.x -= speed;
          if (pedRef.current.position.x < -6) onFinish();
          break;
        case "WE":
          pedRef.current.position.x += speed;
          if (pedRef.current.position.x > 6) onFinish();
          break;
      }
    }
  });

  const rotationY = (() => {
    switch (direction) {
      case "EW": return -Math.PI / 2;
      case "WE": return Math.PI / 2;
      default: return 0;
    }
  })();

  return (
    <group ref={pedRef} position={startPosition} rotation-y={rotationY}>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.3]} />
        <meshStandardMaterial color={canCross ? "orange" : "gray"} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffe0bd" />
      </mesh>
      <mesh position={[-0.35, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0.35, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0.15, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}
