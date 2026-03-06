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
  prompt: `You are the Nova AI Assistant, a helpful and friendly AI.

User: {{{message}}}
Assistant: `,
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
