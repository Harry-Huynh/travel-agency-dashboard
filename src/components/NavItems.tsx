import { sidebarItems } from "@/constants";
import { logoutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavItems = ({
  handleClick,
  user,
}: {
  handleClick?: () => void;
  user: UserData;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/sign-in");
  };

  return (
    <section className="nav-items">
      <Link href="/" className="link-logo">
        <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
        <h1>HPH Travel</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => {
            const isActive = pathname === href || pathname.startsWith(href);

            return (
              <Link href={href} key={id}>
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 !text-white": isActive,
                  })}
                  onClick={handleClick}
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={20}
                    height={20}
                    className={`group-hover:brightness-0 group-hover:invert ${
                      isActive ? "brightness-0 invert" : ""
                    }`}
                  />

                  {label}
                </div>
              </Link>
            );
          })}
        </nav>

        <footer className="nav-footer">
          <Image
            src={user?.imageUrl || "/images/david.webp"}
            alt={user?.name || "David"}
            width={100}
            height={100}
          />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button
            onClick={handleLogout}
            className="cursor-pointer relative size-6"
          >
            <Image src="/icons/logout.svg" alt="logout" fill />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
