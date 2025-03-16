"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const containerVariants = {
        hidden: { x: 0, opacity: 0, scale: 0.8 },
        visible: { x: -100, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
        exit: { x: 0, opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    };

    const handleOpen = () => {
        setShowButton(false);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.navbar}>
                {showButton && (
                    <motion.button
                        className={styles.menuTrigger__btn}
                        onClick={handleOpen}
                        aria-label="Open menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.3 } }} // Button fades in smoothly
                    >
                        <svg width="160" height="119" viewBox="0 0 160 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.7458 47.2569H83.0703L74.048 56.1494L70.5902 53.5147L71.7351 52.2311C75.0169 48.5511 76.8303 43.792 76.8303 38.8605L91.3458 38.8142L93.7458 47.2569Z" fill="#18191D" />
                            <path d="M160 37.3778C153.495 37.3778 141.353 40.7111 142.727 52.8284C144.604 69.3885 160 73.808 160 91.8382C160 102.473 158.325 111.147 154.075 113.595L152.96 107.385C152.521 104.948 150.251 103.292 147.792 103.598L122.581 106.866C119.591 107.255 117.067 106.549 116.084 105.943C116.059 103.781 115.808 101.392 115.067 98.7538C113.463 93.0525 104.204 75.3476 101.205 64.7093H59.4702C55.632 64.7093 52.2595 62.1582 51.2178 58.4622L47.024 43.5929C45.904 39.6231 42.2827 36.8818 38.1582 36.8818H9.05066L6.74665 27.8258H160V37.3778ZM54.5813 48.6062L56.9209 56.8569C57.2444 57.9965 58.2844 58.7822 59.4684 58.7822H96.3431C97.9396 58.7822 99.0933 57.2569 98.6578 55.7209L93.3209 36.8356L63.4276 36.8818C57.3227 36.8907 52.9156 42.7307 54.5813 48.6062Z" fill="#18191D" />
                            <path d="M0 24.864V3.29245H6.37333L10.4409 0H15.2747L16.1227 3.29245H154.073L159.62 24.864H0Z" fill="#18191D" />
                            <path d="M122.962 109.806L148.173 106.539C149.061 106.418 149.885 107.028 150.043 107.909L151.202 114.37L122.777 118.052C118.537 118.601 114.885 117.628 115.047 115.671C115.175 114.132 115.717 111.916 115.973 109.131C117.908 109.842 120.475 110.124 122.962 109.806Z" fill="#18191D" />
                        </svg>

                    </motion.button>
                )}

                <AnimatePresence
                    onExitComplete={() => setShowButton(true)} // Show button **only after** exit animation is done
                >
                    {isOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={containerVariants}
                            className={styles.link_cntr}
                        >

                            <svg onClick={handleClose}
                                className={styles.menuClose__btn}
                                aria-label="Close menu" width="533" height="349" viewBox="0 0 533 349" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M397.688 201.687H502.063C518.938 201.687 532.375 215.125 532.375 232C532.375 248.875 518.938 262.312 502.063 262.312H398.313C381.438 262.312 368 248.875 368 232C367.375 215.125 380.813 201.687 397.688 201.687ZM502.063 91.6875H428.625V30.4375H502.063C518.938 30.4375 532.375 43.875 532.375 60.75C532.375 77.625 518.938 91.6875 502.063 91.6875ZM397.688 287H471.125C488 287 501.438 300.437 501.438 317.312C501.438 334.187 488 347.625 471.125 347.625H397.688C380.813 347.625 367.375 334.187 367.375 317.312C367.375 300.437 380.813 287 397.688 287ZM172.063 104.188L266.438 9.18749C272.063 3.56249 279.875 0.125 287.688 0.125H373.625C390.5 0.125 403.938 13.5625 403.938 30.4375V146.687C403.938 163.562 390.5 177 373.625 177C356.75 177 343.313 163.562 343.313 146.687V79.5C343.313 72.625 337.688 67 330.813 67C323.938 67 318.313 72.625 318.313 79.5C318.313 153.562 257.688 213.562 184.25 213.562C177.375 213.562 171.75 219.188 171.75 226.062C171.75 232.938 177.375 238.562 184.25 238.562C242.063 238.562 292.688 207.625 320.188 161.062C324.25 173.875 332.063 184.5 342.688 192.625C342.688 192.625 342.688 301.062 342.688 317.937C342.688 329.187 346.75 339.812 351.75 348.25H263C225.5 348.25 191.75 328.562 171.438 299.5H0.812622V104.188H172.063ZM502.063 177H419.563C425.813 168.562 428.625 157.312 428.625 146.687V116.375H502.063C518.938 116.375 532.375 129.812 532.375 146.687C532.688 163.562 518.938 177 502.063 177Z" fill="#18191D" />
                            </svg>

                            <a className={styles.ui_btn} href="#project_section">
                                <span className={styles.navlinktext}>Projects</span>
                            </a>
                            <a className={styles.ui_btn} href="#contact_section">
                                <span className={styles.navlinktext}>Contact</span>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
