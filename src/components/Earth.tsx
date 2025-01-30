import { useTexture } from "@react-three/drei";
import MapMarker from "./MapMarker";

const markers = [
  { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
];

export default function Earth() {
  const texture = useTexture("/material/earth-blue-marble.jpg");
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {markers.map((marker, index) => (
        <MapMarker key={index} {...marker} radius={1.05} />
      ))}
    </mesh>
  );
}
