import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProviderWrapper from "@/components/query-client";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cognitive Cards",
  description: "Let us help you study effectively",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <QueryClientProviderWrapper>
        <html lang="en">
          <body className="mt-20 pb-8 px-8">
            <Navbar />
            {children}
            <Analytics />
          </body>
        </html>
      </QueryClientProviderWrapper>
    </ClerkProvider>
  );
}
