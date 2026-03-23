"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="mx-4 mt-4 flex w-auto items-center justify-between rounded-2xl border border-white/50 bg-white/55 px-5 py-3 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/55">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/icons/logo.svg" alt="logo" width={58} height={58} />
        <p className="text-4xl font-nunito font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          ResumeAI
        </p>
      </Link>

      {user ? (
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700"
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
