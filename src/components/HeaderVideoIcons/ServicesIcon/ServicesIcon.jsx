import React from 'react';

export default function ServicesIcon({ selected = false }) {
    return (
        <span className='services__video__icon__container'>
            {selected ?
                <video
                    className="header__services__video__icon__selected services__video__icon"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
                    preload="auto"
                >
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/webm/consierge-selected.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/hevc/consierge-selected.mov#t=0.001"
                    />
                </video>
                :

                <video
                    className="header__services__video__icon services__video__icon"
                    autoPlay
                    muted
                    playsInline
                    poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
                    preload="auto"
                    data-testid="tab-bar-entry-video"
                >
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/webm/consierge-twirl.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/hevc/consierge-twirl.mov#t=0.001"
                    />
                </video>
            }
        </span>
    )
}
