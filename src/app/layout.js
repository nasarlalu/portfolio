import { Syne } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import LayoutWrapper from "./layoutWrapper";
const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], fallback: ["sans-serif"] });

export const metadata = {
  title: "Syed Nasar | Full Stack Engineer",
  description:
    "Explore the portfolio of Syed Nasar, a skilled Full Stack Engineer with expertise in modern web technologies like React, JavaScript, HTML, and CSS. Discover UI/UX projects, innovative web solutions, and get in touch for collaboration.",
  keywords: [
    "Syed Nasar",
    "Full Stack Engineer",
    "Frontend Engineer",
    "React Enthusiast",
    "Shopify Developer",
    "JavaScript",
    "HTML",
    "CSS",
    "UI/UX Design",
    "Web Engineering",
    "Portfolio",
    "Next.js"
  ],
  metadataBase: new URL("https://syednasar.vercel.app"),
  authors: [{ name: "Syed Nasar", url: "https://syednasar.vercel.app" }],
  creator: "Syed Nasar",
  publisher: "Syed Nasar",
  openGraph: {
    title: "Syed Nasar | Full Stack Engineer",
    description:
      "Browse the professional portfolio of Syed Nasar, featuring cutting-edge frontend and full-stack development projects built with React, Next.js, and more.",
    url: "https://syednasar.vercel.app",
    siteName: "Syed Nasar Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://syednasar.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Syed Nasar Portfolio Screenshot"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  category: "technology"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="favicon.png" sizes="any" />
      <body className={syne.className} suppressHydrationWarning={true}>
        {/* <LenisScrolling> */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        {/* </LenisScrolling> */}
      </body>
    </html>
  );
}
