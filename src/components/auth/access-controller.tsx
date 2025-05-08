
"use client";

import type { PropsWithChildren } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldAlert, LogIn, LogOut } from 'lucide-react';

export function AccessController({ children }: PropsWithChildren) {
  const { user, isLoading, isAuthorized, signInWithGoogle, signOutUser, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  if (error && !user) { // Show sign-in error only if user is not logged in
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-4">
        <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-destructive">Authentication Error</h2>
        <p className="mb-6 text-muted-foreground">{error}</p>
        <Button onClick={signInWithGoogle} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <LogIn className="mr-2 h-4 w-4" /> Try Sign In Again
        </Button>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-4">
        <ShieldAlert className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="mb-6 text-muted-foreground">Please sign in to access the application.</p>
        <Button onClick={signInWithGoogle} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <LogIn className="mr-2 h-4 w-4" /> Sign In with Google
        </Button>
      </div>
    );
  }

  if (!isAuthorized) {
    // This state means the user is authenticated with Firebase but not in allowedEmails list.
    // AuthProvider should have initiated a sign-out. This view is a fallback/transient state.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center p-4">
        <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-destructive">Not Authorized</h2>
        <p className="mb-6 text-muted-foreground">
          Your account ({user.email || 'Unknown email'}) is not authorized to access this application.
          You have been signed out. If you believe this is an error, please contact support.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
           Reload
        </Button>
         {/* Or offer a sign out button if AuthProvider failed to sign out
         <Button onClick={signOutUser} variant="outline">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
        */}
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
}
