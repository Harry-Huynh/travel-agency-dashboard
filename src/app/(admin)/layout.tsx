import MainNav from "@/components/MainNav";
import MobileSidebar from "@/components/MobileSidebar";
import { validateAdminUser } from "@/lib/actions/user.actions";
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

  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <MainNav />
      </aside>
      <aside className="children">{children}</aside>
    </div>
  );
};

export default AdminLayout;
