import styles from "./style.module.scss"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
export default function Footer() {
    return (
        <footer className={styles.footer_section}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={styles.contact_row}>
                            <div className={styles.contact_col}>
                                <h6>Get in Touch</h6>
                                <a href="mailto:syednasar.sb@gmail.com">syednasar.sb@gmail.com</a>
                            </div>

                            <div className={styles.contact_col}>
                                <h6>Connect</h6>
                                <div className={styles.icon_row}>
                                    <a href="https://www.instagram.com/nasar._.lalu/" target="_blank"><FaInstagram color="#222" /></a>
                                    <a href="https://in.linkedin.com/in/syed-nasar" target="_blank"><FaLinkedin color="#222" /></a>
                                    <a href="https://github.com/nasarlalu" target="_blank"><FaGithub color="#222" /></a>
                                </div>
                            </div>

                            <div className={styles.contact_col}>
                                <h6>Location</h6>
                                <a>Chennai - Tamilnadu</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
