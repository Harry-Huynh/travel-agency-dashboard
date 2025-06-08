"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = ({ title, description }: HeaderProps) => {
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
    </header>
  );
};

export default Header;
