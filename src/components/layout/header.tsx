"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Fingerprint, Home, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppHeader() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Sign Policy', icon: Home },
    { href: '/admin', label: 'Admin View', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Fingerprint className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl sm:inline-block text-foreground">
            PrivacyPolicySigner
          </span>
        </Link>
        
        <nav className="hidden flex-1 items-center space-x-6 md:flex">
          {navItems.map((item) => (
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

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <Link href="/" className="mb-8 flex items-center space-x-2">
                <Fingerprint className="h-7 w-7 text-primary" />
                <span className="font-bold text-xl text-foreground">
                  PrivacyPolicySigner
                </span>
              </Link>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
