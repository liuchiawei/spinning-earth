"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame} from "@react-three/fiber";
import {
  Image,
  useScroll,
  useCursor,
  Billboard,
  Text,
  ScrollControls,
  OrbitControls,
  Environment,
  Loader,
} from "@react-three/drei";
import { easing } from "maath";
import "./util";

export default function SpinCarousel() {
  // stop other eventlistener when orbiting
  const [isOrbiting, setIsOrbiting] = useState(false);
  const handleStart = () => setIsOrbiting(true);
  const handleEnd = () => setIsOrbiting(false);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <OrbitControls
          onStart={handleStart}
          onEnd={handleEnd}
          enableZoom={false} // 禁用缩放
          minAzimuthAngle={-Infinity} // 允许水平旋转的最小角度
          maxAzimuthAngle={Infinity} // 允许水平旋转的最大角度
          minPolarAngle={0} // 允许垂直旋转的最小角度
          maxPolarAngle={Math.PI} // 允许垂直旋转的最大角度
        />
        <fog attach="fog" args={["#a53", 8.5, 12]} />
        {/* pages 控制捲動速度，數量越少越快捲完一圈 */}
        <ScrollControls pages={2} infinite>
          {/* 控制自轉軸的軸心角度 x:鏡頭上下 y:沒差(因為是圓形) z:鏡頭左右 */}
          <Rig rotation={new THREE.Euler(0.2, 0, 0.15)}>
            <Carousel radius={2.4} count={db.length} isOrbiting={isOrbiting} />
          </Rig>
        </ScrollControls>
        <Environment
          preset="dawn" // 背景預設圖片
          background={true} // 背景是否顯示
          backgroundBlurriness={0.55} // 背景模糊程度
          backgroundIntensity={0.015} // 背景亮度
          backgroundRotation={[0.8, 3.2, 0.5]} // 背景旋轉
        />
      </Canvas>
      {/* TODO: Loader style */}
      <Loader
        barStyles={{ background: "#000", color: "#fff" }}
        dataStyles={{ color: "red" }}
      />
    </>
  );
}

function Rig(props: { children: React.ReactNode; rotation: THREE.Euler }) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!ref.current) return;
    // y軸隨時間和捲動旋轉
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = -t / 12 - scroll.offset * (Math.PI * 2); // Rotate contents
    if (state.events.update) {
      state.events.update(); // Raycasts every frame rather than on pointer-move
    }
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
  radius,
  count,
  isOrbiting,
}: {
  radius: number;
  count: number;
  isOrbiting: boolean;
}) {
  return db.map((item, i) => (
    <Card
      key={i}
      url={item.url}
      title={item.title}
      isOrbiting={isOrbiting}
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
  title,
  isOrbiting,
  ...props
}: {
  url: string;
  title: string;
  isOrbiting: boolean;
  children: React.ReactNode | undefined;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  // 讓游標在 hover 時顯示 pointer 指標，並在 hover 結束時恢復指標
  useCursor(hovered, "pointer", "auto");

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
    <group
      {...props}
      onPointerOver={(e) => {
        if (isOrbiting) return;
        if (!isOrbiting) {
          e.stopPropagation();
          setHovered(true);
        }
      }}
      onPointerOut={(e) => {
        if (isOrbiting) return;
        if (!isOrbiting) {
          e.stopPropagation();
          setHovered(false);
        }
      }}
    >
      <Image
        alt="image"
        ref={ref}
        url={url}
        transparent
        side={THREE.DoubleSide}
      >
        {/* Image 的彎曲程度 */}
        <bentPlaneGeometry args={[0.08, 1, 1, 20, 1]} />
      </Image>
      {hovered && (
        <Billboard position={[0, 1, 0.1]}>
          <Text fontSize={0.2} anchorX="center" anchorY="middle">
            {title}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

const db: {
  title: string;
  description: string;
  url: string;
}[] = [
  {
    title: "No.1 新宿",
    description: "東京最熱鬧的購物區",
    url: "/img1_.jpg",
  },
  {
    title: "No.2 澀谷",
    description: "東京最潮的購物區",
    url: "/img2_.jpg",
  },
  {
    title: "No.3 原宿",
    description: "東京最潮的購物區",
    url: "/img3_.jpg",
  },
  {
    title: "No.4 表參道",
    description: "東京最潮的購物區",
    url: "/img4_.jpg",
  },
  {
    title: "No.5 代代木",
    description: "東京最潮的購物區",
    url: "/img5_.jpg",
  },
  {
    title: "No.6 六本木",
    description: "東京最潮的購物區",
    url: "/img6_.jpg",
  },
  {
    title: "No.7 銀座",
    description: "東京最潮的購物區",
    url: "/img7_.jpg",
  },
  {
    title: "No.8 池袋",
    description: "東京最潮的購物區",
    url: "/img8_.jpg",
  },
  {
    title: "No.9 上野",
    description: "東京最潮的購物區",
    url: "/img9_.jpg",
  },
  {
    title: "No.10 淺草",
    description: "東京最潮的購物區",
    url: "/img10_.jpg",
  },
];
