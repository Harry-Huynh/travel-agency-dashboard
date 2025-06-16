"use client";

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import NavItems from "./NavItems";

const MainNav = ({ user }: { user: UserData }) => {
  return (
    <SidebarComponent width={270} enableGestures={false}>
      <NavItems user={user} />
    </SidebarComponent>
  );
};

export default MainNav;
