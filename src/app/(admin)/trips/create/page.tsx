import AddTripForm from "@/components/AddTripForm";
import Header from "@/components/Header";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const CreateTrip = async () => {
  const user = await getLoggedInUser();

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />

      <section className="mt-2.5 wrapper=md">
        <AddTripForm user={user} />
      </section>
    </main>
  );
};

export default CreateTrip;
