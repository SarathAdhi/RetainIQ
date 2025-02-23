import { AppProvider } from "@/context/AppContext";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "700", "300", "500", "900", "600", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={figtree.className}>
          {children}

          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </AppProvider>
    </html>
  );
}
