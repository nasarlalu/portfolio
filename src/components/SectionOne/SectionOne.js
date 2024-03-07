import styles from './style.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import banner from '@/public/assets/images/home_banner.jpg'
import { AiOutlineDownload } from "react-icons/ai";
export default function SectionOne() {
    return (
        <section className={styles.section_one}>
            <div className="container">
                <div className="row align-items-center">
                    <div className='col-md-7 col-12'>
                        <div className={styles.image_cntr}>
                            <Image src={banner} alt='banner' quality={100} />
                        </div>
                    </div>

                    <div className='col-md-5 col-12'>
                        <div className={styles.text_cntr}>
                            <h1>Syed</h1>
                            <h1>Nasar</h1>

                            <h6>Front End Developer</h6>
                            {/* <p>Weaving innovation and aesthetics into every line of code – crafting immersive and visually captivating web experiences for the digital landscape."</p> */}
                            <p>The wizard behind the pixels, concocting code magic for sleek and funky web vibes – where innovation dances with minimalistic coolness, creating digital experiences that pop!</p>

                            <Link href='/assets/syed_nasar_resume.pdf' className={styles.download_btn}>
                                <button>
                                    <span>Download CV</span>
                                    <span><AiOutlineDownload /></span>
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
