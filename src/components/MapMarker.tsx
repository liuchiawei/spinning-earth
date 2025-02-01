import React from "react";
import { Html, useCursor } from "@react-three/drei";
import { MapPin } from "lucide-react";

interface MarkerProps {
  id: number;
  lat: number;
  lng: number;
  radius: number;
  label: string;
  title: string;
  selectedCardId: number | null;
}

interface CartesianCoords {
  x: number;
  y: number;
  z: number;
}

function latLngToCartesian(
  lat: number,
  lng: number,
  radius: number
): CartesianCoords {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return { x, y, z };
}

export default function MapMarker({
  lat,
  lng,
  radius,
  label,
  id,
  title,
  selectedCardId,
}: MarkerProps) {
  const { x, y, z } = latLngToCartesian(lat, lng, radius);
  const [hovered, setHovered] = React.useState(false);
  useCursor(hovered, "pointer", "auto");

  return (
    <mesh
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.01, 14, 14]} />
      {(hovered || selectedCardId === id) && (
        <Html >
          <div className="flex flex-col items-center justify-center gap-1 text-white text-center z-0 relative text-nowrap">
            <MapPin className="w-4 h-4" />
            <h1 className="text-lg font-bold">{title}</h1>
            <h3 className="text-sm w-full">{label}</h3>
          </div>
        </Html>
      )}
    </mesh>
  );
}
