'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitBooking } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import type { Space } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  duration: z.enum(['hourly', 'daily', 'weekly', 'monthly'], { required_error: 'You need to select a booking duration.' }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  space: Space;
}

export default function BookingForm({ space }: BookingFormProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isPending, startTransition] = useTransition();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { name: '', email: '', phone: '', duration: 'hourly' },
  });

  const onSubmit = (values: BookingFormValues) => {
    if (!date) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Please select a date.',
        });
        return;
    }

    const formData = new FormData();
    formData.append('spaceId', space.id);
    formData.append('date', date.toISOString());
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('duration', values.duration);

    startTransition(async () => {
      const result = await submitBooking(null, formData);
      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        form.reset();
        setDate(new Date());
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message || 'An error occurred.',
        });
      }
    });
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Book this Space</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <Label className="mb-2 self-start">Select a Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="duration" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-2">
                      {Object.entries(space.pricing).map(([p, value]) => (
                        value && (
                        <FormItem key={p} className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value={p} /></FormControl>
                          <FormLabel className="font-normal capitalize text-sm">{p} - ${value}</FormLabel>
                        </FormItem>
                        )
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl><Input type="tel" placeholder="(123) 456-7890" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button type="submit" className="w-full !mt-6" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Book Now
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
