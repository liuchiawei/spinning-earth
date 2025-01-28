import { CardItem, CardContainer, CardBody } from "./ui/3d-card";
import { Html } from "@react-three/drei";
import Image from "next/image";
import { useMobile } from "@/hook/useMobile";

export default function InfoCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const isMobile = useMobile();
  return (
    <Html
      position={isMobile ? [0, 2.2, 2.2] : [0, 2.2, 3.2]}
      className="fixed top-0 left-0  backdrop-blur-sm w-full h-full"
    >
      <CardContainer className="inter-var">
        <CardBody className="w-[320px] md:w-[400px] h-full flex flex-col items-center justify-center rounded-3xl bg-gray-50/20 gap-2 border border-white/70 text-white p-6 gap-6">
          <CardItem translateZ={20}>
            <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
          </CardItem>
          <CardItem translateZ={120}>
            <Image
              alt="Image Here."
              src={url}
              width={300}
              height={200}
              className="rounded-3xl"
            />
          </CardItem>
          <CardItem translateZ={50}>
            <h1>{description}</h1>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Html>
  );
}
