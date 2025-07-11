"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.scss";
import banner from '@/public/assets/images/me_transparent.png'
import Header from "@/src/components/Header/Header"
import Footer from "@/src/components/Footer/Footer"
import { AiOutlineDownload } from "react-icons/ai";
import { PiMonitorThin } from "react-icons/pi";
import AnimatedText from "@/src/components/Animations/AnimatedText";
import { skillContainerVariants, skillItemVariants, skillCenteredGridAnime, serviceContainerVariants, serviceItemVariants, downloadBtnVariant } from '@/src/components/FramerSettings/framerSettings'
import { useAnimateOnView } from '@/src/hooks/useAnimateOnView'
import { ShopifyIcon, FigmaIcon } from "@/public/icon-pack"
import RealPageWrapper from "@/src/components/Loader/PageWrapper"
import Project from '@/src/components/Projects/Project'
import React from "react";

export default function Home() {

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

  const serviceItems = [
    {
      title: "Shopify Store",
      description: "Want to sell online without the hassle? I build Shopify stores that are easy to manage, look great, and help you start selling fast—no tech headaches, just a smooth shopping experience for your customers.",
    },
    {
      title: "Custom Web Apps",
      description: "Need a web app tailored to your unique needs? I design and develop custom web applications that are fast, scalable, and built to solve real problems—whether it’s a dashboard, booking system, or something completely unique.",
    },
    {
      title: "Web Design",
      description: "Great design isn’t just about looks—it’s about experience. I create clean, modern, and user-friendly web designs that not only look stunning but also provide a smooth and engaging experience for your visitors.",
    },
  ];

  const serviceSection = useAnimateOnView({ margin: "-50px" });
  const skillSection = useAnimateOnView({ margin: "-50px" });


  return (
    // <RealPageWrapper showMetrics={false}>
    <React.Fragment>
      <Header />
      <main className="main__homePage">

        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroGrid}>

              <div className={styles.heroGridItem__mob}>
                <h1 className={styles.heroTite}><AnimatedText text={"Syed"} /></h1>
                <h1 className={styles.heroTite}><AnimatedText text={"Nasar"} /></h1>
                <h6 className={styles.heroRole}> <AnimatedText text={"Full Stack Enginner"} /></h6>
              </div>

              <div className={styles.heroGridItem}>
                <div className={styles.heroBannerWrapper}>
                  <Image src={banner} alt='banner' quality={100} className={styles.heroBanner} priority />
                </div>
              </div>

              <div className={styles.heroGridItem}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTite}><AnimatedText text={"Syed"} /> </h1>
                  <h1 className={styles.heroTite}><AnimatedText text={"Nasar"} /></h1>

                  <h6 className={styles.heroRole}> <AnimatedText text={"Full Stack Enginner"} /></h6>
                  <p className={styles.heroDesp}><AnimatedText gap="4px" text={"Hi, I’m a creative Full Stack Engineer who loves building sleek and user-friendly web experiences"} /></p>

                  <motion.div
                    variants={downloadBtnVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <a target="_blank" href='/assets/syed_nasar_resume.pdf' className={styles.heroBtn}>
                      <span className={styles.heroText}>Download CV</span>
                      <AiOutlineDownload className={styles.heroIcon} />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className={styles.serviceSection}>
          <div className='container'>
            <div className={styles.TitleGrid}>
              <div className={styles.TitleGridtem}>
                <p className={styles.TitleText__uppercase}><AnimatedText text={"What I’m good at"} /></p>
                <h1> <AnimatedText text={"Solutions"} /> </h1>
              </div>
              <div className={styles.TitleGridtem}>
                <p className={styles.TitleText}>
                  <AnimatedText gap="4px" text={"I offer a suite of services designed to bring your ideas to life. Let’s transform your vision into a digital masterpiece together. Explore my services and let’s start building your dream digital presence today!"} />
                </p>
              </div>
            </div>

            <motion.div
              ref={serviceSection?.ref}
              className={styles.serviceGrid}
              initial={"hidden"}
              animate={serviceSection?.hasAnimated ? "visible" : "hidden"}
              variants={serviceContainerVariants}
            >
              {serviceItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.serviceGridItem}
                  variants={serviceItemVariants}
                  style={{ willChange: 'opacity, transform' }}
                  whileHover={{ scale: 1.03 }}
                >
                  {item?.title == "Shopify Store" && <ShopifyIcon className={styles.serviceGridIcon} />}
                  {item?.title == "Custom Web Apps" && <PiMonitorThin className={styles.serviceGridIcon} />}
                  {item?.title == "Web Design" && <FigmaIcon className={styles.serviceGridIcon} />}

                  <h2 className={styles.serviceGridHeading}>{item.title}</h2>
                  <p className={styles.serviceGridtext}>{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>



        <section className={styles.skillSection}>
          <div className="container">

            <div className={styles.skill__wrapper}>
              <div className={styles.skill__wrapItem}>
                <h2 className={styles.skill__wraptextTitle}><AnimatedText text="Bringing Ideas to Life with Code & Creativity" /></h2>
                <p className={styles.skill__wraptext}>
                  <AnimatedText gap="4px" text={"I specialize in building dynamic, responsive, and visually engaging digital experiences with a focus on performance and usability."} />
                </p>
                <p className={styles.skill__wraptext}>
                  <AnimatedText gap="4px" text={"From frontend elegance to backend efficiency, I leverage modern technologies to develop seamless, high-quality web applications."} />
                </p>
              </div>

              <div className={styles.skill__wrapItem}>
                <motion.div
                  ref={skillSection?.ref}
                  className={styles.skill__grid}
                  variants={skillContainerVariants}
                  initial="hidden"
                  animate={skillSection?.hasAnimated ? "visible" : "hidden"}

                >
                  {skillArray?.map((item, index) => (
                    <motion.div
                      key={index}
                      className={styles.skill__gridItem}
                      variants={skillItemVariants}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className={styles.skill__gridIcon}>{item?.skill__gridIcon}</span>
                      <h2 className={styles.skill__gridSkill}>{item?.skill__gridSkill}</h2>
                    </motion.div>
                  ))}

                  <motion.div className={styles.skill__gridItemCentred} variants={skillCenteredGridAnime}>
                    <h6 className={styles.skill__gridItemCentredTitle}>SKILLS</h6>
                  </motion.div>
                </motion.div>

              </div>
            </div>



          </div>
        </section>

        <Project />



      </main>
      <Footer />
    </React.Fragment>
    // </RealPageWrapper>
  );
}
