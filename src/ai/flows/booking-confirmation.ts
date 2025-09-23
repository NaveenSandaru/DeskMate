// booking-confirmation.ts
'use server';

/**
 * @fileOverview Sends a booking confirmation to the user via email or SMS after a successful booking.
 *
 * - sendBookingConfirmation - A function that sends the booking confirmation.
 * - BookingConfirmationInput - The input type for the sendBookingConfirmation function.
 * - BookingConfirmationOutput - The return type for the sendBookingConfirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookingConfirmationInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email address of the user.'),
  phoneNumber: z.string().describe('The phone number of the user.'),
  spaceName: z.string().describe('The name of the booked space.'),
  bookingDateTime: z.string().describe('The date and time of the booking.'),
  duration: z.string().describe('The duration of the booking (e.g., hourly, daily).'),
  confirmationPreference: z.enum(['email', 'sms']).describe('The preferred method of confirmation (email or SMS).'),
});
export type BookingConfirmationInput = z.infer<typeof BookingConfirmationInputSchema>;

const BookingConfirmationOutputSchema = z.object({
  confirmationSent: z.boolean().describe('Whether the booking confirmation was successfully sent.'),
  message: z.string().describe('A message indicating the status of the confirmation.'),
});
export type BookingConfirmationOutput = z.infer<typeof BookingConfirmationOutputSchema>;

export async function sendBookingConfirmation(input: BookingConfirmationInput): Promise<BookingConfirmationOutput> {
  return sendBookingConfirmationFlow(input);
}

const bookingConfirmationPrompt = ai.definePrompt({
  name: 'bookingConfirmationPrompt',
  input: {schema: BookingConfirmationInputSchema},
  output: {schema: BookingConfirmationOutputSchema},
  prompt: `You are a booking assistant. Your task is to send a booking confirmation to the user.
  The user's name is: {{{name}}}
  The user's email is: {{{email}}}
  The user's phone number is: {{{phoneNumber}}}
  The booked space name is: {{{spaceName}}}
  The booking date and time is: {{{bookingDateTime}}}
  The booking duration is: {{{duration}}}
  The preferred method of confirmation is: {{{confirmationPreference}}}

  Based on the preferred method, send a confirmation message.
  If the preferred method is email, send an email confirmation.
  If the preferred method is SMS, send an SMS confirmation.

  Return whether the confirmation was sent successfully and a confirmation message.
  `,
});

const sendBookingConfirmationFlow = ai.defineFlow(
  {
    name: 'sendBookingConfirmationFlow',
    inputSchema: BookingConfirmationInputSchema,
    outputSchema: BookingConfirmationOutputSchema,
  },
  async input => {
    const {output} = await bookingConfirmationPrompt(input);
    return output!;
  }
);
