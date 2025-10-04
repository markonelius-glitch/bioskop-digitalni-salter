import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  criteria = {
    title: '',
    genre: '',
    director: '',
    actors: [] as string[],
    releaseDate: ''
  };  

  movies: any[] = [];
  filteredMovies: Movie[] = [];
  selectedMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
    });
   
    this.filteredMovies = this.movies;
  }

  reserveMovie(movie: any): void {
    this.selectedMovies.push(movie);
    alert(`${movie.title} je uspešno rezervisan!`);
  }

  searchMovies() {
    this.filteredMovies = this.movieService.searchMovies(this.criteria);
  }
}

