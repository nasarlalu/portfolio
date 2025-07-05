import { motion } from "framer-motion";
import Image from 'next/image';
import AnimatedText from "@/src/components/Animations/AnimatedText";
import { useAnimateOnView } from '@/src/hooks/useAnimateOnView'
import { serviceContainerVariants, serviceItemVariants } from '@/src/components/FramerSettings/framerSettings'


export default function Project() {

  const projects = [
    { href: 'https://www.benfy.co/', src: '/assets/images/projects__benfy.png', title: 'Benfy' },
    { href: 'https://kethini.com/', src: '/assets/images/projects__kethini.png', title: 'Kethini' },
    { href: 'https://vbdace.com/', src: '/assets/images/projects__vbdace.png', title: 'VBdace' },
    { href: 'https://fyva.in/', src: '/assets/images/projects__fyva.png', title: 'Fyva' },
    { href: 'https://icse.kingston.ac.in/', src: '/assets/images/projects__kingston.png', title: 'Kingston' },
  ];

  const projectSection = useAnimateOnView({ margin: "-50px" });


  return (
    <section className='project__section'>
      <div className='container'>

        <div className='project__header grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-[1rem] sm:gap-[5rem] mb-[1rem] sm:mb-[4rem] items-center'>
          <h1 className='project__heading mb-0'><AnimatedText text={"Projects"} /></h1>
          <p className='project__desp'><AnimatedText text={"Here’s a snapshot of some real-world projects I’ve worked on—each one helped me grow as a developer, solve practical problems, and deliver results for clients and businesses."} /></p>
        </div>

        <motion.div
          ref={projectSection?.ref}
          initial={"hidden"}
          animate={projectSection?.hasAnimated ? "visible" : "hidden"}
          variants={serviceContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-12 mt-5 sm:mt-0"
        >
          {projects && projects.map((item, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-lg shadow-lg"
              variants={serviceItemVariants}
              style={{ willChange: 'opacity, transform' }}
              whileHover={{ scale: 1.03 }}
            >
              <a href={item?.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item?.src}
                  width={600}
                  height={600}
                  alt={item?.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">{item?.title}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
