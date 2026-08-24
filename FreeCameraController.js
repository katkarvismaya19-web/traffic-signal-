import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function FreeCameraController({ speed = 0.3, lookSpeed = 0.002 }) {
  const { camera, gl } = useThree();
  const keys = useRef({});
  const pitch = useRef(0);
  const yaw = useRef(0);
  const pointerLocked = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;
    const requestPointerLock = () => canvas.requestPointerLock();
    const pointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === canvas;
    };
    canvas.addEventListener("click", requestPointerLock);
    document.addEventListener("pointerlockchange", pointerLockChange);
    return () => {
      canvas.removeEventListener("click", requestPointerLock);
      document.removeEventListener("pointerlockchange", pointerLockChange);
    };
  }, [gl]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!pointerLocked.current) return;
      yaw.current -= e.movementX * lookSpeed;
      pitch.current -= e.movementY * lookSpeed;
      pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [lookSpeed]);

  useEffect(() => {
    const handleKey = (e, val) => keys.current[e.key.toLowerCase()] = val;
    window.addEventListener("keydown", e => handleKey(e, true));
    window.addEventListener("keyup", e => handleKey(e, false));
    return () => {
      window.removeEventListener("keydown", e => handleKey(e, true));
      window.removeEventListener("keyup", e => handleKey(e, false));
    };
  }, []);

  useFrame(() => {
    const quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, "YXZ"));
    camera.quaternion.copy(quaternion);

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    if (keys.current["w"]) camera.position.add(forward.clone().multiplyScalar(speed));
    if (keys.current["s"]) camera.position.add(forward.clone().multiplyScalar(-speed));
    if (keys.current["a"]) camera.position.add(right.clone().multiplyScalar(-speed));
    if (keys.current["d"]) camera.position.add(right.clone().multiplyScalar(speed));
    if (keys.current[" "]) camera.position.y += speed;
    if (keys.current["shift"]) camera.position.y -= speed;
  });

  return null;
}
