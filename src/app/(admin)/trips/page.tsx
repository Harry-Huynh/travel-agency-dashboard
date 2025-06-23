import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import TripCard from "@/components/TripCard";
import { getAllTrips } from "@/lib/actions/user.actions";
import { parseTripData } from "@/lib/utils";

const Trips = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const page = parseInt((await searchParams).page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  const trips = allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">
          Manage Created Trips
        </h1>

        <div className="trip-grid mb-4">
          {trips.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name ?? ""}
                location={itinerary?.[0].location ?? ""}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle] as string[]}
                price={estimatedPrice ?? ""}
              />
            )
          )}
        </div>

        <Pagination total={total} page={page} />
      </section>
    </main>
  );
};

export default Trips;
