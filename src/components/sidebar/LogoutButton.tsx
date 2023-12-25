"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <AiOutlineLoading className="animate-spin" />
        <span className="group-hover:text-gray-700">Loading...</span>
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <CiLogin />
        <span className="group-hover:text-gray-700">Login</span>
      </button>
    );
  }

  return (
    <button
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};