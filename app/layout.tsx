import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Nav";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeWrapper from "./components/ThemeWrapper";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Patcharapol Pannaen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeWrapper>
            <div className="flex flex-col md:grid md:grid-cols-3">
              <div></div>
              <div>
                <Navbar />
                <main>
                  <Profile />
                  {children}
                </main>
              </div>
              <div></div>
            </div>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
