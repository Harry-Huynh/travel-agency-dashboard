"use client";

import { cn } from "@/lib/utils";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ title, description, ctaText, ctaUrl }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            pathname === "/"
              ? "text-2xl md:text-4xl font-bold"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            pathname === "/" ? "text-base md:text-lg" : "text-sm md:text-lg"
          )}
        >
          {description}
        </p>
      </article>

      {ctaText && ctaUrl && (
        <Link href={ctaUrl}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full md:w-[240px]"
          >
            <Image src="/icons/plus.svg" alt="plus" width="20" height="20" />
            <span className="p-16-semibold text-white">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;
