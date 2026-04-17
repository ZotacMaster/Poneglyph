import { ToolLoopAgent, tool, stepCountIs } from "ai";
import { groq } from "@ai-sdk/groq";
import { tavilySearch, tavilyExtract } from "@tavily/ai-sdk";
import { z } from "zod";
import { deepResearchSystemPrompt } from "./prompts/deep-research";

// Non-streaming subagent — it's used as a tool by the parent orchestrator,
// so it just returns the final compiled result, not a stream.
// Non-streaming subagent — used as a tool by the parent orchestrator,
// so it returns the final compiled result, not a stream.
const deepResearchAgent = new ToolLoopAgent({
  model: groq("llama-3.3-70b-versatile"),
  instructions: deepResearchSystemPrompt, // system -> instructions in AI SDK v6
  tools: {
    webSearch: tavilySearch({
      maxResults: 5,
    }),
    webExtract: tavilyExtract(),
  },
  stopWhen: stepCountIs(5),
});

/**
 * Wraps the deep research agent as a tool callable by the parent orchestrator.
 * Uses agent.generate() (not streaming) — returns the final curated result.
 */
export const deepResearchTool = tool({
  description:
    "Conduct thorough multi-step web research on a humanitarian topic. Uses multiple search queries, content extraction, and cross-referencing. Use for complex questions that need depth beyond a simple web search.",
  inputSchema: z.object({
    topic: z.string().describe("The research topic or question to investigate"),
    context: z
      .string()
      .optional()
      .describe("Additional context from previous search results to refine the research"),
  }),
  execute: async ({ topic, context }) => {
    const prompt = context
      ? `Research topic: ${topic}\n\nAdditional context from prior searches:\n${context}\n\nConduct thorough research and provide a structured summary.`
      : `Research topic: ${topic}\n\nConduct thorough research and provide a structured summary.`;

    const result = await deepResearchAgent.generate({
      prompt,
    });

    return result.text;
  },
});
