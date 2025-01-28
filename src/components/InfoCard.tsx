import { CardItem, CardContainer, CardBody } from "./ui/3d-card";
import { Html } from "@react-three/drei";
import Image from "next/image";

export default function InfoCard() {
  return (
    <Html
      position={[0, 0, 0]}
      className="fixed"
    >
      <CardContainer className="fixed bottom-0 right-10">
        <CardBody className="w-[240px] h-[180px] md:w-[400px] md:h-[300px] flex flex-col items-center justify-center rounded-3xl bg-white/50">
          <CardItem translateZ={20}>
            <h1>Title</h1>
          </CardItem>
          <CardItem translateZ={100}>
            <Image
              alt="Image Here."
              src="/img1_.jpg"
              width={200}
              height={200}
              className="rounded-3xl"
            />
            <h1>Image Here.</h1>
          </CardItem>
          <CardItem translateZ={50}>
            <h1>Description Here.</h1>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Html>
  );
}
