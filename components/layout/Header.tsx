"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const user = useUser();
  const displayName = user.user?.firstName || user.user?.fullName || "Profile";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-screen-xl rounded-2xl border border-white/50 bg-white/55 px-5 py-2.5 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/55">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-bold whitespace-nowrap bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              HireLogic
            </span>
          </Link>
          <div className="flex items-center gap-2 lg:order-2">
            <ThemeToggle />
            {user?.isLoaded && !user?.isSignedIn ? (
              <Link
                href="/sign-in"
                className="font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-1 text-slate-700 transition duration-300 hover:bg-primary-700/10 dark:text-slate-200 dark:hover:bg-primary-700/20"
              >
                Log in
              </Link>
            ) : (
              <>
                <div className="mr-4 h-full items-center align-middle hidden gap-2 md:flex justify-center">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {displayName}
                  </span>
                  <UserButton showName={false} />
                </div>
                <div className="mr-4 h-full items-center align-middle hidden max-md:flex justify-center">
                  <UserButton showName={false} />
                </div>
              </>
            )}
            <Link
              href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}
              className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 hover:scale-[1.03] hover:from-sky-600 hover:to-indigo-700 lg:px-5 lg:py-2.5"
            >
              {!user?.isSignedIn ? "Get started" : "Dashboard"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
