import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative inset-0 min-h-screen w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:16px_24px] print:bg-transparent print:bg-none dark:bg-[linear-gradient(to_right,rgba(71,85,105,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.22)_1px,transparent_1px)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none print:hidden"
      >
        <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300/60 to-indigo-400/40 blur-3xl dark:from-sky-500/35 dark:to-indigo-500/30"></div>
        <div className="absolute top-36 right-0 h-80 w-80 rounded-full bg-gradient-to-br from-orange-300/45 to-pink-400/40 blur-3xl dark:from-orange-500/30 dark:to-pink-500/25"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-300/40 to-cyan-400/35 blur-3xl dark:from-emerald-500/20 dark:to-cyan-500/15"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PageWrapper;
