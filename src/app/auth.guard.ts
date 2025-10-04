import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);  // Injectovanje USerService
  const router = inject(Router);  // Injectovanje Router-a za preusmeravanje

  //return true;
  
  // Ako je korisnik autentifikovan, dopuštamo pristup
  if (userService.isLoggedIn()) {
    return true;
  } else {
    // Ako nije autentifikovan, preusmeravamo na login stranicu
    router.navigate(['/login']);
    return false;
  }
};
