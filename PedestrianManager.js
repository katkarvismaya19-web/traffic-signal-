import React, { useState, useEffect } from "react";
import { Pedestrian } from "./Pedestrian";

export function PedestrianManager({ pedSignal, crossingOf, direction, max = 6, spawnInterval = 2000 }) {
  const [pedestrians, setPedestrians] = useState([]);

  const computeStartPosition = () => {
    const offset = 6.5;
    switch (direction) {
      case "NS": return [offset, 0.5, 7];
      case "SN": return [-offset, 0.5, -7];
      case "EW": return [7, 0.5, offset];
      case "WE": return [-7, 0.5, -offset];
      default: return [0, 0.5, 0];
    }
  };

  useEffect(() => {
    if (pedSignal !== "green") return;
    const allowedDirections = crossingOf === "NS" ? ["EW", "WE"] : ["NS", "SN"];
    if (!allowedDirections.includes(direction)) return;

    const id = setInterval(() => {
      setPedestrians(prev => prev.length >= max ? prev : [...prev, {
        id: Date.now() + Math.random(),
        startPosition: computeStartPosition(),
        direction
      }]);
    }, spawnInterval + Math.random() * 1000);

    return () => clearInterval(id);
  }, [pedSignal, crossingOf, direction, max, spawnInterval]);

  const removePedestrian = (id) => setPedestrians(prev => prev.filter(p => p.id !== id));

  return (
    <>
      {pedestrians.map(p => (
        <Pedestrian
          key={p.id}
          startPosition={p.startPosition}
          direction={p.direction}
          canCross={pedSignal === "green"}
          onFinish={() => removePedestrian(p.id)}
        />
      ))}
    </>
  );
}
