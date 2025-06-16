import Header from "@/components/Header";
import UserTable from "@/components/UserTable";
import { getAllUsers } from "@/lib/actions/user.actions";

const AllUsers = async () => {
  const { allUsers } = await getAllUsers(10, 0);

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />

      <UserTable users={allUsers ?? []} />
    </main>
  );
};

export default AllUsers;
