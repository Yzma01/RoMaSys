import Image from "next/image";
import { fifth, first, fourth, second, third } from "@/public/images";
const images = [
  {
    src: first,
    alt: "Gym Interior 1",
    credit: "Credit: skynesher",
  },
  {
    src: second,
    alt: "People training with kettlebells",
    credit: "Credit: nortonrsx",
  },
  {
    src: third,
    alt: "People running on treadmills",
    credit: "Credit: skynesher",
  },
  {
    src: fourth,
    alt: "Dumbbell with water bottle",
    credit: "Credit: AnnaNisk",
  },
  {
    src: fifth,
    alt: "Man lifting weights",
    credit: "Credit: nortonrsx",
  },
];

export function GalerieDisplay() {
  return (
    <div className="justify-center items-center p-5 w-[100vw]">
      <div className="flex justify-center w-[90vw] m-5 gap-5">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          layout="responsive"
          width={800}
          height={600}
          className="rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center gap-5 w-[45vw]">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            layout="responsive"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
          <Image
            src={images[2].src}
            alt={images[2].alt}
            layout="responsive"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row -mt-5">

      <div className="flex justify-center flex-row m-5 gap-5 w-[45vw]">
        <Image
          src={images[3].src}
          alt={images[3].alt}
          layout="responsive"
          width={800}
          height={600}
          className="rounded-lg object-cover"
          />
      </div>
      <div className="flex justify-center flex-row m-5 gap-5 w-[45vw]">
        <Image
          src={images[4].src}
          alt={images[4].alt}
          layout="responsive"
          width={800}
          height={600}
          className="rounded-lg object-cover"
        />
      </div>
          </div>
    </div>
  );
}
