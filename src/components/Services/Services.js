import styles from './style.module.scss'
import { PiMonitorThin } from "react-icons/pi";
export default function Services() {
    return (
        <section className={styles.services_section}>
            <div className='container'>
                <div className='row justify-content-between align-items-start'>
                    <div className='col-md-5'>
                        <h1>Services</h1>
                    </div>
                    <div className='col-md-6'>
                        <p>I offer a suite of services designed to bring your ideas to life.
                            Let’s transform your vision into a digital masterpiece together.
                            Explore my services and let’s start building your dream website today!
                        </p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-4'>
                        <div className={styles.service_cntr}>
                            <PiMonitorThin />
                            <h2>UI Design with Figma</h2>
                            <p>With a keen eye for design and a deep understanding of user behavior, I ensure that every element on your website is strategically placed and visually pleasing. Let’s create a digital experience your users will love.</p>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className={styles.service_cntr}>
                            <PiMonitorThin />
                            <h2>Web Devlopment</h2>
                            <p>Need a website or a web app? I’ve got you covered! Let’s mix up some code and cook up your extraordinary digital presence together!”</p>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className={styles.service_cntr}>
                            <PiMonitorThin />
                            <h2>Ecommerce</h2>
                            <p>I build online stores that are open 24/7, need no shopkeepers (unless you count me), and can be visited from the comfort of your couch. Let’s stock those virtual shelves and start selling!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
