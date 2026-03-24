"use client";

import { Button } from "@/components/ui/button";
import { FormProvider, useFormContext } from "@/lib/context/FormProvider";
import { RWebShare } from "react-web-share";
import React from "react";
import ResumePreview from "@/components/layout/my-resume/ResumePreview";
import { usePathname } from "next/navigation";
import PageWrapper from "@/components/common/PageWrapper";
import { DownloadIcon, Share2Icon } from "lucide-react";

const FinalResumeView = ({
  params,
  isOwnerView,
}: {
  params: { id: string };
  isOwnerView: boolean;
}) => {
  const path = usePathname();
  const { formData } = useFormContext();

  const handleDownload = () => {
    window.print();
  };

  return (
    <PageWrapper>
      <FormProvider params={params}>
        <div id="no-print">
          <div className="my-10 mx-6 rounded-2xl border border-white/60 bg-white/70 px-6 py-7 text-center shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60 md:mx-20 lg:mx-36">
            {isOwnerView ? (
              <>
                <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                  Congrats! Your ultimate AI-generated resume is ready!
                </h2>
                <p className="text-center text-slate-600 dark:text-slate-300">
                  You can now download your resume or share its unique URL with
                  your friends and family.
                </p>
                <p className="text-center text-sm font-light text-slate-500 dark:text-slate-400">
                  For better print quality, adjust your browser's print
                  settings: save as PDF, disable headers and footers, set
                  margins to none, and enable background graphics.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                  Resume Preview
                </h2>
                <p className="text-center text-slate-600 dark:text-slate-300">
                  You are currently viewing a preview of someone else's resume.
                </p>
                <p className="text-center text-sm font-light text-slate-500 dark:text-slate-400">
                  For the ultimate experience, create your own AI-generated
                  resume.
                </p>
              </>
            )}
            <div className="flex max-sm:flex-col justify-center gap-8 my-10">
              <Button
                className="flex gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-12 py-6 text-white shadow-md transition duration-300 hover:scale-105 hover:from-sky-600 hover:to-indigo-700"
                onClick={handleDownload}
              >
                <DownloadIcon className="size-6" /> Download
              </Button>
              <RWebShare
                data={{
                  text: "Hello everyone, check out my resume by clicking the link!",
                  url: `${process.env.BASE_URL}/${path}`,
                  title: `${formData?.firstName} ${formData?.lastName}'s Resume`,
                }}
                onClick={() => console.log("Shared successfully!")}
              >
                <Button className="flex gap-2 rounded-full border border-slate-300/70 bg-white/80 px-12 py-6 text-slate-900 transition duration-300 hover:scale-105 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700">
                  <Share2Icon className="size-6" /> Share URL
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="px-10 pt-4 pb-16 max-sm:px-5 max-sm:pb-8 print:p-0">
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </FormProvider>
    </PageWrapper>
  );
};

export default FinalResumeView;
