import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-review-list',
  templateUrl: './movie-review-list.component.html',
  styleUrls: ['./movie-review-list.component.css']
})
export class MovieReviewListComponent implements OnInit {
  @Input() movieId!: number;
  movie!: Movie;
  reviews: [string, string][] = [];
  rating: [string, number][] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovieReviews();
  }

  loadMovieReviews(): void {
    this.movieService.getMovieById(this.movieId).subscribe((movie: Movie | undefined) => {
      if (movie) {
        this.movie = movie;
        this.reviews = movie.reviews;
        this.rating = movie.rating;
      }
    });
  }

  getRating(reviewer: string): number {
    return this.rating.find((entry) => entry[0] === reviewer)?.[1] || 0;
  }
}
