import { Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  reservations: Reservation[] = [];
  totalPrice: number = 0;

  constructor(private reservationService: ReservationService) {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.reservations.reduce((total, reservation) => total + reservation.showtime.price, 0);
  }

  removeReservation(reservation: Reservation) {
    this.reservationService.removeReservation(reservation);
    this.calculateTotal();
  }
}
