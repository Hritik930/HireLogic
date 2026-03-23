"use server";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const modelCandidates = [
  process.env.GEMINI_MODEL,
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
].filter(Boolean) as string[];

const uniqueModelCandidates = [...new Set(modelCandidates)];

const generationConfig = {
  temperature: 1,
  maxOutputTokens: 2048,
};

async function askGemini(prompt: string) {
  let lastError: any;

  try {
    for (const modelName of uniqueModelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const chat = model.startChat({ generationConfig });
        const result = await chat.sendMessage(prompt);
        const text = result.response.text();

        if (!text) {
          throw new Error("Empty response from AI model");
        }

        return text;
      } catch (error: any) {
        lastError = error;
        const message = error?.message || "";
        const isMissingModel =
          message.includes("404") ||
          message.includes("not found") ||
          message.includes("not supported for generateContent");

        if (isMissingModel) {
          console.warn(`Gemini model unavailable: ${modelName}. Trying next model...`);
          continue;
        }

        throw error;
      }
    }

    throw lastError || new Error("No available Gemini model found");
  } catch (error: any) {
    console.error("askGemini error:", error?.message);

    if (error?.message?.includes("API key")) {
      throw new Error("Invalid API key. Check your GEMINI_API_KEY in .env");
    }
    if (error?.message?.includes("quota")) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    if (
      error?.message?.includes("not found") ||
      error?.message?.includes("not supported for generateContent")
    ) {
      throw new Error(
        "No compatible Gemini model is available for your API key/project. Set GEMINI_MODEL in .env to a supported model (for example gemini-2.0-flash)."
      );
    }

    throw new Error(error?.message || "Failed to generate content");
  }
}

function parseGeminiJson(rawResponse: string) {
  const cleanedResponse = rawResponse
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch {
    const jsonStartIndex = cleanedResponse.indexOf("[");
    const jsonEndIndex = cleanedResponse.lastIndexOf("]");

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
      const arraySlice = cleanedResponse.slice(jsonStartIndex, jsonEndIndex + 1);
      return JSON.parse(arraySlice);
    }

    throw new Error("Unable to parse AI response as JSON");
  }
}

export async function generateSummary(jobTitle: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables");
    }

    const prompt =
      jobTitle && jobTitle !== ""
        ? `Given the job title "${jobTitle}", create 3 professional resume summaries for different experience levels - Senior, Mid-Level, and Fresher. Format response as JSON:\n[{"experience_level":"Senior","summary":"..."},{"experience_level":"Mid Level","summary":"..."},{"experience_level":"Fresher","summary":"..."}]`
        : `Create 3 resume summaries reflecting different personality traits - Active, Average, and Lazy. Format response as JSON:\n[{"experience_level":"Active","summary":"..."},{"experience_level":"Average","summary":"..."},{"experience_level":"Lazy","summary":"..."}]`;

    const result = await askGemini(prompt);
    return parseGeminiJson(result);
  } catch (error: any) {
    console.error("generateSummary error:", error);
    throw new Error(error?.message || "Failed to generate summary from AI");
  }
}

export async function generateEducationDescription(educationInfo: string) {
  try {
    const prompt = `Based on my education at ${educationInfo}, provide personal descriptions for three levels of curriculum activities: High Activity, Medium Activity, and Low Activity. Each description should be 3-4 lines long and written from my perspective, reflecting on past experiences. The output should be an array of JSON objects, each containing 'activity_level' and 'description' fields. Please include a subtle hint about my good (but not the best) results.`;

    const result = await askGemini(prompt);
    return parseGeminiJson(result);
  } catch (error: any) {
    console.error("generateEducationDescription error:", error);
    throw new Error(error?.message || "Failed to generate education description from AI");
  }
}

export async function generateExperienceDescription(experienceInfo: string) {
  try {
    const prompt = `Given that I have experience working as ${experienceInfo}, provide a summary of three levels of activities I performed in that position, preferably as a list: High Activity, Medium Activity, and Low Activity. Each summary should be 3-4 lines long and written from my perspective, reflecting on my past experiences in that workplace. The output should be an array of JSON objects, each containing 'activity_level' and 'description' fields. You can include <b>, <i>, <u>, <s>, <blockquote>, <ul>, <ol>, and <li> to further enhance the descriptions. Use example work samples if needed, but do not insert placeholders for me to fill in.`;

    const result = await askGemini(prompt);
    return parseGeminiJson(result);
  } catch (error: any) {
    console.error("generateExperienceDescription error:", error);
    throw new Error(error?.message || "Failed to generate experience description from AI");
  }
}

export async function generateAchievementDescription(achievementTitle: string) {
  try {
    const prompt = `Given the achievement title '${achievementTitle}', provide a list of three potential descriptions highlighting impact, creativity, or technical problem solving. Each description should be 2-3 lines long and written from my perspective in past tense. The output should be an array of JSON objects, each containing 'activity_level' (e.g., High, Medium, Low impact) and 'description' fields. You can include <b>, <i>, <u>, <s> to further enhance the descriptions.`;

    const result = await askGemini(prompt);
    return parseGeminiJson(result);
  } catch (error: any) {
    console.error("generateAchievementDescription error:", error);
    throw new Error(error?.message || "Failed to generate achievement description from AI");
  }
}

export async function generateCertificateDescription(certificateTitle: string) {
  try {
    const prompt = `Given the certificate title '${certificateTitle}', provide a list of three potential descriptions highlighting the skills acquired or the technical relevance. Each description should be 2-3 lines long and written from my perspective in past tense. The output should be an array of JSON objects, each containing 'activity_level' (e.g., High, Medium, Low relevance) and 'description' fields. You can include <b>, <i>, <u>, <s> to further enhance the descriptions.`;

    const result = await askGemini(prompt);
    return parseGeminiJson(result);
  } catch (error: any) {
    console.error("generateCertificateDescription error:", error);
    throw new Error(error?.message || "Failed to generate certificate description from AI");
  }
}
