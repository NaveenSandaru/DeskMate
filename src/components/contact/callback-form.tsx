'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import emailjs from "emailjs-com";

const callbackFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  companyName: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
  workspace: z.string({ required_error: 'Please select a workspace.' }),
  message: z.string().optional(),
});

type CallbackFormValues = z.infer<typeof callbackFormSchema>;

interface CallBackFormProps {
  workSpace?: string;
}

const typeLabels: { [key: string]: string } = {
  hot_desk: 'Hot Desk',
  dedicated_desk: 'Dedicated Desk',
  private_office: 'Private Office',
  meeting_room: 'Meeting Room',
  huddle_pods: 'Huddle Pods',
};

export default function CallbackForm({ workSpace }: CallBackFormProps) {
  const { toast } = useToast();
  const [sendingMail, setSendingMail] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // Create a new form instance whenever workSpace changes
  const form = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: {
      name: '',
      companyName: '',
      email: '',
      phone: '',
      workspace: workSpace || '',
      message: '',
    },
  });

  // Force re-render of the form when workSpace changes
  useEffect(() => {
    if (workSpace) {
      // Update the form value
      form.setValue("workspace", workSpace, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });

      // Force a re-render by changing the key
      setFormKey(prev => prev + 1);
    }
  }, [workSpace, form]);

  const onSubmit = async (values: CallbackFormValues) => {
    setSendingMail(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        {
          title: "New call back request",
          name: values.name,
          companyName: values.companyName || "-",
          email: values.email,
          phone: values.phone,
          workspace: typeLabels[values.workspace] || values.workspace,
          message: values.message || "-",
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
        .then(() => toast({
          title: "Success",
          description: "Email sent successfully!"
        }))
        .catch((err: any) => {
          console.error("EmailJS error:", err);
          throw new Error("Failed to send email.");
        });
    }
    catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to send email. Please try again."
      });
    }
    finally {
      setSendingMail(false);
    }
  };

  return (
    <Card className="bg-black border-gray-700 p-8 rounded-lg shadow-lg">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="font-headline text-3xl text-green-400">Request a Call Back</CardTitle>
      </CardHeader>

      {/* Key prop forces re-render when workSpace changes */}
      <Form key={formKey} {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 p-0">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} className="bg-white text-black border-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="companyName" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} className="bg-white text-black border-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} className="bg-white text-black border-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone Number" {...field} className="bg-white text-black border-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField
              control={form.control}
              name="workspace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Select Workspace <span className="text-red-500">*</span></FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white text-black border-gray-600">
                        <SelectValue placeholder="Select a workspace">
                          {field.value ? (typeLabels[field.value] || field.value) : "Select a workspace"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(typeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
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
                <FormControl>
                  <Textarea placeholder="Message" rows={4} {...field} className="bg-white text-black border-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>

          <CardFooter className="p-0 mt-6">
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold"
              disabled={sendingMail}
            >
              {sendingMail ? (
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