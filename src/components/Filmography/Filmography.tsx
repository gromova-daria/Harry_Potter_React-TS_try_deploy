import React, { useEffect, useState } from 'react';
import { BooksMoviesAPI } from '../../api/filmographyApi';
import type { Media, Book, Movie } from '../../types/HPFilmography';
import FilmographyCarousel from './FilmographyCarousel';
import MediaModal from './FilmographyModal';

const Filmography: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
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
        <main className="main">
            <section className="filmography-section">
                <div className="container">
                    <h1 className="filmography__title">Harry Potter Books</h1>

                    <FilmographyCarousel
                        items={books}
                        type="books"
                        loading={loading.books}
                        error={error.books}
                        onItemClick={handleMediaClick}
                    />
                </div>
            </section>

            <section className="filmography-section">
                <div className="container">
                    <h1 className="filmography__title">Harry Potter Movies</h1>

                    <FilmographyCarousel
                        items={movies}
                        type="movies"
                        loading={loading.movies}
                        error={error.movies}
                        onItemClick={handleMediaClick}
                    />
                </div>
            </section>

            <MediaModal
                media={selectedMedia}
                onClose={handleCloseModal}
            />
        </main>
    );
};

export default Filmography;