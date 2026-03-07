'use server';
/**
 * @fileOverview A flow that takes a user's text message and generates a text-based AI response.
 *
 * - receiveAIMessageResponse - A function that handles sending a message to the AI and getting a response.
 * - ReceiveAIMessageResponseInput - The input type for the receiveAIMessageResponse function.
 * - ReceiveAIMessageResponseOutput - The return type for the receiveAIMessageResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceiveAIMessageResponseInputSchema = z.object({
  message: z.string().describe('The text message from the user to the AI assistant.'),
});
export type ReceiveAIMessageResponseInput = z.infer<typeof ReceiveAIMessageResponseInputSchema>;

const ReceiveAIMessageResponseOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s text-based response.'),
});
export type ReceiveAIMessageResponseOutput = z.infer<typeof ReceiveAIMessageResponseOutputSchema>;

export async function receiveAIMessageResponse(
  input: ReceiveAIMessageResponseInput
): Promise<ReceiveAIMessageResponseOutput> {
  return receiveAIMessageResponseFlow(input);
}

const receiveAIMessageResponsePrompt = ai.definePrompt({
  name: 'receiveAIMessageResponsePrompt',
  input: {schema: ReceiveAIMessageResponseInputSchema},
  output: {schema: ReceiveAIMessageResponseOutputSchema},
  prompt: `You are Nova, a highly advanced, empathetic, and versatile AI assistant. 
Your goal is to provide accurate, helpful, and concise answers to any user query. 

Guidelines:
- If the user asks for information, provide it clearly and structure it using markdown if helpful.
- If the user asks for creative writing, be imaginative and engaging.
- If the user asks for technical help, be precise and follow best practices.
- Always maintain a friendly, professional, and supportive tone.
- If you don't know the answer, admit it gracefully and offer to help with something else.
- Your persona is "Universal Assistant" - you are capable of helping with almost anything.

User Question: {{{message}}}

Response:`,
});

const receiveAIMessageResponseFlow = ai.defineFlow(
  {
    name: 'receiveAIMessageResponseFlow',
    inputSchema: ReceiveAIMessageResponseInputSchema,
    outputSchema: ReceiveAIMessageResponseOutputSchema,
  },
  async input => {
    const {output} = await receiveAIMessageResponsePrompt(input);
    return output!;
  }
);
