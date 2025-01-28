import { CardItem, CardContainer, CardBody } from "./ui/3d-card";
import { Html } from "@react-three/drei";
import Image from "next/image";

export default function InfoCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Html
      position={[0, 0, 0]}
      className="fixed top-1/2 left-0 -translate-y-1/2"
    >
      <CardContainer className="inter-var">
        <CardBody className="w-[240px] h-[180px] md:w-[400px] md:h-[300px] flex flex-col items-center justify-center rounded-3xl bg-gray-50/50 gap-2 border border-white/70 text-white">
          <CardItem translateZ={20}>
            <h1 className="text-2xl font-bold">{title}</h1>
          </CardItem>
          <CardItem translateZ={100}>
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
