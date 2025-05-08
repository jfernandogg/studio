
"use client";

import type { PropsWithChildren } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // auth can now be undefined
import { AuthContext, type AuthContextType } from '@/contexts/auth-context';
import { allowedEmails } from '@/config/allowed-emails';
import { useToast } from '@/hooks/use-toast';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkAuthorization = useCallback((currentUser: FirebaseUser | null) => {
    if (currentUser && currentUser.email) {
      if (allowedEmails.includes(currentUser.email)) {
        setIsAuthorized(true);
        setError(null); // Clear previous errors on successful authorization
        return true;
      } else {
        setIsAuthorized(false);
        const authErrorMsg = `Account ${currentUser.email} is not authorized. Signing out.`;
        setError(authErrorMsg);
        toast({
          title: "Unauthorized",
          description: authErrorMsg,
          variant: "destructive",
        });
        if (auth) { // Check if auth is available before calling signOut
            signOut(auth).catch(err => console.error("Error signing out unauthorized user:", err));
        }
        return false;
      }
    }
    setIsAuthorized(false);
    return false;
  }, [toast]);

  useEffect(() => {
    setIsLoading(true);
    if (!auth) {
      const configErrorMsg = "Firebase is not configured. Please check environment variables and Firebase setup.";
      setError(configErrorMsg);
      setIsLoading(false);
      setUser(null);
      setIsAuthorized(false);
      toast({
        title: "Configuration Error",
        description: configErrorMsg,
        variant: "destructive",
      });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkAuthorization(currentUser);
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
      setIsLoading(false);
    }, (authError) => {
        console.error("Firebase Auth State Error:", authError);
        setError(authError.message || "An error occurred with Firebase Authentication.");
        setIsLoading(false);
        setUser(null);
        setIsAuthorized(false);
        toast({
            title: "Authentication Error",
            description: authError.message || "Failed to get authentication state.",
            variant: "destructive",
        });
    });
    return () => unsubscribe();
  }, [checkAuthorization, toast]);

  const signInWithGoogle = async () => {
    if (!auth) {
      const configErrorMsg = "Firebase is not configured. Cannot sign in.";
      setError(configErrorMsg);
      toast({
        title: "Configuration Error",
        description: configErrorMsg,
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle setting user and authorization
    } catch (err: any) {
      console.error("Error during sign-in:", err);
      const signInErrorMsg = err.message || "Failed to sign in with Google.";
      setError(signInErrorMsg);
      setUser(null);
      setIsAuthorized(false);
      toast({
        title: "Sign-In Error",
        description: signInErrorMsg,
        variant: "destructive",
      });
      setIsLoading(false); // Ensure loading is false on error
    }
    // setIsLoading(false) is handled by onAuthStateChanged or error cases
  };

  const signOutUser = async () => {
    if (!auth) {
      const configErrorMsg = "Firebase is not configured. Cannot sign out.";
      setError(configErrorMsg);
        toast({
            title: "Configuration Error",
            description: configErrorMsg,
            variant: "destructive",
        });
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthorized(false);
    } catch (err: any) {
      console.error("Error during sign-out:", err);
      const signOutErrorMsg = err.message || "Failed to sign out.";
      setError(signOutErrorMsg);
       toast({
        title: "Sign-Out Error",
        description: signOutErrorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthorized,
    error,
    signInWithGoogle,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
