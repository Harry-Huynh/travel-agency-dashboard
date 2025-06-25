"use client";

import Image from "next/image";
import { logoutUser } from "@/lib/actions/user.actions";

import { useRouter } from "next/navigation";

const MainButtons = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    router.push("/sign-in");
  };

  return (
    <div>
      <button onClick={handleLogout} className="cursor-pointer relative size-6">
        <Image src="/icons/logout.svg" alt="logout" fill />
      </button>

      <button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
};

export default MainButtons;
