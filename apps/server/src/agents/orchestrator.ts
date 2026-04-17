import { ToolLoopAgent, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { searchDatabaseTool } from "./tools/search-db";
import { deepResearchTool } from "./deep-research";
import { orchestratorSystemPrompt } from "./prompts/system";

/**
 * Creates the parent orchestrator agent.
 * Called per-request so each conversation gets a fresh agent instance.
 *
 * Tools:
 *  - searchDatabase: pgvector semantic search on internal datasets
 *  - google_search: native Gemini grounding (real-time web search)
 *  - deepResearch: Groq + Tavily multi-step research subagent
 *
 * Ref: https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent
 */
export function createOrchestratorAgent() {
  return new ToolLoopAgent({
    model: google("gemini-2.5-flash-preview-05-20"),
    instructions: orchestratorSystemPrompt,
    tools: {
      searchDatabase: searchDatabaseTool,
      google_search: google.tools.googleSearch({}),
      deepResearch: deepResearchTool,
    },
    stopWhen: stepCountIs(10),
  });
}
