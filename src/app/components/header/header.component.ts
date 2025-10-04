import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isLoggedIn: boolean = false;
  cartItemsCount: number = 0;
  watchedMoviesCount: number = 0;

  constructor(private userService: UserService, private reservationService: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.reservationService.cartItemsCount$.subscribe(count => {
      this.cartItemsCount = count;
    });
  }

  checkLoginStatus(): void {
    this.userName = this.userService.getCurrentUser()?.name || '';
    this.isLoggedIn = !!this.userName;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
