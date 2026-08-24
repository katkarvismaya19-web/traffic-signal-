import React from "react";
import { Car } from "./Car";
import { Tree } from "./Tree";
import { Stone } from "./Stone";
import { TrafficLight } from "./TrafficLight"; // ✅ named impor
import { PedestrianManager } from "./PedestrianManager";
import { Road } from "./Road";

export function SceneObjects({ trees, stones, signalNS, signalEW, pedSignalNS, pedSignalEW }) {
    const ewCars = React.useMemo(() => Array.from({ length: 3 }, (_, i) => [40 - i * 10, 0.25, -3, "EW"]), []);
    const weCars = React.useMemo(() => Array.from({ length: 3 }, (_, i) => [-40 + i * 10, 0.25, 3, "WE"]), []);
    const nsCars = React.useMemo(() => Array.from({ length: 3 }, (_, i) => [3, 0.25, 40 - i * 10, "NS"]), []);
    const snCars = React.useMemo(() => Array.from({ length: 3 }, (_, i) => [-3, 0.25, -40 + i * 10, "SN"]), []);


  return (
    <>
      <Road />
      {trees.map((pos, i) => <Tree key={i} position={pos} />)}
      {stones.map((pos, i) => <Stone key={i} position={pos} />)}

      <TrafficLight position={[-6, 0, 6]} rotationY={Math.PI} carSignal={signalNS} pedSignal={pedSignalNS} />
      <TrafficLight position={[6, 0, -6]} rotationY={0} carSignal={signalNS} pedSignal={pedSignalNS} />
      <TrafficLight position={[-6, 0, -6]} rotationY={-Math.PI / 2} carSignal={signalEW} pedSignal={pedSignalEW} />
      <TrafficLight position={[6, 0, 6]} rotationY={Math.PI / 2} carSignal={signalEW} pedSignal={pedSignalEW} />

      {ewCars.map(([x, y, z, d], i) => <Car key={`EW-${i}`} position={[x, y, z]} direction={d} signal={signalEW} />)}
      {weCars.map(([x, y, z, d], i) => <Car key={`WE-${i}`} position={[x, y, z]} direction={d} signal={signalEW} />)}
      {nsCars.map(([x, y, z, d], i) => <Car key={`NS-${i}`} position={[x, y, z]} direction={d} signal={signalNS} />)}
      {snCars.map(([x, y, z, d], i) => <Car key={`SN-${i}`} position={[x, y, z]} direction={d} signal={signalNS} />)}

      <PedestrianManager crossingOf="NS" pedSignal={pedSignalNS} direction="EW" />
      <PedestrianManager crossingOf="NS" pedSignal={pedSignalNS} direction="WE" />
      <PedestrianManager crossingOf="EW" pedSignal={pedSignalEW} direction="NS" />
      <PedestrianManager crossingOf="EW" pedSignal={pedSignalEW} direction="SN" />
    </>
  );
}
