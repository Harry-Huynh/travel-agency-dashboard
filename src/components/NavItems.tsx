import Image from "next/image";
import Link from "next/link";

const NavItems = () => {
  return (
    <section className="nav-items">
      <Link href="/" className="link-logo">
        <Image src="/icons/logo.svg/" alt="logo" width={30} height={30} />
        <h1>HPH Travel</h1>
      </Link>
    </section>
  );
};

export default NavItems;
