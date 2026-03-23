import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const AchievementPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: formData?.themeColor || themeColors[0] }}
      >
        Achievements
      </h2>
      <hr
        className="border-[1.5px] pb-5"
        style={{ borderColor: formData?.themeColor || themeColors[0] }}
      />
      
      <div className="flex flex-col gap-3">
        {formData?.achievements?.map((item: any, index: number) => (
          <div key={index}>
            <h3
              className="font-bold text-sm"
              style={{ color: formData?.themeColor || themeColors[0] }}
            >
              {item?.title}
            </h3>
            <div
              className="text-xs text-justify"
              dangerouslySetInnerHTML={{ __html: item?.description || "" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPreview;
