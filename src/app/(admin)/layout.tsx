import MainNav from "@/components/MainNav";
import MobileSidebar from "@/components/MobileSidebar";
import { getLoggedInUser, validateAdminUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const result = await validateAdminUser();

  if (result && result.redirectTo) {
    redirect(result.redirectTo);
  }

  const loggedInUser = await getLoggedInUser();

  return (
    <div className="admin-layout">
      <MobileSidebar user={loggedInUser} />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <MainNav user={loggedInUser} />
      </aside>
      <aside className="children">{children}</aside>
    </div>
  );
};

export default AdminLayout;
