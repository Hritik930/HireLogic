"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateAchievementDescription } from "@/lib/actions/gemini.actions";
import { addAchievementToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2, Minus, Plus } from "lucide-react";
import React, { useRef, useState } from "react";

const AchievementForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(
    [] as any
  );
  const [achievementList, setAchievementList] = useState(
    formData?.achievements?.length > 0
      ? formData?.achievements
      : [
          {
            title: "",
            description: "",
          },
        ]
  );
  const [currentAiIndex, setCurrentAiIndex] = useState(
    achievementList.length - 1
  );
  const { toast } = useToast();

  const handleChange = (index: number, event: any) => {
    const newEntries = achievementList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setAchievementList(newEntries);

    handleInputChange({
      target: {
        name: "achievements",
        value: newEntries,
      },
    });
  };

  const AddNewAchievement = () => {
    const newEntries = [
      ...achievementList,
      {
        title: "",
        description: "",
      },
    ];
    setAchievementList(newEntries);

    handleInputChange({
      target: {
        name: "achievements",
        value: newEntries,
      },
    });
  };

  const RemoveAchievement = () => {
    const newEntries = achievementList.slice(0, -1);
    setAchievementList(newEntries);

    if (currentAiIndex > newEntries.length - 1) {
      setCurrentAiIndex(newEntries.length - 1);
    }

    handleInputChange({
      target: {
        name: "achievements",
        value: newEntries,
      },
    });
  };

  const generateDescriptionFromAI = async (index: number) => {
    if (
      !formData?.achievements?.[index]?.title ||
      formData?.achievements?.[index]?.title === ""
    ) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description:
          "Please enter the achievement title to generate a description.",
        variant: "destructive",
        className: "bg-white border-2",
      });

      return;
    }

    setCurrentAiIndex(index);
    setIsAiLoading(true);

    try {
      const result = await generateAchievementDescription(
        formData?.achievements[index]?.title
      );
      setAiGeneratedSummaryList(result);

      if (result?.length > 0 && result[0]?.description) {
        handleChange(index, {
          target: { name: "description", value: result[0].description },
        });
      }
    } catch (error) {
       toast({
        title: "Error Generating Suggestion",
        description: "An error occurred while calling the AI model. Please try again.",
        variant: "destructive",
      });
    }

    setIsAiLoading(false);

    setTimeout(function () {
      listRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const onSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await addAchievementToResume(params.id, formData.achievements);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Achievements updated successfully.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Achievements
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add any notable awards, accomplishments, or certificates.
        </p>

        <div className="mt-5">
          {achievementList.map((item: any, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg">
                <div className="space-y-2">
                  <label className="text-slate-700 font-semibold">
                    Achievement Title:
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    className="no-focus"
                    placeholder="e.g. Employee of the Month, Hackathon Winner"
                  />
                </div>
                
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-end">
                    <label className=" text-slate-700 font-semibold">
                      Description:
                    </label>
                    <Button
                      variant="outline"
                      onClick={() => {
                        generateDescriptionFromAI(index);
                      }}
                      type="button"
                      size="sm"
                      className="border-primary text-primary flex gap-2"
                      disabled={isAiLoading}
                    >
                      {isAiLoading && currentAiIndex === index ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}{" "}
                      Generate from AI
                    </Button>
                  </div>
                  <RichTextEditor
                    defaultValue={item?.description || ""}
                    onRichTextEditorChange={(value: string) =>
                      handleChange(index, { target: { name: "description", value } })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewAchievement}
              className="text-primary"
            >
              <Plus className="size-4 mr-2" /> Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveAchievement}
              className="text-primary"
            >
              <Minus className="size-4 mr-2" /> Remove
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onSave}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5" ref={listRef}>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() =>
                handleChange(currentAiIndex, {
                  target: { name: "description", value: item?.description },
                })
              }
              className={`p-5 shadow-lg my-4 rounded-lg border-t-2 ${
                isAiLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-disabled={isAiLoading}
            >
              <h2 className="font-semibold my-1 text-primary text-gray-800 dark:text-sky-300">
                Level: {item?.activity_level}
              </h2>
              <p className="text-justify text-gray-600 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: item?.description }}></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementForm;
