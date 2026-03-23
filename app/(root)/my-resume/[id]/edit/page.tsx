import React, { use } from "react";
import PageWrapper from "@/components/common/PageWrapper";
import Header from "@/components/layout/Header";
import { currentUser } from "@clerk/nextjs/server";
import { checkResumeOwnership } from "@/lib/actions/resume.actions";
import { redirect } from "next/navigation";
import ResumeEditor from "@/components/layout/my-resume/ResumeEditor";

const EditResume = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const isResumeOwner = await checkResumeOwnership(user?.id || "", params.id);

  if (!isResumeOwner) {
    return redirect("/dashboard");
  }

  return (
    <PageWrapper>
      <Header />
      <div className="my-10 mx-6 rounded-2xl border border-white/60 bg-white/70 px-6 py-7 text-center shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60 md:mx-20 lg:mx-36">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Your Resume</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Please provide the necessary information for your resume.
        </p>
      </div>
      <ResumeEditor params={params} userId={user?.id} />
    </PageWrapper>
  );
};

export default EditResume;
