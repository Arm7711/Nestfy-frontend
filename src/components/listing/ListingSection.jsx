import React, { useRef, useState, useCallback } from 'react'
import ForwardBackSvg from '../svg/ForwardBackSvg'
import CurretSvg from '../svg/ArrowSvg'
import ListingSlider from './ListingSlider'

export default function ListingSection({ title, items = [], onViewAll, onCardClick }) {
    const sliderRef = useRef(null)
    const [canLeft, setCanLeft] = useState(false)
    const [canRight, setCanRight] = useState(false)

    const handleNavigationChange = useCallback(({ canLeft, canRight }) => {
        setCanLeft(canLeft)
        setCanRight(canRight)
    }, [])

    const handlePrev = () => sliderRef.current?.scrollLeft()
    const handleNext = () => sliderRef.current?.scrollRight()

    return (
        <section className="listing_section" aria-label={title}>
            <div className='header__section'>
                <div className='title__block'>
                    <h1 className='title'>{title}</h1>
                    <button className='go__button' onClick={onViewAll}>
                        <ForwardBackSvg />
                    </button>
                </div>

                <div className='header__seaction__slider__buttons'>
                    <button
                        className='toggle__slider prev'
                        disabled={!canLeft}
                        onClick={handlePrev}
                        aria-label="Scroll left"
                    >
                        <CurretSvg />
                    </button>

                    <button
                        className='toggle__slider next'
                        disabled={!canRight}
                        onClick={handleNext}
                        aria-label="Scroll right"
                    >
                        <CurretSvg />
                    </button>
                </div>
            </div>

            <div className="listing_section_body">
                <ListingSlider
                    ref={sliderRef}
                    items={items}
                    onCardClick={onCardClick}
                    onNavigationChange={handleNavigationChange}
                />
            </div>
        </section>
    )
}