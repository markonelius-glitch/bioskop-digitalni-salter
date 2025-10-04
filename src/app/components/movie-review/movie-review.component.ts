import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  @Input() movieId!: number;
  movieForm!: FormGroup;
  hasWatched: boolean = false;
  userName: string = '';
  movie: Movie | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private movieService: MovieService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.userName = this.userService.getCurrentUser()?.name || '';
    this.movieService.getMovieById(this.movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error('Error fetching movie', error);
        return;
      }
    );

    const userReview = this.movie?.reviews.find(r => r[0] === this.userName);
    const userRating = this.movie?.rating.find(r => r[0] === this.userName);
    
    this.movieForm = this.fb.group({
      rating: [userRating ? userRating[1] : null, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: [userReview ? userReview[1] : '', Validators.required],
    });

    this.hasWatched = this.reservationService.hasWatched(this.movieId);
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const updatedRating = this.movieForm.value.rating;
      const updatedReview = this.movieForm.value.review;
      
      this.movieService.updateMovieReview(this.movieId, this.userName, updatedRating, updatedReview)
        .subscribe(updatedMovie => {
          if (updatedMovie) {
            console.log('Film je uspešno ažuriran:', updatedMovie);
            alert(`Uspešno ste poslali recenziju!`);
          }
        });
    }
  }

  toggleWatched() {
    this.hasWatched = !this.hasWatched;
  }
}
