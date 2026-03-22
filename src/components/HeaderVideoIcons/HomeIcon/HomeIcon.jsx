import React from 'react';

export default function HomeIcon({ selected = false }) {
    return (
        <span className='home__video__icon__container'>
            {selected ?
                <video
                    className='header__home__video__icon__selected home__video__icon'
                    autoPlay
                    muted
                    playsInline
                    poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/a32adab1-f9df-47e1-a411-bdff91b579c3.png?im_w=240"
                    preload="auto"
                >
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/hevc/house-selected.mov#t=0.001"
                    />
                </video>
                :
                <video
                    className="header__home__video__icon home__video__icon"
                    autoPlay
                    muted
                    playsInline
                    poster="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/a32adab1-f9df-47e1-a411-bdff91b579c3.png?im_w=240"
                >
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/webm/house-twirl.webm"
                        type="video/webm"
                    />
                    <source
                        src="https://a0.muscache.com/videos/search-bar-icons/hevc/house-twirl.mov"
                        type="video/mp4"
                    />
                </video>
            }
        </span>
    )
}
