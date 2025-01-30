import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface MarkerProps {
  lat: number;
  lng: number;
  radius: number;
  label: string;
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

export default function MapMarker({ lat, lng, radius, label }: MarkerProps) {
  const { x, y, z } = latLngToCartesian(lat, lng, radius);
  const [hovered, setHovered] = React.useState(false);

  return (
    <mesh
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.02, 32, 32]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "red"} />
      {hovered && (
        <Html>
          <div
            style={{
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
};