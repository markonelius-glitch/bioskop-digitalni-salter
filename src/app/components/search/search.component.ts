import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  criteria = {
    title: '',
    genre: '',
    director: '',
    actors: [] as string[],
    releaseDate: ''
  };

  searchResults: any[] = [];

  constructor(private movieService: MovieService) {}

  searchMovies() {
    this.searchResults = this.movieService.searchMovies(this.criteria);
  }
}
