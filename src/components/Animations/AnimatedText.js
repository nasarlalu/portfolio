import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AnimatedText = ({ text, stagger = 0.05, duration = 0.3, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    // Prevents rerunning animation after the first trigger
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: stagger },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration } },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            className={className}
            style={{ display: "inline-flex", flexWrap: "wrap", gap: "0px", textWrap: "wrap" }}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default AnimatedText;
