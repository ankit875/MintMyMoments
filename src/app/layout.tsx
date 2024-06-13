import "./globals.css";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { Providers } from "../contexts/providers";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "MintMyMoment",
  description:
    "Mint My Moment transforms memorable digital experiences into dynamic NFTs, which evolve and engage over time based on real-world interactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${monteserrat.variable}, ${fjallaOne.variable}`}
    >
      <body>
        <Providers>
          <Theme
            accentColor="purple"
            grayColor="olive"
            panelBackground="solid"
            scaling="100%"
            radius="large"
          >
            <div className="min-h-screen">
              <Header />
              {children}
              <Toaster />
            </div>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
