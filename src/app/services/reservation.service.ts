import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();

  constructor() {
    this.loadReservationsFromLocalStorage();
  }

  saveReservationsToLocalStorage(): void {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  loadReservationsFromLocalStorage(): void {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    } else {
      this.reservations = [];
    }
  }

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
    this.cartItemsCountSubject.next(this.reservations.length);
  }

  alreadyReserved(movieId: number): boolean {
    return this.reservations.some(reservation => reservation.movieId === movieId);
  }

  getReservations(): Observable<Reservation[]> {
    return of(this.reservations);
  }

  removeReservation(reservation: Reservation) {
    this.reservations = this.reservations.filter(r => r !== reservation);
    this.cartItemsCountSubject.next(this.reservations.length);
  }

  hasWatched(movieId: number): boolean {
    return this.reservations.some(reservation => reservation.movieId === movieId && reservation.status === 'watched');
  }

  calculateTotalPrice() {
    return this.reservations.reduce((total, reservation) => total + reservation.showtime.price, 0);
  }

  cancelReservation(movieId: number): Observable<void> {  
    this.reservations = this.reservations.filter(r => r.movieId !== movieId);
    this.cartItemsCountSubject.next(this.reservations.length);

    return of();
  }
  

  markAsWatched(movieId: number): Observable<void> {
    const reservation = this.reservations.find(r => r.movieId === movieId);
    if (reservation) {
      reservation.status = 'watched';
    }
    return of();
  }
}
