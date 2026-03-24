import React, { useEffect, useRef } from 'react';

export default function ServicesIcon({ selected = false }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [selected]);

    return (
        <span className='services__video__icon__container'>
            <video
                key={selected ? 'selected' : 'default'}
                ref={videoRef}
                className={`services__video__icon ${selected ? 'header__services__video__icon__selected' : ''}`}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
                data-testid="tab-bar-entry-video"
            >
                <source
                    src={selected
                        ? "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm"
                        : "https://a0.muscache.com/videos/search-bar-icons/webm/consierge-twirl.webm"}
                    type="video/webm"
                />
            </video>
        </span>
    );
}