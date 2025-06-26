import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <article>
            <header className="header">
              <Link href="/">
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </Link>
              <h2 className="p-28-semibold text-dark-100 text-center">
                Start your Travel Journey
              </h2>
            </header>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Let&apos;s get started with HPH travel. Click the button to
              continue with admin dashboard
            </p>
          </article>

          <Link href="/dashboard">
            <button
              className="!w-full !h-11 button-class cursor-pointer"
              type="button"
            >
              <span className="p-18-semibold text-white">Admin Dashboard</span>
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
