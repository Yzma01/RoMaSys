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
    <div className="p-5 w-full flex flex-col items-center">
      <div className="flex flex-col md:flex-row md:w-[60vw] md:justify-center gap-5 mb-5">
        <div className="flex-1">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
          <Image
            src={images[2].src}
            alt={images[2].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:w-[60vw] md:justify-between gap-5">
        <div className="flex-1">
          <Image
            src={images[3].src}
            alt={images[3].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover md:-translate-y-48 lg:-translate-y-20 xl:-translate-y-96"
          />
        </div>
        <div className="flex-1">
          <Image
            src={images[4].src}
            alt={images[4].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
