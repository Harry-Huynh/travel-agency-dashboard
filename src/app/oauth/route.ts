import { storeUserData } from "@/lib/actions/user.actions";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  console.log("Session after creation:", session);

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  await storeUserData();

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
