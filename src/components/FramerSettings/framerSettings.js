// Download Btn
export const downloadBtnVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 2
        },
    },
};

// service section
export const serviceContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 }, // Slight shrink for a smoother appearance
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3, // Delay before children start animating
            staggerChildren: 0.2, // Sequential animation
            ease: "easeOut", // Smooth easing for stagger effect
        }
    }
};

export const serviceItemVariants = {
    hidden: { y: 0, opacity: 0 }, // More noticeable entrance effect
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" } // Slightly longer for a natural effect
    }
};



// skills Section
export const skillContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.4 },
    },
};

export const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 10 },
    },
};


// skillCenteredGridAnime
export const skillCenteredGridAnime = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 10 },
    },
}



