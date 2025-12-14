import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Airvent",
  description: "Next-generation decentralized air quality monitoring device",
  icons: {
    icon: "/airvent.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
