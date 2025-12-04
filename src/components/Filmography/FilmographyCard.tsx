import React, { useState } from 'react';
import type { Media, Book, Movie } from '../../types/HPFilmography';
import { mediaAPI } from '../../api/mediaApi';

interface FilmographyCardProps {
    media: Media;
    onClick: (media: Media) => void;
}

const FilmographyCard: React.FC<FilmographyCardProps> = ({ media, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const isBook = media.type === 'book';

    const getImageUrl = () => {
        if (isBook) {
            return (media as Book).cover;
        } else {
            const movie = media as Movie & { poster?: string };
            return movie.cover || (movie as any).poster || '';
        }
    };

    const imageUrl = getImageUrl();

    const getDefaultImage = () => {
        return isBook
            ? mediaAPI.getDefaultBookCover()
            : mediaAPI.getDefaultMoviePoster();
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setImageError(true);
        e.currentTarget.src = getDefaultImage();
    };

    const getDetails = () => {
        if (isBook) {
            const book = media as Book;
            return `Book #${book.serial} • ${book.release_date ? new Date(book.release_date).getFullYear() : 'Unknown'}`;
        } else {
            const movie = media as Movie;
            return `Movie #${movie.serial} • ${movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}`;
        }
    };

    const getTypeClass = () => {
        return isBook ? 'book-card' : 'movie-card';
    };

    return (
        <div
            className={`filmography-item media-card ${getTypeClass()}`}
            onClick={() => onClick(media)}
            data-id={media.id}
            data-type={media.type}
            style={{ cursor: 'pointer' }}
        >
            <div className="filmography-card">
                <div className="filmography-image media-image">
                    <img
                        src={imageError ? getDefaultImage() : imageUrl || getDefaultImage()}
                        alt={media.title}
                        onError={handleImageError}
                        className="media-img"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="filmography-info-block media-info">
                <h3 className="filmography-name media-title">{media.title}</h3>
                <p className="filmography-details media-details">{getDetails()}</p>

                {isBook && (media as Book).pages && (
                    <p className="media-additional">
                        {(media as Book).pages} pages
                    </p>
                )}

                {!isBook && (media as Movie).running_time && (
                    <p className="media-additional">
                        {(media as Movie).running_time}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FilmographyCard;