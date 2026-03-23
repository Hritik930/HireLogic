"use client";

import Header from "@/components/layout/Header";
import { useUser } from "@clerk/nextjs";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  const user = useUser();

  return (
    <div className="min-h-screen">
      <Header />
      <section className="flex min-h-[82vh] flex-col items-center justify-center px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-3xl border border-white/50 bg-white/65 px-6 py-10 text-center shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/55 sm:px-10">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
            Build Your Resume With{" "}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent max-sm:block">
              HireLogic
            </span>
          </h1>
          <p className="mb-8 text-lg font-normal text-slate-700 lg:text-xl sm:px-16 xl:px-40 dark:text-slate-200">
            Effortlessly Craft a Professional Resume with Our AI-Powered Builder
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}
              className="relative flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-8 text-white shadow-lg transition duration-300 hover:scale-105 hover:from-sky-600 hover:to-indigo-700 sm:w-max"
            >
              <span className="relative text-base font-semibold">
                Get Started
              </span>
            </Link>
            <Link
              href="#learn-more"
              className="relative flex h-11 w-full items-center justify-center rounded-full border border-slate-300/70 bg-white/70 px-8 text-slate-900 transition duration-300 hover:scale-105 hover:bg-white sm:w-max dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-100"
            >
              <span className="relative text-base font-semibold text-primary-700 dark:text-sky-300">
                Learn more
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-8 px-6 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12 md:px-10">
        <h2 className="font-bold text-4xl text-slate-900 dark:text-white" id="learn-more">
          How it Works?
        </h2>
        <h2 className="text-md text-slate-600 dark:text-slate-300">
          Generate resume in just 3 steps
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:px-24">
          <div className="group cursor-pointer rounded-2xl border border-sky-200/70 bg-gradient-to-b from-sky-100/70 to-indigo-100/60 p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl dark:border-sky-500/25 dark:from-slate-900/80 dark:to-slate-800/70">
            <AtomIcon className="h-10 w-10 text-primary-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Create Your Template
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Start by selecting the color scheme for your resume template. Our single, professionally designed template ensures a clean and consistent look for all users.
            </p>
          </div>

          <div className="group cursor-pointer rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-emerald-100/70 to-cyan-100/60 p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl dark:border-emerald-500/25 dark:from-slate-900/80 dark:to-slate-800/70">
            <Edit className="h-10 w-10 text-primary-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Update Your Information
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Enter your personal details, work experience, education, and skills into the provided form. Our AI assists you in filling out each section accurately and effectively.
            </p>
          </div>

          <div className="group cursor-pointer rounded-2xl border border-orange-200/70 bg-gradient-to-b from-orange-100/70 to-pink-100/60 p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl dark:border-orange-500/25 dark:from-slate-900/80 dark:to-slate-800/70">
            <Share2 className="h-10 w-10 text-primary-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
              Share Your Resume
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              After completing your resume, save it securely and generate a shareable link. Easily update your information anytime and share the link with potential employers or download it in a preferred format.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="#get-started"
            className="inline-block rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-12 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:scale-105 hover:from-sky-600 hover:to-indigo-700"
          >
            <div className="flex items-center justify-center">
              Get Started Today
            </div>
          </Link>
        </div>
      </section>
      <footer className="w-full border-t border-white/50 bg-white/55 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/55">
        <div className="w-full m-auto text-center max-w-screen-xl p-4">
          <div className="text-sm text-slate-600 sm:text-center dark:text-slate-300">
            © 2025{" "}
            <a href="https://squadofcreators.github.io/SquadofCreators/" target="_blank" className="hover:text-primary-500 hover:cursor-pointer">
            Squad of Creators
            </a>
            . All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
