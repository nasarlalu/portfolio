import styles from './style.module.scss'
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.link_cntr}>

                    <a className={styles.ui_btn} href='#about_section'>
                        <span className={styles.navlinktext}>About</span>
                    </a>
                    <a className={styles.ui_btn} href="#project_section">
                        <span className={styles.navlinktext}>Projects</span>
                    </a>
                    <a className={styles.ui_btn} href="contact_section">
                        <span className={styles.navlinktext}>Contact</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
