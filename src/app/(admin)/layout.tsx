import MainNav from "@/components/MainNav";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="admin-layout">
      MobileSidebar
      <aside className="w-full max-w-[270px] hidden lg:block">
        <MainNav />
      </aside>
      <aside className="children">{children}</aside>
    </div>
  );
};

export default AdminLayout;
