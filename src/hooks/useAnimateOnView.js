import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const useAnimateOnView = ({ margin = "-100px" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    return { ref, hasAnimated };
};
