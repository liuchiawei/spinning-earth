import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ProductDataProps } from "@/lib/props";

export default function ProductCard({
  className,
  data,
}: {
  className?: string;
  data: ProductDataProps[];
}) {
  return (
    <Card className={cn(className, "flex flex-col items-center px-4 pb-4")}>
      <CardHeader className="text-center">
        <CardTitle>主な製品・サービス</CardTitle>
        <CardDescription>主な製品・サービス</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-2">
        <Image
          src={data[0].productImage}
          alt={data[0].productName}
          width={300}
          height={300}
        />
        <h6 className="text-center text-sm">{data[0].productName}</h6>
      </CardContent>
      <CardFooter>
        <p className="text-justify">{data[0].productDescription}</p>
      </CardFooter>
    </Card>
  );
}
