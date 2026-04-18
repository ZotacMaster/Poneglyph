import { generateText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

/**
 * Isolated generateText call using Gemini's native Google Search grounding.
 *
 * Must be kept in its own call — Gemini does not allow mixing provider-defined
 * tools (google.tools.googleSearch) with custom tools in the same request.
 * Wrapping it here as a plain tool() lets the orchestrator treat it like any
 * other custom tool with no restrictions.
 *
 * Ref: https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai#google-search-grounding
 */
async function runGoogleGroundedSearch(query: string) {
  const { text, sources } = await generateText({
    model: google("gemini-2.5-flash"),
    tools: { google_search: google.tools.googleSearch({}) },
    prompt: query,
  });

  return { summary: text, sources };
}

export const webSearchTool = tool({
  description:
    "Fast real-time web search using Google Search grounding via Gemini. " +
    "Use for current events, breaking crises, recent news, live policy updates, and any query requiring up-to-date information. " +
    "Returns a grounded summary and a list of source citations.",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),
  execute: async ({ query }) => runGoogleGroundedSearch(query),
});
