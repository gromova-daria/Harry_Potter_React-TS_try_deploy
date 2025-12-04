class MediaAPI {
    private cache = new Map<string, any>();

    async getBookCovers() {
        if (this.cache.has('bookCovers')) {
            return this.cache.get('bookCovers');
        }

        try {
            console.log('Пытаемся загрузить обложки книг');
            const response = await fetch('https://potterapi-fedeperin.vercel.app/en/books');
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const covers = await response.json();
            console.log(`Получили ${covers.length} обложек книг`);

            this.cache.set('bookCovers', covers);
            return covers;
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    }

    async getMoviePosters() {
        if (this.cache.has('moviePosters')) {
            return this.cache.get('moviePosters');
        }

        try {
            console.log('Пытаемся загрузить постеры фильмов');
            const response = await fetch('https://www.omdbapi.com/?s=harry%20potter&apikey=6c3a2d45');
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            const data = await response.json();

            const posters = data.Search || [];
            console.log(`Получили ${posters.length} постеров фильмов`);

            this.cache.set('moviePosters', posters);
            return posters;
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    }

    async getBookCoverByIndex(index: number): Promise<string | null> {
        const covers = await this.getBookCovers();
        return covers[index]?.cover || null;
    }

    async getMoviePosterByIndex(index: number): Promise<string | null> {
        const posters = await this.getMoviePosters();
        return posters[index]?.Poster || null;
    }

    getDefaultBookCover(): string {
        return '/images/books/default.jpg';
    }

    getDefaultMoviePoster(): string {
        return '/images/movies/default.jpg';
    }
}

export const mediaAPI = new MediaAPI();