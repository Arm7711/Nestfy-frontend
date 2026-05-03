import React, { useState, useRef } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { buildDetails } from '../../utils/listing/buildDetails';
import { getBadgeConfig } from '../../utils/listing/getBadgeConfig';
import { getPropertyTypeMeta } from '../../utils/listing/getPropertyTypeMeta';

import ImageSkeletion from '../_common/Skeletions/ImageSkeletion';


export default function ListingCard({ item, isSlider = true, onClick }) {
    const {
        images: rawImages = [],
        badge,
        type,
        location,
        name,
        dates,
        price,
        per,
        rating,
        reviews_count,
    } = item

    const images = Array.isArray(rawImages) ? rawImages : [rawImages]
    const count = images.length
    const isMulti = count > 1 && isSlider

    const [idx, setIdx] = useState(0)
    const [liked, setLiked] = useState(false)
    const [likeAnim, setLikeAnim] = useState(false)
    const [hovered, setHovered] = useState(false)

    const swiperRef = useRef(null)

    const badgeCfg = getBadgeConfig(badge)
    const details = buildDetails(item)
    const { label: typeLabel } = getPropertyTypeMeta(type)
    const locationStr = location ? `${typeLabel}, ${location}` : typeLabel

    const handleLike = (e) => {
        e.stopPropagation()
        setLiked(v => !v)
        setLikeAnim(true)
        setTimeout(() => setLikeAnim(false), 500)
    }

    const goPrev = (e) => {
        e.stopPropagation()
        swiperRef.current?.slidePrev()
    }
    const goNext = (e) => {
        e.stopPropagation()
        swiperRef.current?.slideNext()
    }

    return (
        <article
            className={['listing_card', hovered ? 'listing_card_hovered' : ''].join(' ').trim()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
        >
            <div className="listing_card_gallery">
                {isMulti ? (
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setIdx(swiper.activeIndex)}
                        slidesPerView={1}
                        loop={false}
                        allowTouchMove
                        className="listing_card_track"
                        style={{ height: '100%' }}
                    >
                        {images.map((src, i) => (
                            <SwiperSlide key={i} className="listing_card_slide">
                                <ImageSkeletion
                                    width={'100%'}
                                    height={'100%'}
                                    variant={'default'}
                                    imgClass={'listing_card_img'}
                                    figureClass={'listing_card_figure'}
                                    src={src}
                                    alt={`${locationStr} — photo ${i + 1}`}
                                    draggable={false}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="listing_card_track" style={{ transform: 'none' }}>
                        <div className="listing_card_slide">
                            <ImageSkeletion
                                width={'100%'}
                                height={'100%'}
                                variant={'default'}
                                imgClass={'listing_card_img'}
                                figureClass={'listing_card_figure'}
                                src={images[0]}
                                alt={`${locationStr} — photo 1`}
                                draggable={false}
                            />
                        </div>
                    </div>
                )}

                <div className="listing_card_gradient" aria-hidden="true" />

                {isMulti && (
                    <>
                        <button
                            className={[
                                'listing_card_arrow listing_card_arrow_prev',
                                hovered && idx > 0 ? 'listing_card_arrow_visible' : '',
                            ].join(' ').trim()}
                            onClick={goPrev}
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={15} strokeWidth={2.5} />
                        </button>
                        <button
                            className={[
                                'listing_card_arrow listing_card_arrow_next',
                                hovered && idx < count - 1 ? 'listing_card_arrow_visible' : '',
                            ].join(' ').trim()}
                            onClick={goNext}
                            aria-label="Next photo"
                        >
                            <ChevronRight size={15} strokeWidth={2.5} />
                        </button>
                    </>
                )}

                {isMulti && (
                    <div
                        className={[
                            'listing_card_dots',
                            hovered ? 'listing_card_dots_visible' : '',
                        ].join(' ').trim()}
                        role="tablist"
                        aria-label="Photos"
                    >
                        {images.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === idx}
                                aria-label={`Photo ${i + 1}`}
                                className={[
                                    'listing_card_dot',
                                    i === idx ? 'listing_card_dot_active' : '',
                                ].join(' ').trim()}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    swiperRef.current?.slideTo(i)
                                }}
                            />
                        ))}
                    </div>
                )}

                {badgeCfg && (
                    <div className="listing_card_badge" aria-label={badgeCfg.label}>
                        {badgeCfg.icon}
                        <span>{badgeCfg.label}</span>
                    </div>
                )}

                <button
                    className={[
                        'listing_card_heart',
                        liked ? 'listing_card_heart_liked' : '',
                        likeAnim ? 'listing_card_heart_pop' : '',
                    ].join(' ').trim()}
                    onClick={handleLike}
                    aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={liked}
                >
                    <Heart
                        size={20}
                        strokeWidth={1.5}
                        fill={liked ? '#ff385c' : 'rgba(0,0,0,0.38)'}
                        stroke={liked ? '#ff385c' : '#ffffff'}
                    />
                </button>
            </div>

            <div className="listing_card_info">
                <div className="listing_card_row_main">
                    <span className="listing_card_location">{locationStr}</span>
                    {rating && (
                        <div className="listing_card_rating" aria-label={`Rating ${rating}`}>
                            <Star size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                            <span className="listing_card_rating_value">{rating}</span>
                            {reviews_count && (
                                <span className="listing_card_rating_count">({reviews_count})</span>
                            )}
                        </div>
                    )}
                </div>

                {name && <p className="listing_card_name">{name}</p>}
                {details && <p className="listing_card_details">{details}</p>}
                {dates && <p className="listing_card_dates">{dates}</p>}
                {price && (
                    <p className="listing_card_price">
                        <span className="listing_card_price_value">{price}</span>
                        {per && <span className="listing_card_price_per"> / {per}</span>}
                    </p>
                )}
            </div>
        </article>
    )
}