import "./globals.css";
import ReduxProvider from "@/src/redux-toolkit/provider";
import JsonSideBar from "@/src/components/JsonSidebar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-screen w-full flex-row overflow-x-hidden">
        <ReduxProvider>
          <JsonSideBar />
          <main className="min-w-0 w-full flex-1 bg-slate-50">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
