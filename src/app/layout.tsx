"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/providers/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // Dados não serão requisitados novamente por 1 minuto(s), exceto se a requisição atual for invalidada manualmente ou a página for atualizada
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true
    }
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
          <ToastProvider>
            {children}
          </ToastProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
