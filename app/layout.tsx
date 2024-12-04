import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import {ClerkProvider} from '@clerk/nextjs'
import {dark} from "@clerk/themes"
import Provider from "./Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Collab-Pad",
  description: "Collaborative Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
       appearance={{
        baseTheme : dark,
        variables : {
          colorPrimary:"#3371FF",
          fontSize : '16px'
        },
       }}
    >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
        {children}
        </Provider>
        <Analytics/>
      </body>
    </html>
    </ClerkProvider>
  );
}
