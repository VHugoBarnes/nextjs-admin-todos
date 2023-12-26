import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SidebarItem } from "..";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={50} height={50} className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={session?.user ? session.user?.image ? session.user.image : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"}
            alt=""
            width={40}
            height={40}
            priority
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            unoptimized
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user ? session.user.name : "Cynthia J. Watts"}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">{session?.user?.roles?.join(", ")}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          <SidebarItem href="/dashboard">Dashboard</SidebarItem>
          <SidebarItem href="/dashboard/rest-todos">Rest TODOS</SidebarItem>
          <SidebarItem href="/dashboard/server-todos">Server TODOS</SidebarItem>
          <SidebarItem href="/dashboard/cookies">Cookies</SidebarItem>
          <SidebarItem href="/dashboard/products">Products</SidebarItem>
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};