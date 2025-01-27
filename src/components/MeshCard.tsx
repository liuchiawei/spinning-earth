import React from "react";
import { Text, Image, useTexture } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

interface MeshCardProps {
  title: string;
  imageUrl: string;
  description: string;
}

export default function MeshCard({ title, imageUrl, description }: MeshCardProps) {
  const texture = useTexture(imageUrl);

  const floatingProps = useSpring({
    position: [0, 0.02, 0],
    config: { mass: 1, tension: 150, friction: 20 },
    loop: { reverse: true },
  });

  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 3, 8, 8]} />
        <meshStandardMaterial color={"#222"} />
      </mesh>

      {/* Title (Floating) */}
      <a.group position={[0, 1, 0]} {...floatingProps}>
        <Text fontSize={0.2} color={"white"} anchorX="center" anchorY="middle">
          {title}
        </Text>
      </a.group>

      {/* Image (Floating) */}
      <a.group position={[0, 0.4, 0]} {...floatingProps}>
        <Image texture={texture} scale={[1.5, 1]} alt={title} />
      </a.group>

      {/* Description (Floating) */}
      <a.group position={[0, -1, 0]} {...floatingProps}>
        <Text
          fontSize={0.15}
          color={"lightgray"}
          anchorX="center"
          anchorY="middle"
        >
          {description}
        </Text>
      </a.group>
    </group>
  );
}
