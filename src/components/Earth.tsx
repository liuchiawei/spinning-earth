import { useTexture } from "@react-three/drei";
import MapMarker from "./MapMarker";
import { CompanyProps } from "@/lib/props";

// const markers = [
//   { lat: 37.323, lng: -122.0322, label: "Cupertino", id: 1, title: "Apple"},
//   { lat: 37.4220, lng: -122.0841, label: "Mountain View", id: 2, title: "Alphabet"},
//   { lat: 47.6400, lng: -122.1300, label: "Redmond", id: 3, title: "Microsoft"},
//   { lat: 37.7749, lng: -122.4194, label: "San Francisco", id: 4, title: "Open AI"},
//   { lat: 47.6400, lng: -122.1300, label: "Seattle", id: 5, title: "Amazon"},
//   { lat: 37.7749, lng: -122.4194, label: "San Francisco", id: 6, title: "Meta"},
//   { lat: 37.7749, lng: -122.4194, label: "San Francisco", id: 7, title: "Tesla"},
//   { lat: 37.7844, lng: -122.4016, label: "San Francisco", id: 8, title: "Nvidia"},
//   { lat: 39.9042, lng: 116.3974, label: "Beijing", id: 9, title: "Byte Dance"},
//   { lat: 33.9203, lng: -118.3353, label: "Hawthorne", id: 10, title: "Space X"},
// ];

export default function Earth({
  companies,
  selectedCardId,
}: {
  companies: CompanyProps[];
  selectedCardId: number | null;
}) {
  const texture = useTexture("/material/earth-blue-marble.jpg");
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
