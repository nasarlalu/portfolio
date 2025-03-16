"use client"
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link'
import styles from "./page.module.scss";
import banner from '@/public/assets/images/me_transparent.png'
import { AiOutlineDownload } from "react-icons/ai";
import { PiMonitorThin } from "react-icons/pi";
import AnimatedText from "@/src/components/Animations/AnimatedText";
export default function Home() {

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  };


  const skillArray = [
    {
      skill__gridIcon: '👨‍💻',
      skill__gridSkill: 'UI/UX Excellence'
    },
    {
      skill__gridIcon: '🚀',
      skill__gridSkill: 'High Performance'
    },
    {
      skill__gridIcon: '🎨',
      skill__gridSkill: 'Responsive Design'
    },
    {
      skill__gridIcon: '🛠️',
      skill__gridSkill: 'Scalable Code'
    },
  ]

  const centredGridAnime = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  }



  return (
    <main className="main__homePage">

      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroGridItem}>
              <div className={styles.heroBannerWrapper}>
                <Image src={banner} alt='banner' quality={100} className={styles.heroBanner} />
              </div>
            </div>

            <div className={styles.heroGridItem}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTite}>Syed</h1>
                <h1 className={styles.heroTite}>Nasar</h1>

                <h6 className={styles.heroRole}>Full Stack Enginner</h6>
                <p className={styles.heroDesp}>Hi, I’m a creative Full Stack Engineer who loves building sleek and user-friendly web experiences</p>

                <Link href='/assets/syed_nasar_resume.pdf' className={styles.heroBtn}>
                  <span className={styles.heroText}>Download CV</span>
                  <AiOutlineDownload className={styles.heroIcon} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className={styles.serviceSection}>
        <div className='container'>
          <div className={styles.TitleGrid}>
            <div className={styles.TitleGridtem}>
              <p className={styles.TitleText__uppercase}>What I’m good at</p>
              <h1>Solutions</h1>
            </div>
            <div className={styles.TitleGridtem}>
              <p className={styles.TitleText}>I offer a suite of services designed to bring your ideas to life.
                Let’s transform your vision into a digital masterpiece together.
                Explore my services and let’s start building your dream digital presence today!
              </p>
            </div>
          </div>

          <div className={styles.serviceGrid}>

            <div className={styles.serviceGridItem}>
              <PiMonitorThin className={styles.serviceGridIcon} />
              <h2 className={styles.serviceGridHeading}>Shopify Store</h2>
              <p className={styles.serviceGridtext}>Want to sell online without the hassle? I build Shopify stores that are easy to manage, look great, and help you start selling fast—no tech headaches, just a smooth shopping experience for your customers.</p>
            </div>

            <div className={styles.serviceGridItem}>
              <PiMonitorThin className={styles.serviceGridIcon} />
              <h2 className={styles.serviceGridHeading}>Custom Web Apps</h2>
              <p className={styles.serviceGridtext}>Need a web app tailored to your unique needs? I design and develop custom web applications that are fast, scalable, and built to solve real problems—whether it’s a dashboard, booking system, or something completely unique.</p>
            </div>

            <div className={styles.serviceGridItem}>
              <PiMonitorThin className={styles.serviceGridIcon} />
              <h2 className={styles.serviceGridHeading}>Web Design</h2>
              <p className={styles.serviceGridtext}>Great design isn’t just about looks—it’s about experience. I create clean, modern, and user-friendly web designs that not only look stunning but also provide a smooth and engaging experience for your visitors.</p>
            </div>
          </div>

        </div>
      </section>



      <section className={styles.skillSection}>
        <div className="container">

          <div className={styles.skill__wrapper}>
            <div className={styles.skill__wrapItem}>
              <h2 className={styles.skill__wraptextTitle}><AnimatedText text="Bringing Ideas to Life with Code & Creativity" /></h2>
              <p className={styles.skill__wraptext}>
                I specialize in building dynamic, responsive, and visually engaging digital experiences with a focus on performance and usability.
              </p>
              <p className={styles.skill__wraptext}>
                From frontend elegance to backend efficiency, I leverage modern technologies to develop seamless, high-quality web applications.
              </p>
            </div>

            <div className={styles.skill__wrapItem}>
              <motion.div
                className={styles.skill__grid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {skillArray?.map((item, index) => (
                  <motion.div
                    key={index}
                    className={styles.skill__gridItem}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className={styles.skill__gridIcon}>{item?.skill__gridIcon}</span>
                    <h2 className={styles.skill__gridSkill}>{item?.skill__gridSkill}</h2>
                  </motion.div>
                ))}

                <motion.div className={styles.skill__gridItemCentred} variants={centredGridAnime}>
                  <h6 className={styles.skill__gridItemCentredTitle}>SKILLS</h6>
                </motion.div>
              </motion.div>

            </div>
          </div>



        </div>
      </section>



    </main>
  );
}
