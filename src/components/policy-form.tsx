"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignaturePad } from "@/components/signature-pad";
import { saveAcceptance } from "@/lib/storage";
import type { PolicyAcceptance } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, User, Hash, Edit3 } from "lucide-react";

const policyFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  identificationNumber: z.string().min(5, {
    message: "Identification number must be at least 5 characters.",
  }),
  signature: z.string().refine(value => value.startsWith('data:image/png;base64,') && value.length > 100 , {
    message: "A signature is required. Please draw your signature.",
  }),
});

export type PolicyFormValues = z.infer<typeof policyFormSchema>;

export function PolicyForm() {
  const { toast } = useToast();

  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      fullName: "",
      identificationNumber: "",
      signature: "",
    },
  });

  function onSubmit(data: PolicyFormValues) {
    const acceptanceData: PolicyAcceptance = {
      id: Date.now().toString(), // Simple unique ID
      ...data,
      timestamp: new Date().toISOString(),
    };
    saveAcceptance(acceptanceData);
    toast({
      title: "Policy Accepted",
      description: "Your acceptance has been recorded locally.",
      variant: "default",
      action: (
        <div className="flex items-center text-green-500">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Success</span>
        </div>
      ),
    });
    form.reset(); 
    // Manually trigger re-render of signature pad to clear if needed, 
    // or ensure signature pad's clear function is called and form state updated.
    // SignaturePad is already cleared and form.reset() clears the signature field.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 bg-card rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground/90">
                <User className="mr-2 h-4 w-4 text-primary" /> Full Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} className="bg-background"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identificationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground/90">
                <Hash className="mr-2 h-4 w-4 text-primary" /> Identification Number (Cédula)
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your identification number" {...field} className="bg-background"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-foreground/90">
                <Edit3 className="mr-2 h-4 w-4 text-primary" /> Signature
              </FormLabel>
              <FormControl>
                <SignaturePad 
                  onSignatureChange={field.onChange} 
                  width={350} 
                  height={150}
                  className="w-full" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <CheckCircle className="mr-2 h-5 w-5" /> Accept and Sign Policy
        </Button>
      </form>
    </Form>
  );
}
