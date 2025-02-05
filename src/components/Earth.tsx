import { useTexture } from "@react-three/drei";
import MapMarker from "./MapMarker";
import { ListProps } from "@/lib/props";
import R3fGlobe from "r3f-globe";

export default function Earth({
  companies,
  selectedCardId,
}: {
  companies: ListProps[];
  selectedCardId: number | null;
}) {
  const texture = useTexture("/images/material/earth-blue-marble.jpg");
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {companies.map((company, index) => (
        <MapMarker
          key={index}
          {...company}
          radius={1}
          selectedCardId={selectedCardId}
        />
      ))}
    </mesh>
  );
}
