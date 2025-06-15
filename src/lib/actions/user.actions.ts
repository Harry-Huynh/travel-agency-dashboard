"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ID, OAuthProvider, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: databaseId,
  APPWRITE_USERS_COLLECTION_ID: usersCollectionId,
  // APPWRITE_TRIPS_COLLECTION_ID: tripsCollectionId,
} = process.env;

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
