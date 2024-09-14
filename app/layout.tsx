import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";  // Ensure correct path to your context file

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HairyHaven Blogging platform",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={` comments ${inter.className}`} >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
