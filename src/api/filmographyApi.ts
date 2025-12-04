import { mediaAPI } from './mediaApi';
import type { Book, Movie } from '../types/HPFilmography';

export const BooksMoviesAPI = {
    url: 'https://potterhead-api.vercel.app/api',

    async getBooks(): Promise<Book[]> {
        console.log('Пытаемся загрузить книги');
        try {
            const response = await fetch(`${this.url}/books`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const booksData = await response.json();
            console.log(`Получили ${booksData.length} книг`);

            const bookCovers = await mediaAPI.getBookCovers();

            return booksData.map((book: any, index: number) => ({
                ...book,
                cover: bookCovers[index]?.cover || mediaAPI.getDefaultBookCover(),
                id: book.serial || index.toString(),
                type: 'book' as const
            }));
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    },

    async getMovies(): Promise<Movie[]> {
        console.log('Пытаемся загрузить фильмы');
        try {
            const response = await fetch(`${this.url}/movies`);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const moviesData = await response.json();
            console.log(`Получили ${moviesData.length} фильмов`);

            const moviePosters = await mediaAPI.getMoviePosters();

            return moviesData.map((movie: any, index: number) => ({
                ...movie,
                cover: moviePosters[index]?.Poster || mediaAPI.getDefaultMoviePoster(),
                id: movie.serial || index.toString(),
                type: 'movie' as const
            }));
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    },

    async getAllMedia() {
        const [books, movies] = await Promise.all([
            this.getBooks(),
            this.getMovies()
        ]);
        return { books, movies };
    }
};