"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll } from "@react-three/drei";
import { easing } from "maath";
import "./util";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 100 }}>
      <fog attach="fog" args={["#a53", 8.5, 12]} />
      {/* pages 控制捲動速度，數量越少越快捲完一圈 */}
      <ScrollControls pages={2} infinite>
        {/* 控制自轉軸的軸心角度 x:鏡頭上下 y:沒差(因為是圓形) z:鏡頭左右 */}
        <Rig rotation={[0.2, 0, 0.15]}>
          <Carousel radius={2} count={8} />
        </Rig>
      </ScrollControls>
    </Canvas>
  );
}

function Rig(props: { children: React.ReactNode; rotation: number[] }) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current) return;
    // y軸隨時間和捲動旋轉
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = -t / 12 - scroll.offset * (Math.PI * 2); // Rotate contents
    if (state.events.update) {
      state.events.update(); // Raycasts every frame rather than on pointer-move
    }
    easing.damp3(
      state.camera.position,
      // 鏡頭移動速度
      [-state.pointer.x / 2, state.pointer.y / 4, 3],
      0.5,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
  radius = 2,
  count = 8,
}: {
  radius: number;
  count: number;
}) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({
  url,
  ...props
}: {
  url: string;
  children: React.ReactNode | undefined;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: React.MouseEvent) => (
    e.stopPropagation(), hover(true)
  );
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    if (!ref.current) return;
    // 外層容器 Image Container
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    // Container Border Radius
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.1 : 0.1,
      0.2,
      delta
    );
    // 內層圖片 Image 2: 1(縮放倍數 scale), 0.2(動畫秒數, duration), delta
    easing.damp(ref.current.material, "zoom", hovered ? 1.3 : 1, 0.2, delta);
  });
  return (
    <Image
      alt="image"
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      {/* Image 的彎曲程度 */}
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
