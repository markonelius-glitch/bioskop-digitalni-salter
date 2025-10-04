import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [];

  constructor() {
    this.loadMoviesFromLocalStorage();
  }

  saveMoviesToLocalStorage(): void {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  loadMoviesFromLocalStorage(): void {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      this.movies = JSON.parse(storedMovies);
    } else {
      this.movies = this.getFakeMovies();
    }
  }

  searchMovies(criteria: { title?: string, genre?: string, director?: string, actors?: string[], releaseDate?: string }) {
    return this.movies.filter(movie => {
      // Proverava svaki kriterijum pretrage pojedinačno
      if (criteria.title && !movie.title?.toLowerCase().includes(criteria.title.toLowerCase())) {
        return false;
      }
      if (criteria.genre && !movie.genre?.toLowerCase().includes(criteria.genre.toLowerCase())) {
        return false;
      }
      if (criteria.director && !movie.director?.toLowerCase().includes(criteria.director.toLowerCase())) {
        return false;
      }
      if (criteria.actors && !criteria.actors.every(actor => movie.actors?.some(a => a.toLowerCase().includes(actor.toLowerCase())))) {
        return false;
      }
      if (criteria.releaseDate && !movie.releaseDate?.includes(criteria.releaseDate)) {
        return false;
      }
  
      return true;
    });
  }

  getAllMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }

  updateMovieReview(movieId: number, reviewerId: string, rating: number, review: string): Observable<Movie | null> {
    const movie = this.movies.find(m => m.id === movieId);
    
    if (movie) {
      const reviewIndex = movie.reviews.findIndex(r => r[0] === reviewerId);
      const ratingIndex = movie.rating.findIndex(r => r[0] === reviewerId);
      
      if (reviewIndex !== -1) {
        movie.reviews[reviewIndex][1] = review;
      } else {
        movie.reviews.push([reviewerId, review]);
      }

      if (ratingIndex !== -1) {
        movie.rating[ratingIndex][1] = rating;
      } else {
        movie.rating.push([reviewerId, rating]);
      }
      
      return of(movie);
    }
    
    return of(null);
  }

  getFakeMovies(): Movie[] {
    return [
      {
        id: 1,
        title: 'Inception',
        description: 'A mind-bending thriller about dream manipulation.',
        genre: 'Sci-Fi',
        duration: 148,
        director: 'Christopher Nolan',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 500 }, { date: '2025-02-06', time: '17:00', price: 400 }], 
        reviews: [['p', 'Odlično! Za malo...'], ['mika', 'Veoma zabavno'], ['zika', 'Film je dobar, ali ništa što nisam već videla.']],  
        rating: [['p', 3], ['mika', 3], ['zika', 3]],
        image_url: 'inception.jpg'
      },
      {
        id: 2,
        title: 'The Dark Knight',
        description: 'Batman faces off against the Joker, a criminal mastermind.',
        genre: 'Action',
        duration: 152,
        director: 'Christopher Nolan',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 200 }], 
        reviews: [['pera', 'Odlično!'], ['mika', 'Film ima prelep vizuelni prikaz, ali priča nije bila ništa posebno.'], ['zika', 'Film ima prelep vizuelni prikaz, ali priča nije bila ništa posebno.']],  
        rating: [['pera', 1], ['mika', 1], ['zika', 5]],
        image_url: 'dark-knight.jpg'
      },
      {
        id: 3,
        title: 'Interstellar',
        description: 'A group of astronauts travel through a wormhole to save humanity.',
        genre: 'Sci-Fi',
        duration: 169,
        director: 'Christopher Nolan',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 300 }], 
        reviews: [['pera',  'Film mi se nije dopao. Previše sporih scena.'], ['mika', 'Veoma zabavno']],  
        rating: [['pera', 1], ['mika', 4], ['zika', 1]],
        image_url: 'interstellar.jpg'
      },
      {
        id: 4,
        title: 'The Matrix',
        description: 'A computer hacker learns about the true nature of his reality.',
        genre: 'Action',
        duration: 136,
        director: 'The Wachowskis',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 150 }, { date: '2025-02-06', time: '20:00', price: 250 }, { date: '2025-02-07', time: '15:00', price: 100 }, { date: '2025-02-09', time: '13:00', price: 150 }], 
        reviews: [['pera', 'Izuzetno uzbudljiv film sa mnogo neočekivanih obrta.'], ['mika', 'Veoma zabavno']],  
        rating: [['pera', 5], ['mika', 5], ['zika', 5]],
        image_url: 'matrix.jpg'
      },
      {
        id: 5,
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over years, finding solace and eventual redemption.',
        genre: 'Drama',
        duration: 142,
        director: 'Frank Darabont',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 230 }], 
        reviews: [['pera', 'Sjajan film! Gluma je bila odlična, a priča me je u potpunosti osvojila.'], ['mika', 'Veoma zabavno'], ['zika', 'Nisam baš oduševljen. Film je bio previše predvidljiv.']],  
        rating: [['pera', 4], ['mika', 2], ['zika', 1]],
        image_url: 'shawshank.jpg'
      },
      {
        id: 6,
        title: 'Forrest Gump',
        description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal.',
        genre: 'Drama',
        duration: 142,
        director: 'Robert Zemeckis',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 100 }], 
        reviews: [['pera', 'Odlično!'], ['mika', 'Veoma zabavno'], ['zika', 'Veoma zabavno, ali je kraj mogao biti bolji.']],  
        rating: [['pera', 4], ['mika', 5], ['zika', 1]],
        image_url: 'forrest-gump.jpg'
      },
      {
        id: 7,
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits.',
        genre: 'Crime',
        duration: 154,
        director: 'Quentin Tarantino',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 510 }], 
        reviews: [['pera', 'Odlično!'], ['mika', 'Zabavio sam se tokom celog filma. Sve pohvale za produkciju.'], ['stevo', 'Film je bio fantastičan! Preporučujem svakome da ga pogleda.']],   
        rating: [['pera', 4], ['stevo', 4], ['miki', 1]],
        image_url: 'pulp-fiction.jpg'
      },
      {
        id: 8,
        title: 'The Godfather',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        genre: 'Crime',
        duration: 175,
        director: 'Francis Ford Coppola',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 190 }], 
        reviews: [['maus', 'Odlično!'], ['ilija', 'pa tu i tamo... '],  ['stevan', 'I nije nešto']],  
        rating: [['maus', 4], ['ilija', 3], ['stevan', 1]],
        image_url: 'godfather.jpg'
      },
      {
        id: 9,
        title: 'Schindler\'s List',
        description: 'In Nazi-occupied Poland, businessman Oskar Schindler gradually becomes concerned for his Jewish workforce.',
        genre: 'Biography',
        duration: 195,
        director: 'Steven Spielberg',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 700 }], 
        reviews: [['giga', 'Odlično!'], ['brka', 'Veoma zabavno'], ['ludvig', 'ludo burazeru, ludoooo']],  
        rating: [['giga', 4], ['brka', 4], ['ludvig', 1]],
        image_url: 'schindlers-list.jpg'
      },
      {
        id: 10,
        title: 'The Lion King',
        description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
        genre: 'Animation',
        duration: 88,
        director: 'Roger Allers, Rob Minkoff',
        actors: ['Glumac 1', 'Glumac 2'],
        releaseDate: '2024-01-01',
        showtimes: [{ date: '2025-02-05', time: '18:00', price: 340 }], 
        reviews: [['kasandra', 'Odlično!'], ['sofronije', 'Veoma zabavno'], ['sofronije', 'Aaauuuu kakav film, covece!']],  
        rating: [['kasandra', 4], ['pajo', 4], ['sofronije', 4]],
        image_url: 'lion-king.jpg'
      }
    ];
  }
}
