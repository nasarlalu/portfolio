import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const useAnimateOnView = ({
    margin = "-100px",
    once = true, // Controls if animation should happen only once
} = {}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView) {
            if (once && !hasAnimated) {
                setHasAnimated(true);
            } else if (!once) {
                setHasAnimated(true);
            }
        }
    }, [isInView, hasAnimated, once]);

    return { ref, hasAnimated };
};
