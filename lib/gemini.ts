import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function getFinancialAdvice(transactions: Transaction[]): Promise<string> {
    try {
        const transactionSummary = transactions
            .slice(0, 10) // Use recent transactions
            .map(t => `${t.type} of ${t.amount} RWF for ${t.description}`)
            .join('\n');

        const prompt = `Based on the following recent transactions, provide one simple, actionable financial tip for the user. Keep it concise and encouraging.
        
        Transactions:
        ${transactionSummary}
        
        Tip:`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
                maxOutputTokens: 100,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error getting financial advice from Gemini:", error);
        return "Could not retrieve financial advice at this time.";
    }
}
