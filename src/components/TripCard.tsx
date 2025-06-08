"use client";

import { cn, getFirstWord } from "@/lib/utils";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={
        pathname === "/" || pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/trips/${id}`
      }
      className="trip-card"
    >
      <Image src={imageUrl} alt={name} width={1000} height={1000} />

      <article>
        <h2>{name}</h2>

        <figure>
          <Image
            src="/icons/location-mark.svg"
            alt="location"
            width={16}
            height={16}
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(tag)}
                cssClass={cn(
                  index === 1
                    ? "!bg-pink-50 !text-pink-500"
                    : "!bg-success-50 !text-success-700"
                )}
              ></ChipDirective>
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>

      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
