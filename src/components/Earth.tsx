import { useTexture } from "@react-three/drei";

export default function Earth() {
  const texture = useTexture("/material/earth-blue-marble.jpg");
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
