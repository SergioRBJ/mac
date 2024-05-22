import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "MAC",
  description: "Microscopia a Chinesa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="min-h-screen">
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
