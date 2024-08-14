import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "./clientProviders";
import { Header } from "@/components/Header";

const poppins = Poppins({ subsets: ["latin"], weight: "500", display: "swap" });

const metadata = {
  title: "MAC 2.0",
  description: "Microscopia a Chinesa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <div className="min-h-screen">
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
