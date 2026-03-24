import AddResume from "@/components/common/AddResume";
import ResumeCard from "@/components/common/ResumeCard";
import { fetchUserResumes } from "@/lib/actions/resume.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const DashboardCards = async () => {
  const user = await currentUser();
  const userId = user?.id;

  let resumeList: any[] = [];

  try {
    const resumeData = await fetchUserResumes(userId || "");
    resumeList = JSON.parse((resumeData as string) || "[]");
  } catch (error) {
    console.error("Error fetching resume:", error);
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        <AddResume userId={userId} />

        {resumeList.length > 0
          ? resumeList.map((resume: any) => (
              <ResumeCard key={resume.resumeId} resume={JSON.stringify(resume)} />
            ))
          : [1, 2, 3].map((index) => <ResumeCard key={index} resume={null} />)}
      </div>
    </>
  );
};

export default DashboardCards;
