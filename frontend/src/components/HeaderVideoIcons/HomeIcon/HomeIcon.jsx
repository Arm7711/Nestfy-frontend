import React, { useEffect, useRef } from 'react';

export default function HomeIcon({ selected = false }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [selected]);

    return (
        <span className='home__video__icon__container'>
            <video
                key={selected ? 'selected' : 'default'}
                ref={videoRef}
                className={`home__video__icon ${selected ? 'header__home__video__icon__selected' : ''}`}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/a32adab1-f9df-47e1-a411-bdff91b579c3.png?im_w=240"
            >
                <source
                    src={selected
                        ? "https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm"
                        : "https://a0.muscache.com/videos/search-bar-icons/webm/house-twirl.webm"}
                    type="video/webm"
                />
            </video>
        </span>
    );
}