import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header/Header"
import Footer from "@/src/components/Footer/Footer"
import SmoothScrolling from "@/src/components/SmoothScrolling/SmoothScrolling"
import CustomCursor from "@/src/hooks/CustomCursor"
// const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });

export const metadata = {
  title: "Syed Nasar | Frontend Developer",
  description: "Welcome to Syed Nasar’s portfolio. An experienced frontend developer specializing in HTML, CSS, JavaScript, and modern frameworks like React. Explore my projects and get in touch",
  keywords: "Frontend Developer, Syed Nasar, HTML, CSS, JavaScript, React, Vue.js, UI/UX Design"
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={syne.className} suppressHydrationWarning={true}>
        {/* <CustomCursor /> */}
        <main className="main">
          <SmoothScrolling>
            <Header />
            {children}
            <Footer/>
          </SmoothScrolling>
        </main>
      </body>
    </html>
  );
}
