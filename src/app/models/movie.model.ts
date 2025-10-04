export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
    duration: number;
    director: string;
    actors: string[];
    releaseDate: string;
    showtimes: { date: string, time: string, price: number }[];
    reviews: [string, string][];
    image_url: string;
    rating: [string, number][];
  }
  