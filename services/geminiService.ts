import { GoogleGenAI } from "@google/genai";
import { SummaryFormat } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateSummary = async (
  videoUrl: string,
  format: SummaryFormat
): Promise<string> => {
  console.log(`Generating summary for ${videoUrl} in format: ${format}`);
  
  let formatInstruction = "";
  switch (format) {
    case SummaryFormat.KeyTopics:
      formatInstruction = "Provide a concise bulleted list of the main topics, using markdown for formatting.";
      break;
    case SummaryFormat.DetailedParagraph:
      formatInstruction = "Provide a well-structured paragraph summarizing the entire content in detail.";
      break;
    case SummaryFormat.Abstract:
      formatInstruction = "Provide a one or two-sentence high-level summary, like an abstract for a paper.";
      break;
  }

  const prompt = `
    Please generate a summary for the YouTube video at the following URL: ${videoUrl}

    **Requested Format:** ${format}

    **Instructions:**
    ${formatInstruction}

    **Summary:**
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    // Check for explicit safety blocks or other reasons for no content.
    if (!response.candidates || response.candidates.length === 0 || response.candidates[0].finishReason === 'SAFETY') {
        throw new Error("Summary generation was blocked. This may be due to the video's content violating safety policies.");
    }
    
    const summaryText = response.text.trim();

    if (!summaryText) {
        throw new Error("The AI was unable to generate a summary. This can happen if the video is not well-documented online or has no public transcript.");
    }

    return summaryText;
  } catch (error: any) {
    console.error("Error generating summary:", error);
    
    // Check for specific, known error messages to give better feedback.
    const errorMessage = error.toString().toLowerCase();

    if (errorMessage.includes("api key not valid")) {
        throw new Error("The AI service is not configured correctly. Please contact support.");
    }
    
    if (error.message) {
        // Re-throw custom error messages from our checks above.
        throw new Error(error.message);
    }

    // A more generic catch-all for other API or network errors.
    throw new Error("Failed to generate summary. The AI service may be temporarily unavailable.");
  }
};
