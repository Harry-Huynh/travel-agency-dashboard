"use client";

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import NavItems from "./NavItems";

const MainNav = () => {
  return (
    <SidebarComponent width={270} enableGestures={false}>
      <NavItems />
    </SidebarComponent>
  );
};

export default MainNav;
