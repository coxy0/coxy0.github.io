import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono-body",
  subsets: ["latin"],
  weight: ["400", "700"], // not a variable font
});

export const metadata: Metadata = {
  title: "oliver cox",
  description: "Oliver Cox, software engineer. Projects and contact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
