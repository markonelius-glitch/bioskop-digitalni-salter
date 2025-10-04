export interface Reservation {
    movieId: number;
    showtime: { date: string, time: string, price: number };
    status: 'reserved' | 'watched' | 'cancelled';
  }
  