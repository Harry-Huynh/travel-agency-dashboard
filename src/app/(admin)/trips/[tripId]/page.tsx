import ChipList from "@/components/ChipList";
import Header from "@/components/Header";
import InfoPill from "@/components/InfoPill";
import SingleChip from "@/components/SingleChip";
import TripCard from "@/components/TripCard";
import { getAllTrips, getTripById } from "@/lib/actions/user.actions";
import { cn, parseTripData } from "@/lib/utils";
import Image from "next/image";

const TripDetail = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;

  // Get all trips and specific trip at the same time
  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);

  const { imageUrls } = trip;

  const tripData = parseTripData(trip.tripDetail);

  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};

  const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetail),
    imageUrls: imageUrls ?? [],
  }));

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    {
      title: "Best Time to Visit:",
      items: bestTimeToVisit,
    },
    {
      title: "Weather:",
      items: weatherInfo,
    },
  ];

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>

          <div>
            <InfoPill
              text={`${duration} day plan`}
              image="/icons/calendar.svg"
            />

            <InfoPill
              text={
                itinerary
                  ?.slice(0, 4)
                  .map((item) => item.location)
                  .join(", ") || " "
              }
              image="/icons/location-mark.svg"
            />
          </div>
        </header>

        <section className="gallery">
          {imageUrls.map((url: string, i: number) => (
            <Image
              src={url}
              key={i}
              alt="Trip Image"
              width={1000}
              height={1000}
              className={cn(
                "w-full rounded-xl object-cover",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>

        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipList pillItems={pillItems} />

          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((_, index) => (
                <li key={index}>
                  <Image
                    src="/icons/star.svg"
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
              ))}

            <li className="ml-1">
              <SingleChip />
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle} Trip
            </h3>

            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        <ul className="itinerary">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index}>
              <h3>
                Day {dayPlan.day}: {dayPlan.location}
              </h3>

              <ul>
                {dayPlan.activities.map((activity: Activity, index: number) => (
                  <li key={index}>
                    <span className="flex-shrink-0 p-18-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div>
              <h3>{section.title}</h3>

              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

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
      </section>
    </main>
  );
};

export default TripDetail;
