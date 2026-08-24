import React from "react";

export function Road() {
  const roadWidth = 12;
  const roadLength = 80;
  const dividerZ = Array.from({ length: 16 }, (_, i) => -40 + i * 5);
  const dividerX = Array.from({ length: 16 }, (_, i) => -40 + i * 5);
  const laneZ = Array.from({ length: 8 }, (_, i) => -40 + i * 10);
  const laneX = Array.from({ length: 8 }, (_, i) => -40 + i * 10);
  const crossOffsets = [-roadWidth / 2 - 0.8, roadWidth / 2 + 0.8];
  const zebraStripeCount = 10;
  const zebraStripeLength = 0.8;
  const zebraGap = 0.2;

  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[roadWidth, 0.1, roadLength]} />
        <meshStandardMaterial color="#2b2b2b" />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[roadLength, 0.1, roadWidth]} />
        <meshStandardMaterial color="#2b2b2b" />
      </mesh>

      {dividerZ.map((z, i) => (
        <mesh key={`dividerZ-${i}`} position={[0, 0.11, z]}>
          <boxGeometry args={[0.5, 0.02, 2]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
      ))}
      {dividerX.map((x, i) => (
        <mesh key={`dividerX-${i}`} position={[x, 0.11, 0]}>
          <boxGeometry args={[2, 0.02, 0.5]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
      ))}

      {/* Lane markers */}
      {laneZ.map((z, i) => (
        <mesh key={`laneZ-${i}`} position={[1.8, 0.11, z]}>
          <boxGeometry args={[0.3, 0.02, 4]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      ))}
      {laneZ.map((z, i) => (
        <mesh key={`laneZ2-${i}`} position={[-1.8, 0.11, z]}>
          <boxGeometry args={[0.3, 0.02, 4]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      ))}
      {laneX.map((x, i) => (
        <mesh key={`laneX-${i}`} position={[x, 0.11, 1.8]}>
          <boxGeometry args={[4, 0.02, 0.3]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      ))}
      {laneX.map((x, i) => (
        <mesh key={`laneX2-${i}`} position={[x, 0.11, -1.8]}>
          <boxGeometry args={[4, 0.02, 0.3]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      ))}

      {/* Zebra crossings */}
      {crossOffsets.map((xOffset, idx) =>
        Array.from({ length: zebraStripeCount }, (_, i) => (
          <mesh key={`zebraZ-${idx}-${i}`} position={[xOffset, 0.12, (i - zebraStripeCount / 2) * (zebraStripeLength + zebraGap)]}>
            <boxGeometry args={[0.7, 0.02, zebraStripeLength]} />
            <meshStandardMaterial color="#fff" roughness={0.6} />
          </mesh>
        ))
      )}
      {crossOffsets.map((zOffset, idx) =>
        Array.from({ length: zebraStripeCount }, (_, i) => (
          <mesh key={`zebraX-${idx}-${i}`} position={[(i - zebraStripeCount / 2) * (zebraStripeLength + zebraGap), 0.12, zOffset]}>
            <boxGeometry args={[zebraStripeLength, 0.02, 0.7]} />
            <meshStandardMaterial color="#fff" roughness={0.6} />
          </mesh>
        ))
      )}
    </group>
  );
}
