import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Take It Cheesy Food Services",
  description:
    "Experience culinary excellence with our interactive showcase of world-class dishes, featuring authentic global flavors and seamless online ordering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
