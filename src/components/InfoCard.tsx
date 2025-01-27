import { CardItem, CardContainer, CardBody } from "./ui/3d-card";

export default function InfoCard() {
  return (
    <CardContainer className="fixed bottom-0 right-10 border">
      <CardBody className="w-[240px] h-[180px] md:w-[400px] md:h-[300px] flex flex-col items-center justify-center origin-[10%_60%]">
        <CardItem translateZ={20}>
          <h1>Title</h1>
        </CardItem>
        <CardItem translateZ={100}>
          <h1>Image Here.</h1>
        </CardItem>
        <CardItem translateZ={50}>
          <h1>Description Here.</h1>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
