import type { Metadata } from "next";
import "./globals.css";
import boardJpg from "./board.jpg";

export const metadata: Metadata = {
  title: "UpTrans - Trans & Non-Binary Bouldering Meet-Up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        style={{
          backgroundImage: `url(${boardJpg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {children}
      </body>
    </html>
  );
}
