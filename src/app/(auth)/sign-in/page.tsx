import { getLoggedInUser, loginWithGoogle } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const user = await getLoggedInUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link href="/">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            </Link>

            <h1 className="p-28-bold text-dark-100">HPH Travel</h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start your Travel Journey
            </h2>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Sign in with Google to manage destinations, itineraries, and user
              activity with ease
            </p>
          </article>

          <button
            className="!w-full !h-11 button-class cursor-pointer"
            type="button"
            onClick={loginWithGoogle}
          >
            <Image
              src="/icons/google.svg"
              alt="google"
              width={20}
              height={20}
            />
            <span className="p-18-semibold text-white">
              Sign in with Google
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
