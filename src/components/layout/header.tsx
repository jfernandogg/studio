
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Fingerprint, Home, ShieldCheck, LogIn, LogOut, UserCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function AppHeader() {
  const pathname = usePathname();
  const { user, isLoading, isAuthorized, signInWithGoogle, signOutUser } = useAuth();

  const navItems = [
    { href: '/', label: 'Sign Policy', icon: Home, requiresAuth: true },
    { href: '/admin', label: 'Admin View', icon: ShieldCheck, requiresAuth: true },
  ];

  const availableNavItems = navItems.filter(item => !item.requiresAuth || (user && isAuthorized));

  const AuthControls = () => {
    if (isLoading) {
      return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
    }
    if (user && isAuthorized) {
      return (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <UserCircle className="h-5 w-5" />
            <span className="hidden sm:inline">{user.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={signOutUser}>
            <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      );
    }
    return (
      <Button variant="outline" size="sm" onClick={signInWithGoogle}>
        <LogIn className="mr-2 h-4 w-4" /> Sign In
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-4 sm:mr-8 flex items-center space-x-2">
          <Fingerprint className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl sm:inline-block text-foreground">
            PrivacyPolicySigner
          </span>
        </Link>
        
        <nav className="hidden flex-1 items-center space-x-6 md:flex">
          {availableNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground/70"
              )}
            >
              <item.icon className="inline mr-1.5 h-4 w-4 align-middle" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end items-center md:hidden">
           <div className="mr-2"> <AuthControls /> </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6 flex flex-col">
              <Link href="/" className="mb-8 flex items-center space-x-2">
                <Fingerprint className="h-7 w-7 text-primary" />
                <span className="font-bold text-xl text-foreground">
                  PrivacyPolicySigner
                </span>
              </Link>
              <nav className="flex flex-col space-y-3">
                {availableNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                    )}
                  >
                    <item.icon className="inline mr-2 h-5 w-5 align-middle" />
                    {item.label}
                  </Link>
                ))}
              </nav>
               {/* Mobile Auth Controls can be placed here if needed, or rely on desktop version if sheet closes */}
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center">
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
