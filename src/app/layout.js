import { Syne } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header/Header"
import Footer from "@/src/components/Footer/Footer"
import LenisScrolling from "@/src/components/LenisScrolling/LenisScrolling"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import LayoutWrapper from "./layoutWrapper";
const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], fallback: ["sans-serif"] });

export const metadata = {
  title: "Syed Nasar | Full Stack Enginner",
  description: "Welcome to Syed Nasar’s portfolio. An experienced frontend developer specializing in HTML, CSS, JavaScript, and modern frameworks like React. Explore my projects and get in touch",
  keywords: "Frontend Developer, Syed Nasar, HTML, CSS, JavaScript, React, Vue.js, UI/UX Design"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={syne.className} suppressHydrationWarning={true}>
        {/* <LenisScrolling> */}
        <LayoutWrapper>
          <Header />
          {children}
          <Footer />
        </LayoutWrapper>
        {/* </LenisScrolling> */}
      </body>
    </html>
  );
}
