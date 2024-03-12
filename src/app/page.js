import Image from "next/image";
import styles from "./page.module.css";
import SectionOne from "@/src/components/SectionOne/SectionOne"
import Services from "@/src/components/Services/Services"

export default function Home() {
  return (
    <>
      <SectionOne />
      <Services />
    </>
  );
}
