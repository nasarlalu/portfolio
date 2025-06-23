"use client";
import styles from './style-old.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import Image from 'next/image';


export default function Projects() {
    return (
        <section className={styles.projects__section}>
            <div className='container-fluid'>
                <h1 className={styles.projects__title}>Projects</h1>
                <p className={styles.projects__desp}>A showcase of my best work—crafted with clean code, sleek design, and seamless user experience. swipe through and explore!  </p>
                <Swiper
                    modules={[EffectCoverflow, Pagination, Keyboard]}
                    effect={'coverflow'}
                    speed={800}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    initialSlide={2}
                    pagination={{ clickable: true }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        660: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    keyboard={{ enabled: true }}
                    className="swiper__projects"
                >
                    <SwiperSlide>
                        <div className={styles.projects__swiperItem}>
                            <a href='https://www.benfy.co/' target='_blank' className={styles.projects__swiperLink}>
                                <Image src={'/assets/images/projects__benfy.png'} width={1920} height={1080} alt='Benfy' className={styles.projects__swiperImg} />
                            </a>
                            <h6 className={styles.projects__swiperTitle}>Benfy</h6>
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className={styles.projects__swiperItem}>
                            <a href='https://kethini.com/' target='_blank' className={styles.projects__swiperLink}>
                                <Image src={'/assets/images/projects__kethini.png'} width={1920} height={1080} alt='Benfy' className={styles.projects__swiperImg} />
                            </a>
                            <h6 className={styles.projects__swiperTitle}>Kethini</h6>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={styles.projects__swiperItem}>
                            <a href='https://vbdace.com/' target='_blank' className={styles.projects__swiperLink}>
                                <Image src={'/assets/images/projects__vbdace.png'} width={1920} height={1080} alt='Benfy' className={styles.projects__swiperImg} />
                            </a>
                            <h6 className={styles.projects__swiperTitle}>VBdace</h6>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={styles.projects__swiperItem}>
                            <a href='https://fyva.in/' target='_blank' className={styles.projects__swiperLink}>
                                <Image src={'/assets/images/projects__fyva.png'} width={1920} height={1080} alt='Benfy' className={styles.projects__swiperImg} />
                            </a>
                            <h6 className={styles.projects__swiperTitle}>Fyva</h6>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={styles.projects__swiperItem}>
                            <a href='https://icse.kingston.ac.in/' target='_blank' className={styles.projects__swiperLink}>
                                <Image src={'/assets/images/projects__kingston.png'} width={1920} height={1080} alt='Benfy' className={styles.projects__swiperImg} />
                            </a>
                            <h6 className={styles.projects__swiperTitle}>Kingston</h6>
                        </div>
                    </SwiperSlide>

                    <div className="swiper-pagination"></div>

                </Swiper>
            </div>
        </section>
    );
}
