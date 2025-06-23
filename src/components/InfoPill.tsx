import Image from "next/image";
import React from "react";

const InfoPill = ({ text, image }: InfoPillProps) => {
  return (
    <figure className="info-pill">
      <Image src={image} alt={text} width={20} height={20} />

      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
