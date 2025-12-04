import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Media } from '../../types/HPFilmography';
import MediaCard from './FilmographyCard';
import sliderLeft from '../../assets/images/slider_left.svg';
import sliderLeftHover from '../../assets/images/slider_left_after_motion.svg';
import sliderRight from '../../assets/images/slider_right.svg';
import sliderRightHover from '../../assets/images/slider_right_after_motion.svg';

interface FilmographyCarouselProps {
    items: Media[];
    onItemClick: (media: Media) => void;
    type: 'books' | 'movies';
    loading?: boolean;
    error?: string;
}

const FilmographyCarousel: React.FC<FilmographyCarouselProps> = ({
    items,
    onItemClick,
    type,
    loading,
    error
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(220);
    const [itemsToShow, setItemsToShow] = useState(4);

    const updateItemWidth = useCallback(() => {
        if (trackRef.current && trackRef.current.children.length > 0) {
            const firstItem = trackRef.current.children[0] as HTMLElement;
            const computedStyle = window.getComputedStyle(firstItem);
            const width = firstItem.offsetWidth;
            const marginRight = parseInt(computedStyle.marginRight) || 20;
            setItemWidth(width + marginRight);
        }
    }, []);

    const getItemsToShow = useCallback(() => {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const newItemsToShow = getItemsToShow();
            setItemsToShow(newItemsToShow);
            updateItemWidth();

            const maxIndex = Math.max(0, items.length - newItemsToShow);
            if (currentIndex > maxIndex) {
                setCurrentIndex(maxIndex);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getItemsToShow, updateItemWidth, items.length, currentIndex]);

    useEffect(() => {
        if (items.length > 0) {
            const images = trackRef.current?.querySelectorAll('img');
            if (images && images.length > 0) {
                let loadedCount = 0;
                const totalImages = images.length;

                const checkAllLoaded = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        setTimeout(() => {
                            updateItemWidth();
                            updateCarousel();
                        }, 100);
                    }
                };

                images.forEach(img => {
                    if (img.complete) {
                        checkAllLoaded();
                    } else {
                        img.addEventListener('load', checkAllLoaded);
                        img.addEventListener('error', checkAllLoaded);
                    }
                });
            } else {
                setTimeout(updateItemWidth, 100);
            }
        }
    }, [items, updateItemWidth]);

    const maxIndex = Math.max(0, items.length - itemsToShow);

    const updateCarousel = useCallback(() => {
        if (!trackRef.current || items.length === 0) return;

        const translateX = -currentIndex * itemWidth;
        trackRef.current.style.transform = `translateX(${translateX}px)`;
        trackRef.current.style.transition = 'transform 0.3s ease';
    }, [currentIndex, itemWidth, items.length]);

    useEffect(() => {
        updateCarousel();
    }, [currentIndex, updateCarousel]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (loading) {
        return <div className={`loading-${type}`}>Loading {type}...</div>;
    }

    if (error) {
        return <div className="loading-error">{error}</div>;
    }

    if (items.length === 0) {
        return <div className="no-data-message">No {type} available</div>;
    }

    return (
        <div className="carousel-wrapper">
            <div className="carousel-controls-top">
                <button
                    className={`carousel-btn carousel-btn-prev ${type}-prev`}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    style={{
                        opacity: currentIndex === 0 ? 0.3 : 1,
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    <img src={sliderLeft} alt="Previous" className="carousel-arrow" />
                    <img src={sliderLeftHover} alt="Previous" className="carousel-arrow-hover" />
                </button>

                <button
                    className={`carousel-btn carousel-btn-next ${type}-next`}
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                    style={{
                        opacity: currentIndex >= maxIndex ? 0.3 : 1,
                        cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer'
                    }}
                >
                    <img src={sliderRight} alt="Next" className="carousel-arrow" />
                    <img src={sliderRightHover} alt="Next" className="carousel-arrow-hover" />
                </button>
            </div>

            <div className="carousel" ref={containerRef}>
                <div className="carousel-container">
                    <div className="carousel-track" ref={trackRef}>
                        {items.map((item) => (
                            <div className="filmography-item" key={`${item.type}-${item.id}`}>
                                <MediaCard media={item} onClick={onItemClick} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmographyCarousel;