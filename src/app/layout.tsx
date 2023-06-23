"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AppProvider } from "./AppContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/error";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carefinder | Find Hospitals",
  description: "Find hospitals near you",
  keywords: "hospitals, health, care, finder, carefinder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppProvider>
          <body>
            <Navbar />
            {children}
          </body>
        </AppProvider>
      </ErrorBoundary>
    </html>
  );
}
