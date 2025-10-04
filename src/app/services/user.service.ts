import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | null = null;

  constructor() {}
  
  register(newUserData: User): void {
    // Simuliramo registrovanje korisnika

    const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');    
    storedUsers.push(newUserData);
    localStorage.setItem('mockUsers', JSON.stringify(storedUsers));
  }

  login(email: string, password: string) {
    // Simulacija login-a

    const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    this.currentUser = storedUsers.find((u: User) => u.email === email && u.password === password);

    return this.currentUser ? true : false;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }
}
