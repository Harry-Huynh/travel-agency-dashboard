/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ID, OAuthProvider, Query } from "node-appwrite";
import { parseStringify, parseTripData } from "../utils";

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_USERS_COLLECTION_ID: usersCollectionId,
  APPWRITE_TRIPS_COLLECTION_ID: tripsCollectionId,
} = process.env;

interface Document {
  [key: string]: any;
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

export const getExistingUser = async (id: string) => {
  try {
    const { database } = await createAdminClient();

    const { documents, total } = await database.listDocuments(
      databaseId!,
      usersCollectionId!,
      [Query.equal("accountId", id)]
    );

    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const storeUserData = async () => {
  try {
    const { account } = await createSessionClient();
    const { database } = await createAdminClient();

    const user = await account.get();

    if (!user) {
      throw new Error("User not found");
    }

    // Provider access token is not available on SSR
    // const profilePicture = providerAccessToken
    //   ? await getGooglePicture(providerAccessToken)
    //   : null;

    const createdUser = await database.createDocument(
      databaseId!,
      usersCollectionId!,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        accountId: user.$id,
        joinedAt: new Date().toISOString(),
        imageUrl: "/images/avatar-default.svg",
      }
    );

    if (!createdUser.$id) {
      return { redirectTo: "/sign-in" };
    }
  } catch (error) {
    console.error("Error storing user data:", error);
    return null;
  }
};

// Provider access token is not available on SSR in appwrite
// export const getGooglePicture = async (accessToken: string) => {
//   try {
//     const response = await fetch(
//       "https://people.googleapis.com/v1/people/me?personFields=photos",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch Google profile picture");
//     }

//     const { photos } = await response.json();

//     return photos?.[0]?.url || null;
//   } catch (error) {
//     console.error("Error fetching Google picture:", error);
//     return null;
//   }
// };

export async function loginWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/404`
  );

  return redirect(redirectUrl);
}

export const logoutUser = async () => {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
    return null;
  }
};

// getLoggedInUser function already did this job
// export const getUser = async () => {
//   try {
//     const { database } = await createAdminClient();

//     const user = await getLoggedInUser();

//     if (!user) {
//       return { redirectTo: "/sign-in" };
//     }

//     const { documents } = await database.listDocuments(
//       databaseId!,
//       usersCollectionId!,
//       [
//         Query.equal("accountId", user.$id),
//         Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
//       ]
//     );

//     return documents.length > 0 ? documents[0] : { redirectTo: "/sign-in" };
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

export async function validateAdminUser() {
  try {
    const user = await getLoggedInUser();

    if (!user || !user.$id) {
      return { redirectTo: "/sign-in" };
    }

    if (user.status === "user") {
      return { redirectTo: "/" };
    }
  } catch (error) {
    console.log("Auth error: " + error);
    return { redirectTo: "/sign-in" };
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    const existingUser = await getExistingUser(user.$id);

    return parseStringify(existingUser);
  } catch (error) {
    console.log("Error fetching user: " + error);
    return null;
  }
}

export async function getAllUsers(limit: number, offset: number) {
  try {
    const { database } = await createAdminClient();

    const { documents: users, total } = await database.listDocuments(
      databaseId!,
      usersCollectionId!,
      [Query.limit(limit), Query.offset(offset)]
    );

    if (total === 0) {
      return {
        users: [],
        total,
      };
    }

    const allUsers = users.map((user) => parseStringify(user));

    return { allUsers, total };
  } catch (error) {
    console.log("Error fetching user: " + error);
    return { users: [], total: 0 };
  }
}

export async function getAllTrips(limit: number, offset: number) {
  const { database } = await createAdminClient();

  const allTripsData = await database.listDocuments(
    databaseId!,
    tripsCollectionId!,
    [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
  );

  if (allTripsData.total === 0) {
    console.error("No trips found");
    return { allTrips: [], total: 0 };
  }

  const allTrips = allTripsData.documents.map((trip) => parseStringify(trip));

  return {
    allTrips,
    total: allTripsData.total,
  };
}

export async function getTripById(tripId: string) {
  const { database } = await createAdminClient();

  const trip = await database.getDocument(
    databaseId!,
    tripsCollectionId!,
    tripId
  );

  if (!trip.$id) {
    console.error("Trip not found");
    return null;
  }

  return parseStringify(trip);
}

export async function getUsersAndTripsStats(): Promise<DashboardStats> {
  const { database } = await createAdminClient();

  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

  const [users, trips] = await Promise.all([
    database.listDocuments(databaseId!, usersCollectionId!),
    database.listDocuments(databaseId!, tripsCollectionId!),
  ]);

  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length;

  const filterUsersByRole = (role: string) => {
    return users.documents.filter((user: Document) => user.status === role);
  };

  return {
    totalUsers: users.total,
    usersJoined: {
      currentMonth: filterByDate(
        users.documents,
        "joinedAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(users.documents, "joinedAt", startPrev, endPrev),
    },

    userRole: {
      total: filterUsersByRole("user").length,
      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },

    totalTrips: trips.total,

    tripsCreated: {
      currentMonth: filterByDate(
        trips.documents,
        "createdAt",
        startCurrent,
        undefined
      ),
      lastMonth: filterByDate(trips.documents, "createdAt", startPrev, endPrev),
    },
  };
}

export async function getUserGrowthPerDay() {
  const { database } = await createAdminClient();

  const users = await database.listDocuments(databaseId!, usersCollectionId!);

  const userGrowth = users.documents.reduce(
    (acc: { [key: string]: number }, user: Document) => {
      const date = new Date(user.joinedAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(userGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
}

export async function getTripsCreatedPerDay() {
  const { database } = await createAdminClient();

  const trips = await database.listDocuments(databaseId!, tripsCollectionId!);

  const tripsGrowth = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const date = new Date(trip.createdAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(tripsGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
}

export async function getTripsByTravelStyle() {
  const { database } = await createAdminClient();

  const trips = await database.listDocuments(databaseId!, tripsCollectionId!);

  const travelStyleCounts = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const tripDetail = parseTripData(trip.tripDetail);

      if (tripDetail && tripDetail.travelStyle) {
        const travelStyle = tripDetail.travelStyle;
        acc[travelStyle] = (acc[travelStyle] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
    count: Number(count),
    travelStyle,
  }));
}
