import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-4 shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/65">
        <SignUp forceRedirectUrl={"/dashboard"} routing="hash" />
      </div>
    </div>
  );
};

export default Page;
