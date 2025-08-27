import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import "dotenv/config";
import { z } from "zod";
import getPrompt from "../lib/prompt";
import VideoEvaluationType from "../types/ai-response-type";
import { CommentsType } from "../types/comments-type";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_KEY,
});

const aiVideoAnalysis = async (
  comments: CommentsType
): Promise<VideoEvaluationType> => {
  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    prompt: getPrompt(comments),
    schema: z.object({
      score: z.number().min(0).max(100),
      verdict: z.enum(["Worth Watching", "Mixed", "Skip"]),
      summary: z.string(),
      reasons: z.array(z.string()).min(1).max(3),
    }),
  });

  return object;
};

export default aiVideoAnalysis;
