"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AppProvider } from "./AppContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/error";
import { ToastContainer } from "react-toastify";

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
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ToastContainer />
          </body>
        </AppProvider>
      </ErrorBoundary>
    </html>
  );
}
