import PageWrapper from "@/components/common/PageWrapper";
import DashboardCards from "@/components/layout/DashboardCards";
import Header from "@/components/layout/Header";
import React from "react";

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header />
      <div className="my-10 !mb-0 mx-6 rounded-2xl border border-white/60 bg-white/70 px-6 py-7 text-center shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60 md:mx-20 lg:mx-36">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Resume Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Begin creating and managing your personalized resumes.
        </p>
      </div>
      <div className="p-10 md:px-24 lg:px-48">
        <DashboardCards />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
