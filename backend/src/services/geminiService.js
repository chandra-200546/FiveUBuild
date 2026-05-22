import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-latest"
].filter(Boolean).filter((m, i, arr) => arr.indexOf(m) === i);

async function generateWithFallback(prompt) {
  const attempts = [];
  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      attempts.push(`${modelName}: ${err?.message || "unknown error"}`);
    }
  }
  const attemptsText = attempts.join(" | ");
  if (attemptsText.toLowerCase().includes("fetch failed")) {
    throw new Error(
      "Gemini request failed due to network/connectivity restrictions. Verify internet access and API key permissions."
    );
  }
  throw new Error(`Gemini failed for all configured models. Attempts => ${attemptsText}`);
}

async function runPrompt(prompt) {
  const text = await generateWithFallback(prompt);
  const raw = text.trim().replace(/^```json|```$/g, "");
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(raw.slice(start, end + 1));
    }
    throw new Error("Gemini returned invalid JSON.");
  }
}

export async function generateAppCode(userPrompt) {
  return runPrompt(`Return only valid JSON: {"html_code":"","css_code":"","js_code":"","full_code":""}. Build complete responsive modern app. No markdown. Prompt: ${userPrompt}`);
}

export async function refineAppCode(existingCode, message) {
  return runPrompt(`Return only valid JSON: {"html_code":"","css_code":"","js_code":"","full_code":""}. Refine this code based on request.\nRequest:${message}\nCurrent code:${JSON.stringify(existingCode)}`);
}
