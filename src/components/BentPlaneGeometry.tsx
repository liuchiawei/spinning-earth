import { bentPlaneGeometry } from "@react-three/drei";

export default function BentPlaneGeometry({
  args,
}: {
  args: number[];
}) {
  return <bentPlaneGeometry args={args} />;
}
