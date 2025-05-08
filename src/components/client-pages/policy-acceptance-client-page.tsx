"use client";

import { PolicyText } from "@/components/policy-text";
import { PolicyForm } from "@/components/policy-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PolicyAcceptanceClientPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-8">
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-card to-primary/10 p-6">
          <CardTitle className="text-3xl font-bold text-center text-primary">Privacy Policy Acceptance</CardTitle>
          <CardDescription className="text-center text-muted-foreground mt-2">
            Please review the policy below and provide your details to signify acceptance.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8">
          <div className="mb-8">
            <PolicyText />
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Confirm Your Acceptance</h3>
            <PolicyForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
