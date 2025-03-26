"use client";

import { AirVent } from "lucide-react";
import Link from "next/link";
import { useSession } from "../app/lib/auth-client";

export default function Navbar() {
  const { data: currentUser } = useSession();
  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <AirVent className="h-6 w-6" />
          <span className="font-bold">nextsecure.</span>
        </Link>
        <div className="">{currentUser?.user.name}</div>
        <Link
          href="/sign-in"
          className="flex items-center gap-2 bg-black text-white p-2 px-4 rounded-lg hover:bg-gray-800"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
