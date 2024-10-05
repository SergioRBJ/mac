import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "./clientProviders";

const poppins = Poppins({ subsets: ["latin"], weight: "500", display: "swap" });

const metadata = {
  title: "MAC 2.0",
  description: "Microscopia a Chinesa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" translate="no">
      <head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/assets/logo.png" />
      </head>
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
