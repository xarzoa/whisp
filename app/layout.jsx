import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jb_mono",
});

const dmsans = DM_Sans({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmsans",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-screen",
          dmsans.variable,
          jbMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster
            toastOptions={{
              className: "backdrop-blur-lg bg-black/20",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
