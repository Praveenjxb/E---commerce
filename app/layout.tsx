import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUFFY — Fashion That Moves With You",
  description: "Premium fashion e-commerce — Men, Women, Kids & Beauty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
