import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/app/providers/AppProviders";
import { defaultGeneralInfo } from "@/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BME",
  description: "BME ecommerce application",
};

export default function RootLayout({ children }) {
  const bmeThemeVars = {
    "--bme-primary": defaultGeneralInfo.primary_color,
    "--bme-primary-dark": defaultGeneralInfo.primary_dark_color,
    "--bme-primary-bright": defaultGeneralInfo.primary_bright_color,
    "--bme-accent": defaultGeneralInfo.accent_color,
    "--bme-bg": defaultGeneralInfo.page_background_color,
    "--bme-card": defaultGeneralInfo.card_background_color,
    "--bme-border": defaultGeneralInfo.border_color,
    "--bme-border-soft": defaultGeneralInfo.border_soft_color,
    "--bme-text": defaultGeneralInfo.title_color,
    "--bme-muted": defaultGeneralInfo.text_muted_color,
    "--bme-hover": defaultGeneralInfo.outline_button_hover_background_color,
    "--bme-button-text": defaultGeneralInfo.button_text_color,
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={bmeThemeVars}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
