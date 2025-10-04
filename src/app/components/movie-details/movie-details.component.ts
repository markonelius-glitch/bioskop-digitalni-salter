import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movieForm!: FormGroup;
  movie!: Movie;
  hasWatched: boolean = false;

  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder,
    private movieService: MovieService,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
      this.movieId = Number(this.route.snapshot.paramMap.get('id'));

      this.movieService.getMovieById(this.movieId).subscribe(movies => {
        this.movie = movies as Movie;
      });

    this.hasWatched = this.reservationService.hasWatched(this.movieId);

    this.movieForm = this.fb.group({
      review: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]] 
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formValue = this.movieForm.value;
      console.log('Form submitted with:', formValue);
    }
  }
}
