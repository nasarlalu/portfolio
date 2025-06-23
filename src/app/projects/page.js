"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from './style.module.scss';
import Image from 'next/image';

export default function Projects() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });
    const projects = [
        { href: 'https://www.benfy.co/', src: '/assets/images/projects__benfy.png', title: 'Benfy' },
        { href: 'https://kethini.com/', src: '/assets/images/projects__kethini.png', title: 'Kethini' },
        { href: 'https://vbdace.com/', src: '/assets/images/projects__vbdace.png', title: 'VBdace' },
        { href: 'https://fyva.in/', src: '/assets/images/projects__fyva.png', title: 'Fyva' },
        { href: 'https://icse.kingston.ac.in/', src: '/assets/images/projects__kingston.png', title: 'Kingston' },
    ];

    // Corrected ticker transformations
    const tickerTopX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const tickerBottomX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Fixed image transformation
    const imageY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(projects.length - 1) * 100}%`]
    );


    const [activeProject, setActiveProject] = useState(projects[0].title);

    const imageRefs = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute('data-index'));
                        setActiveProject(projects[idx]?.title);
                    }
                });
            },
            { threshold: 0.5 }
        );

        imageRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            imageRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <main className={styles.project__section} ref={sectionRef}>
            <section
                className={styles.project__tickerTop}
            >
                <motion.ul className={styles.project__tickerList} style={{ x: tickerTopX }}>
                    {Array(50).fill(activeProject).map((text, idx) => (
                        <li key={`top-${idx}`} className={styles.project__tickerListItem}>{text}</li>
                    ))}
                </motion.ul>
            </section>

            <motion.div className={styles.project__imageWrapper} style={{ y: imageY }}>
                {projects.map((item, i) => (
                    <div
                        key={i}
                        className={styles.project__imageBox}
                        ref={(el) => (imageRefs.current[i] = el)}
                        data-index={i}
                    >
                        <a href={item.href} target='_blank' rel="noopener noreferrer" className={styles.projects__link}>
                            <Image
                                src={item.src}
                                width={1920}
                                height={1080}
                                alt={item.title}
                                className={styles.projects__img}
                            />
                        </a>
                    </div>
                ))}
            </motion.div>

            <section
                className={styles.project__tickerBottom}
            >
                <motion.ul className={styles.project__tickerList} style={{ x: tickerBottomX }}>
                    {Array(50).fill(activeProject).map((text, idx) => (
                        <li key={`bottom-${idx}`} className={styles.project__tickerListItem}>{text}</li>
                    ))}
                </motion.ul>
            </section>
        </main>
    );
}