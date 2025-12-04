import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { BooksMoviesAPI } from '../api/filmographyApi';
import type { Media } from '../types/HPFilmography';
import FilmographyCarousel from '../components/Filmography/FilmographyCarousel';
import MediaModal from '../components/Filmography/FilmographyModal';

const FilmographyPage: React.FC = () => {
    const [books, setBooks] = useState<Media[]>([]);
    const [movies, setMovies] = useState<Media[]>([]);
    const [loading, setLoading] = useState({ books: true, movies: true });
    const [error, setError] = useState({ books: '', movies: '' });
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);


    useEffect(() => {
        loadMedia();
    }, []);

    const loadMedia = async () => {
        try {
            const [booksData, moviesData] = await Promise.all([
                BooksMoviesAPI.getBooks(),
                BooksMoviesAPI.getMovies()
            ]);

            setBooks(booksData);
            setMovies(moviesData);
        } catch (err) {
            console.error('Error loading media:', err);
            setError({
                books: 'Failed to load books. Please try again later.',
                movies: 'Failed to load movies. Please try again later.'
            });
        } finally {
            setLoading({ books: false, movies: false });
        }
    };

    const handleMediaClick = (media: Media) => {
        setSelectedMedia(media);
    };

    const handleCloseModal = () => {
        setSelectedMedia(null);
    };

    return (
        <div className="wrapper">
            <Header />

            <main className="main">
                <div className="filmography-page">
                    <section className="filmography-section">
                        <div className="container">
                            <h1 className="filmography__title">Harry Potter Books</h1>

                            {loading.books && <div className="loading-message">Loading books...</div>}
                            {error.books && <div className="error-message">{error.books}</div>}

                            {!loading.books && !error.books && books.length > 0 && (
                                <FilmographyCarousel
                                    items={books}
                                    onItemClick={handleMediaClick}
                                    type="books"
                                />
                            )}
                        </div>
                    </section>

                    <section className="filmography-section">
                        <div className="container">
                            <h1 className="filmography__title">Harry Potter Movies</h1>

                            {loading.movies && <div className="loading-message">Loading movies...</div>}
                            {error.movies && <div className="error-message">{error.movies}</div>}

                            {!loading.movies && !error.movies && movies.length > 0 && (
                                <FilmographyCarousel
                                    items={movies}
                                    onItemClick={handleMediaClick}
                                    type="movies"
                                />
                            )}
                        </div>
                    </section>

                    <MediaModal
                        media={selectedMedia}
                        onClose={handleCloseModal}
                    />
                </div>
            </main>
        </div>
    );
};

export default FilmographyPage;