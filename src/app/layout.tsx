import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { cn } from "@/lib/utils";
import Redirect from "@/components/Redirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Search",
  description: "Upload and search your images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <UserProvider>
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
