import Chart from "@/components/Chart";
import DashboardTable from "@/components/DashboardTable";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import TripCard from "@/components/TripCard";
import {
  getAllTrips,
  getAllUsers,
  getLoggedInUser,
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "@/lib/actions/user.actions";
import { parseTripData } from "@/lib/utils";

const Dashboard = async () => {
  const [user, dashboardStats, trips, userGrowth, tripsByTravelStyle, users] =
    await Promise.all([
      getLoggedInUser(),
      getUsersAndTripsStats(),
      getAllTrips(4, 0),
      getUserGrowthPerDay(),
      getTripsByTravelStyle(),
      getAllUsers(4, 0),
    ]);

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
    dashboardStats;

  const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));

  const mappedTrips = allTrips.map((trip) => ({
    imageUrl: trip.imageUrls[0],
    name: trip.name,
    interest: trip.interests,
  }));

  const allUsers = users.allUsers?.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10),
  }));

  const usersAndTrips = [
    {
      title: "Latest user signup",
      dataSource: allUsers,
      field: "count",
      headerText: "Trips created",
    },
    {
      title: "Trips based on interests",
      dataSource: mappedTrips,
      field: "interest",
      headerText: "Interests",
    },
  ];

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name || "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />

          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />

          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

        <div className="trip-grid">
          {allTrips.map(
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
                key={id}
                id={id.toString()}
                name={name!}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location || ""}
                tags={[interests, travelStyle] as string[]}
                price={estimatedPrice!}
              />
            )
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Chart userGrowth={userGrowth} tripByTravelStyle={tripsByTravelStyle} />
      </section>

      <section className="user-trip wrapper">
        {usersAndTrips.map(({ title, dataSource, field, headerText }, i) => (
          <div key={i} className="flex flex-col gap-5">
            <h3 className="p-20-semibold text-dark-100">{title}</h3>

            <DashboardTable
              dataSource={dataSource ?? []}
              field={field}
              headerText={headerText}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
