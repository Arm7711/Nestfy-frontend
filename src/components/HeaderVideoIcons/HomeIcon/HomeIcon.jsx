import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const transition = {
    duration: 1.1,
    delay:0.2,
    ease: [0, 0.71, 0.2, 1.01],
};

export default function HomeIcon({ selected = false }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [selected]);

    return (
        <motion.span
            className="home__video__icon__container"
            initial={{scale: 0 }}
            animate={{scale: 1 }}
            transition={transition}
        >
            <video
                key={selected ? "selected" : "default"}
                ref={videoRef}
                className={`home__video__icon ${selected ? "header__home__video__icon__selected" : ""
                    }`}
                autoPlay
                muted
                playsInline
                preload="auto"
            >
                <source
                    src={
                        selected
                            ? "https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm"
                            : "https://a0.muscache.com/videos/search-bar-icons/webm/house-twirl.webm"
                    }
                    type="video/webm"
                />
            </video>
        </motion.span>
    );
}