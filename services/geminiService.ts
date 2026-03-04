
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeBio = async (currentBio: string, interests: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Improve the following Linktree bio to be more engaging, professional, and concise. 
      Original Bio: "${currentBio}"
      Additional Context/Interests: "${interests}"
      Keep the bio under 160 characters. Return only the new bio text.`,
    });
    return response.text || currentBio;
  } catch (error) {
    console.error("Gemini optimization failed:", error);
    return currentBio;
  }
};

export const suggestLinks = async (bio: string): Promise<any[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this user bio: "${bio}", suggest 3 relevant placeholder link titles and icons (from: Github, Twitter, Linkedin, Instagram, Youtube, Globe, Mail).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              icon: { type: Type.STRING },
              url: { type: Type.STRING }
            },
            required: ["title", "icon", "url"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};
