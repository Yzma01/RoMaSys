import Image from "next/image";
import { fifth, first, fourth, second, third } from "@/public/images";

const images = [
  {
    src: first,
    alt: "Gym Interior 1",
    credit: "Credit: Niger Gym",
  },
  {
    src: second,
    alt: "Gym Interior 2",
    credit: "Credit: Niger Gym",
  },
  {
    src: third,
    alt: "Gym Interior 3",
    credit: "Credit: Niger Gym",
  },
  {
    src: fourth,
    alt: "Gym Interior 4",
    credit: "Credit: Niger Gym",
  },
  {
    src: fifth,
    alt: "Gym Interior 5",
    credit: "Credit: Niger Gym",
  },
];

export function GalerieDisplay() {
  return (
    <div className="p-5 w-full flex flex-col items-center gap-5">
      
      {/* Top row - 2 images */}
      <div className="flex flex-col md:flex-row md:w-[60vw] gap-5">
        <div className="flex-1">
          <Image
            src={images[2].src}
            alt={images[2].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-md shadow-black"
          />
        </div>
        <div className="flex-1">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-md shadow-black"
          />
        </div>
      </div>

      {/* Center - big image */}
      <div className="w-full md:w-[60vw]">
      <Image
            src={images[0].src}
            alt={images[0].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-md shadow-black sm:w-96"
          />
      </div>

      {/* Bottom row - 2 images */}
      <div className="flex flex-col md:flex-row md:w-[60vw] gap-5">
        <div className="flex-1">
          <Image
            src={images[3].src}
            alt={images[3].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-md shadow-black"
          />
        </div>
        <div className="flex-1">
          <Image
            src={images[4].src}
            alt={images[4].alt}
            layout="responsive"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-md shadow-black"
          />
        </div>
      </div>

    </div>
  );
}
