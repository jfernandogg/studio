
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AppHeader } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AuthProvider } from '@/components/providers/auth-provider'; // Import AuthProvider

export const metadata: Metadata = {
  title: 'PrivacyPolicySigner',
  description: 'Accept and manage privacy policy signatures.',
  icons: {
    icon: '/favicon.ico', // It's good practice to have this, even if not generating the file itself
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning // Added to address extension-injected attributes
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          GeistSans.variable, 
          GeistMono.variable
        )}
      >
        <AuthProvider> {/* Wrap content with AuthProvider */}
          <AppHeader />
          <main className="flex-1 py-8">
            {children}
          </main>
          <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by Your Name/Company. Illustrations by{' '}
                <a
                  href="https://popsy.co"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-primary"
                >
                  Popsy
                </a>
                . The source code is available on{' '}
                <a
                  href="#" // Replace with actual GitHub link if applicable
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-primary"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </footer>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
