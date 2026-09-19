import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/src/redux-toolkit/provider";
import JsonSideBar from "@/src/components/JsonSidebar/page";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}  h-full antialiased`}>
      <body className="flex flex-row min-h-screen ">
        <ReduxProvider>
          <JsonSideBar />
          <main className="flex-1">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
