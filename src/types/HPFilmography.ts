export type MediaType = 'book' | 'movie';

export interface BaseMedia {
  id: string;
  title: string;
  serial: number;
  release_date?: string;
  cover: string;
  type: MediaType;
}

export interface Book extends BaseMedia {
  type: 'book';
  pages?: number;
  summary?: string;
  isbn?: string;
}

export interface Movie extends BaseMedia {
  type: 'movie';
  running_time?: string;
  rating?: string;
  directors?: string[];
  budget?: string;
  box_office?: string;
  poster?: string;
}

export type Media = Book | Movie;