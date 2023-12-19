"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";

export const SidebarItem = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const path = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`${path === href ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""} params === href ? "" : "relative px-4 py-3 flex items-center space-x-4 rounded-xl"`}
      >
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">{children}</span>
      </Link>
    </li>
  );
};