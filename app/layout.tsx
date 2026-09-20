import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavMenu from "./components/nav-menu";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yarik's Portfolio",
  description: "Mir Yarik's AI Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} font-nunito h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
