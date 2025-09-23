'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitCallbackRequest } from '@/app/actions';
import { spaces } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const callbackFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  companyName: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
  workspace: z.string({ required_error: 'Please select a workspace.' }),
  message: z.string().optional(),
});

type CallbackFormValues = z.infer<typeof callbackFormSchema>;

const typeLabels: { [key: string]: string } = {
  hot_desk: 'Hot Desk',
  dedicated_desk: 'Dedicated Desk',
  private_office: 'Private Office',
  meeting_room: 'Meeting Room',
  huddle_pods: 'Huddle Pods',
};

export default function CallbackForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: {
      name: '',
      companyName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (values: CallbackFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('companyName', values.companyName || '');
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('workspace', values.workspace);
    formData.append('message', values.message || '');

    startTransition(async () => {
      const result = await submitCallbackRequest(null, formData);
      if (result.success) {
        toast({
          title: 'Request Sent!',
          description: result.message,
        });
        form.reset();
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
    <Card className="bg-black border-gray-700 p-8 rounded-lg shadow-lg">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="font-headline text-3xl text-green-400">Request a Call Back</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 p-0">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name <span className="text-red-500">*</span></FormLabel>
                <FormControl><Input placeholder="Name" {...field} className="bg-white text-black border-gray-600" /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="companyName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Company Name</FormLabel>
                <FormControl><Input placeholder="Company Name" {...field} className="bg-white text-black border-gray-600" /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email <span className="text-red-500">*</span></FormLabel>
                <FormControl><Input type="email" placeholder="Email" {...field} className="bg-white text-black border-gray-600" /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number <span className="text-red-500">*</span></FormLabel>
                <FormControl><Input type="tel" placeholder="Phone Number" {...field} className="bg-white text-black border-gray-600" /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
             <FormField
                control={form.control}
                name="workspace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Select Workspace <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white text-black border-gray-600">
                          <SelectValue placeholder="Select a workspace" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(typeLabels).map((type) => (
                           <SelectItem key={type} value={type}>{typeLabels[type]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Additional Requests</FormLabel>
                <FormControl><Textarea placeholder="Message" rows={4} {...field} className="bg-white text-black border-gray-600" /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          </CardContent>
          <CardFooter className="p-0 mt-6">
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Get in Touch
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
