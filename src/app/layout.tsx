import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Play Audio - Landing Page",
  description: "Auto play music at scheduled time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
