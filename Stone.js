import React from "react";

export function Stone({ position }) {
  return (
    <mesh position={position}>
      <dodecahedronGeometry args={[Math.random() * 0.8 + 0.3, 0]} />
      <meshStandardMaterial color="#555555" roughness={0.9} />
    </mesh>
  );
}
