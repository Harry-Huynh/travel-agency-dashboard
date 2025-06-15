"use client";

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";

const MobileSidebar = ({ user }: { user: LoggedInUser }) => {
  let sidebar: SidebarComponent;

  const toggleSidebar = () => sidebar.toggle();

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link href="/" className="mobile-nav">
          <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
          <h1>HPH Travel</h1>
        </Link>
        <button onClick={toggleSidebar} className="cursor-pointer">
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
        </button>

        <SidebarComponent
          width={250}
          ref={(Sidebar) => (sidebar = Sidebar)}
          created={() => sidebar.hide()}
          closeOnDocumentClick={true}
          showBackdrop={true}
          type="Over"
        >
          <NavItems handleClick={toggleSidebar} user={user} />
        </SidebarComponent>
      </header>
    </div>
  );
};

export default MobileSidebar;
