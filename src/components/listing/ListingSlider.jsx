import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react'
import ListingCard from './ListingCard';
import ImageSkeleton from '../_common/Skeletions/ImageSkeletion';
import classNames from 'classnames';

const EXTRA_CARDS = 1

const ListingSlider = forwardRef(function ListingSlider({ items = [], onCardClick, onNavigationChange }, ref) {
    const trackRef = useRef(null)
    const containerRef = useRef(null)
    const [cardWidth, setCardWidth] = useState(null)
    const [canLeft, setCanLeft] = useState(false)
    const [canRight, setCanRight] = useState(false)
    const [cardsPerView, setCardsPerView] = useState(7);
    const sectionFirstItems = items ? items?.slice(0, 3) : [];

    const showAllRef = useRef(null)
    const [isShowAllVisible, setIsShowAllVisible] = useState(false)

    useEffect(() => {
        const root = trackRef.current
        const target = showAllRef.current

        if (!root || !target) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsShowAllVisible(entry.isIntersecting)
            },
            {
                root,
                threshold: 0.1
            }
        )

        observer.observe(target)

        return () => observer.disconnect()
    }, [cardWidth, items.length])


    const MIN_CARD_WIDTH = 140
    const MAX_CARD_WIDTH = 280
    const CARD_GAP = 12

    const calculateCardWidth = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const containerWidth = container.clientWidth
        let targetCards = 7
        let newCardWidth = (containerWidth - (CARD_GAP * (targetCards - 1))) / targetCards

        if (newCardWidth < MIN_CARD_WIDTH) {
            targetCards = Math.floor((containerWidth + CARD_GAP) / (MIN_CARD_WIDTH + CARD_GAP))
            if (targetCards < 1) targetCards = 1
            newCardWidth = (containerWidth - (CARD_GAP * (targetCards - 1))) / targetCards
        } else if (newCardWidth > MAX_CARD_WIDTH) {
            targetCards = Math.floor((containerWidth + CARD_GAP) / (MAX_CARD_WIDTH + CARD_GAP))
            if (targetCards < 1) targetCards = 1
            newCardWidth = (containerWidth - (CARD_GAP * (targetCards - 1))) / targetCards
        }

        setCardsPerView(targetCards)
        setCardWidth(Math.floor(newCardWidth))
    }, [])

    useEffect(() => {
        calculateCardWidth()
        const ro = new ResizeObserver(calculateCardWidth)
        if (containerRef.current) ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [calculateCardWidth, items])

    const updateNavigationState = useCallback(() => {
        const el = trackRef.current
        if (!el || !cardWidth) return

        const cardWidthWithGap = cardWidth + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const maxFirstCardIndex = Math.max(0, items.length + EXTRA_CARDS - cardsPerView)

        const newCanLeft = currentFirstCardIndex > 0
        const newCanRight = currentFirstCardIndex < maxFirstCardIndex

        setCanLeft(newCanLeft)
        setCanRight(newCanRight)
        onNavigationChange?.({ canLeft: newCanLeft, canRight: newCanRight })
    }, [cardWidth, cardsPerView, items.length, onNavigationChange])

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
        const el = trackRef.current
        if (!el || !cardWidth) return
        el.scrollTo({ left: cardIndex * (cardWidth + CARD_GAP), behavior: 'smooth' })
    }, [cardWidth])

    const scrollNext = useCallback(() => {
        const el = trackRef.current
        if (!el || !cardWidth) return

        const cardWidthWithGap = cardWidth + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const maxFirstCardIndex = Math.max(0, items.length + EXTRA_CARDS - cardsPerView)
        const nextIndex = Math.min(currentFirstCardIndex + cardsPerView, maxFirstCardIndex)

        el.scrollTo({ left: nextIndex * cardWidthWithGap, behavior: 'smooth' })
    }, [cardWidth, cardsPerView, items.length])

    const scrollPrev = useCallback(() => {
        const el = trackRef.current
        if (!el || !cardWidth) return

        const cardWidthWithGap = cardWidth + CARD_GAP
        const currentFirstCardIndex = Math.round(el.scrollLeft / cardWidthWithGap)
        const prevIndex = Math.max(currentFirstCardIndex - cardsPerView, 0)

        el.scrollTo({ left: prevIndex * cardWidthWithGap, behavior: 'smooth' })
    }, [cardWidth, cardsPerView])

    useImperativeHandle(ref, () => ({
        scrollLeft: scrollPrev,
        scrollRight: scrollNext,
        scrollToCard,
        canScrollLeft: canLeft,
        canScrollRight: canRight,
        cardsPerView,
        cardWidth,
        updateNavigation: updateNavigationState
    }), [scrollPrev, scrollNext, scrollToCard, canLeft, canRight, cardsPerView, cardWidth, updateNavigationState])

    if (!cardWidth) {
        return (
            <div className="listing_slider" ref={containerRef}>
                <div className="listing_slider_track" style={{ gap: `${CARD_GAP}px` }}>
                    {items.slice(0, 7).map((item, i) => (
                        <div key={item.id ?? i} className="listing_slider_item" style={{ width: 200, flex: '0 0 200px' }}>
                            <ListingCard isSlider={false} item={item} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="listing_slider" ref={containerRef}>
            <div
                className="listing_slider_track"
                ref={trackRef}
                role="list"
                style={{ gap: `${CARD_GAP}px` }}
            >
                {items.map((item, i) => (
                    <div
                        key={item.id ?? i}
                        className="listing_slider_item"
                        role="listitem"
                        style={{ flex: `0 0 ${cardWidth}px`, width: `${cardWidth}px` }}
                    >
                        <ListingCard isSlider={false} item={item} onClick={() => onCardClick?.(item)} />
                    </div>
                ))}

                <div
                    ref={showAllRef}
                    className="listing_slider_item"
                    role="listitem"
                    style={{ flex: `0 0 ${cardWidth}px`, width: `${cardWidth}px` }}
                >
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

export default ListingSlider