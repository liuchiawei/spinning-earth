import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function BentPlane() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    const mesh = meshRef.current as Mesh;
    const { array } = mesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const z = array[i + 2];
      // Apply a simple sine wave to bend the plane
      array[i + 1] = Math.sin(x * 0.5) * 0.5; // Adjust the multiplier for curvature
    }
    mesh.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}
