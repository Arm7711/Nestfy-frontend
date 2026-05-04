import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, useLayoutEffect } from 'react'
import ListingCard from './ListingCard';
import ImageSkeleton from '../_common/Skeletions/ImageSkeletion';
import classNames from 'classnames';

const EXTRA_CARDS = 1
const CARD_GAP = 12

const BREAKPOINTS = [
    { maxWidth: 480, cards: 2 },
    { maxWidth: 640, cards: 3 },
    { maxWidth: 900, cards: 4 },
    { maxWidth: 1100, cards: 5 },
    { maxWidth: 1400, cards: 6 },
    { maxWidth: Infinity, cards: 7 },
]

const ListingSlider = forwardRef(function ListingSlider({ items = [], onCardClick, onNavigationChange }, ref) {
    const trackRef = useRef(null)
    const containerRef = useRef(null)
    const cardWidthRef = useRef(200)      
    const showAllRef = useRef(null)

    const [cardsPerView, setCardsPerView] = useState(7)
    const [canLeft, setCanLeft] = useState(false)
    const [canRight, setCanRight] = useState(false)
    const [isShowAllVisible, setIsShowAllVisible] = useState(false)

    const sectionFirstItems = items.slice(0, 3)

    const updateLayout = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const containerWidth = container.clientWidth
        const { cards } = BREAKPOINTS.find(bp => containerWidth <= bp.maxWidth)
        const newCardWidth = Math.floor((containerWidth - CARD_GAP * (cards - 1)) / cards)

        container.style.setProperty('--card-width', `${newCardWidth}px`)
        container.style.setProperty('--card-gap', `${CARD_GAP}px`)
        container.style.setProperty('--cards', cards)

        cardWidthRef.current = newCardWidth

        setCardsPerView(prev => prev !== cards ? cards : prev)
    }, [])


    useLayoutEffect(() => {
        updateLayout()
        const ro = new ResizeObserver(updateLayout)
        if (containerRef.current) ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [updateLayout])


    useEffect(() => {
        const root = trackRef.current
        const target = showAllRef.current
        if (!root || !target) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsShowAllVisible(entry.isIntersecting),
            { root, threshold: 0.1 }
        )
        observer.observe(target)
        return () => observer.disconnect()
    }, [cardsPerView, items.length])


    const updateNavigationState = useCallback(() => {
        const el = trackRef.current
        if (!el) return

        const cardWidthWithGap = cardWidthRef.current + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const maxFirstCardIndex = Math.max(0, items.length + EXTRA_CARDS - cardsPerView)

        const newCanLeft = currentFirstCardIndex > 0
        const newCanRight = currentFirstCardIndex < maxFirstCardIndex

        setCanLeft(newCanLeft)
        setCanRight(newCanRight)
        onNavigationChange?.({ canLeft: newCanLeft, canRight: newCanRight })
    }, [cardsPerView, items.length, onNavigationChange])

    useEffect(() => {
        const el = trackRef.current
        if (!el) return

        el.addEventListener('scroll', updateNavigationState, { passive: true })
        const ro = new ResizeObserver(updateNavigationState)
        ro.observe(el)
        const t = setTimeout(updateNavigationState, 50)

        return () => {
            el.removeEventListener('scroll', updateNavigationState)
            ro.disconnect()
            clearTimeout(t)
        }
    }, [updateNavigationState, items])

    const scrollToCard = useCallback((cardIndex) => {
        trackRef.current?.scrollTo({
            left: cardIndex * (cardWidthRef.current + CARD_GAP),
            behavior: 'smooth'
        })
    }, [])

    const scrollNext = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const cardWidthWithGap = cardWidthRef.current + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const maxFirstCardIndex = Math.max(0, items.length + EXTRA_CARDS - cardsPerView)
        const nextIndex = Math.min(currentFirstCardIndex + cardsPerView, maxFirstCardIndex)
        el.scrollTo({ left: nextIndex * cardWidthWithGap, behavior: 'smooth' })
    }, [cardsPerView, items.length])

    const scrollPrev = useCallback(() => {
        const el = trackRef.current
        if (!el) return
        const cardWidthWithGap = cardWidthRef.current + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const prevIndex = Math.max(currentFirstCardIndex - cardsPerView, 0)
        el.scrollTo({ left: prevIndex * cardWidthWithGap, behavior: 'smooth' })
    }, [cardsPerView])

    useImperativeHandle(ref, () => ({
        scrollLeft: scrollPrev,
        scrollRight: scrollNext,
        scrollToCard,
        canScrollLeft: canLeft,
        canScrollRight: canRight,
        cardsPerView,
        cardWidth: cardWidthRef.current,
        updateNavigation: updateNavigationState,
    }), [scrollPrev, scrollNext, scrollToCard, canLeft, canRight, cardsPerView, updateNavigationState])

    return (
        <div className="listing_slider" ref={containerRef}>
            <div
                className="listing_slider_track"
                ref={trackRef}
                role="list"
            >
                {items.map((item, i) => (
                    <div
                        key={item.id ?? i}
                        className="listing_slider_item"
                        role="listitem"
                    >
                        <ListingCard isSlider={false} item={item} onClick={() => onCardClick?.(item)} />
                    </div>
                ))}

                <div ref={showAllRef} className="listing_slider_item" role="listitem">
                    <article className='listing_card listing_card__show__all'>
                        <div className='lisiting__card__gallery__carousel'>
                            {sectionFirstItems.map(({ images }, index) => (
                                <ImageSkeleton
                                    key={index}
                                    src={images[0]}
                                    figureClass={classNames(`figure__card figure__card--${index + 1}`, { show__animation: isShowAllVisible })}
                                    imgClass={'card__img'}
                                    width={90}
                                    height={90}
                                />
                            ))}
                        </div>
                        <button className='see__all'>See all</button>
                    </article>
                </div>
            </div>
        </div>
    )
})

export default ListingSlider;