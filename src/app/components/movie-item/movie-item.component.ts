import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input() movie!: Movie;

  constructor(private reservationService: ReservationService, private router: Router) {}

  calculateRating(rating: number[][]): number {
    let sum = 0;
    let count = 0;
    rating.forEach(r => {
      sum += r[0];
      count++;
    });
    return count > 0 ? sum / count : 0;
  }
 
  reserveMovie(id: number, showtime: { date: string, time: string, price: number }): void {

    if (this.reservationService.alreadyReserved(id)) {
        alert(`Već ste rezervisali ovaj film!`);
        return;
    }
    const newReservation: Reservation = {
      movieId: id,
      showtime: showtime,
      status: 'reserved'
    };

    alert(`Rezervacija za projekciju: ${showtime.date} - ${showtime.time} u vrednosti od ${showtime.price} je uspešna!`);
    this.reservationService.addReservation(newReservation);
  }

  navigateToMovieDetail(id: number) {
    this.router.navigate([`/movie/${id}`]);
  }
}
