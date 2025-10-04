import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation.model';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  movies: Movie[] = [];

  constructor(private reservationService: ReservationService, private movieService: MovieService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(res => {
      this.reservations = res;
    });

    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  getMovieById(movieId: number): Movie {
    return this.movies.find(movie => movie.id === movieId) as Movie;;
  }

  onCancelReservation(movieId: number) {
    this.reservations = this.reservations.filter(res => res.movieId !== movieId);
  }
}
