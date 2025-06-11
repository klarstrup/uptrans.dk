import type { Metadata } from "next";
import "./globals.css";
import boardJpg from "./board.jpg";

export const metadata: Metadata = {
  title: "UpTrans - Trans & Non-Binary Bouldering Meet-Up",
  description:
    "What's UpTrans? UpTrans is a meet-up for trans & non-binary climbers.",
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
          backgroundImage: `url('${boardJpg.src}'), url('${boardJpg.blurDataURL}')`,
          backgroundSize: "contain, contain",
          backgroundPosition: "center, center",
          animation: "blurIn 666ms forwards ease-out",
        }}
      >
        {children}
      </body>
    </html>
  );
}
