import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Reservation } from 'src/app/models/reservation.model';
import { MovieService } from 'src/app/services/movie.service';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent {
  @Input() reservation!: Reservation;
  @Input() movie!: Movie;
  @Output() cancelReservationEvent = new EventEmitter<number>();

  constructor(private reservationService: ReservationService) {}
  
  cancelReservation() {
    alert('Rezervacija je otkazana!');
    console.log('Rezervacija otkazana:', this.reservation.movieId);
    this.reservationService.cancelReservation(this.reservation.movieId);
    this.cancelReservationEvent.emit(this.reservation.movieId);
    
  }    

  markAsWatched() {
    this.reservationService.markAsWatched(this.reservation.movieId);
    this.reservation.status = 'watched';
  }
}