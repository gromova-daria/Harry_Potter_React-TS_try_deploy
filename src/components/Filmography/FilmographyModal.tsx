import React from "react";
import { mediaAPI } from '../../api/mediaApi';
import type { Media, Book, Movie } from '../../types/HPFilmography';


interface FilmographyModalProps {
    media: Media | null;
    onClose: () => void;
}

const FilmographyModal: React.FC<FilmographyModalProps> = ({ media, onClose }) => {
    React.useEffect(() => {
        if (!media) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [media, onClose]);

    if (!media) return null;

    const isBook = media.type === 'book';
    const book = isBook ? media as Book : null;
    const movie = !isBook ? media as Movie : null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = isBook
            ? mediaAPI.getDefaultBookCover()
            : mediaAPI.getDefaultMoviePoster();
    };

    return (
        <>
            <div
                className="modal-overlay"
                onClick={handleOverlayClick}
            />

            <section className={`modal_window ${isBook ? 'book-modal' : 'movie-modal'}`}>
                <div className="window_gen-nav">
                    <img
                        src="/images/akar-icons_cross.svg"
                        alt="Close"
                        className="cross"
                        onClick={onClose}
                    />
                </div>

                <div className="window_gen-inf">
                    <div className="gen-inf__text">
                        <span className="grid_name gen-inf__title">
                            {media.title}
                        </span>

                        <span className="gen-inf__text-point">
                            {isBook ? 'Book' : 'Movie'} #{media.serial}
                        </span>

                        <span className="gen-inf__text-point">
                            Release Date: {media.release_date || 'Unknown'}
                        </span>

                        {isBook ? (
                            <span className="gen-inf__text-point">
                                Pages: {book?.pages || 'Unknown'}
                            </span>
                        ) : (
                            <>
                                <span className="gen-inf__text-point">
                                    Runtime: {movie?.running_time || 'Unknown'}
                                </span>
                                <span className="gen-inf__text-point">
                                    Rating: {movie?.rating || 'Unknown'}
                                </span>
                            </>
                        )}
                    </div>

                    <img
                        src={media.cover}
                        alt={media.title}
                        className="gen-inf__img"
                        onError={handleImageError}
                    />
                </div>

                <div className="sub-inf__text">
                    {isBook ? (
                        <>
                            <span className="gen-inf__text-point">Description:</span>
                            <div className="sub-inf__points">
                                <div>{book?.summary || 'No description available'}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="gen-inf__text-point">Directors:</span>
                            <div className="sub-inf__points">
                                {movie?.directors && movie.directors.length > 0 ? (
                                    movie.directors.map((director, index) => (
                                        <div key={index}>{director}</div>
                                    ))
                                ) : (
                                    <div>No director information available</div>
                                )}
                            </div>

                            <span className="gen-inf__text-point">Box Office:</span>
                            <div className="sub-inf__points">
                                <div>Budget: {movie?.budget || 'Unknown'}</div>
                                <div>Revenue: {movie?.box_office || 'Unknown'}</div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default FilmographyModal;