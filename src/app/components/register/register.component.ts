import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  favoriteGenres: string[] = [];

  constructor(private userService: UserService,  private router: Router) {}

  register(loginForm: NgForm) {
    // Generisanje jedinstvenog ID-a
    const userId = Date.now();
    
    const newUser: User = {
      id: userId,
      name: this.name,
      password: this.password,
      email: this.email,
      phone: this.phone,
      address: this.address,
      favoriteGenres: this.favoriteGenres,
      reservations: []
    };

    this.userService.register(newUser);
    alert('Registracija uspješna!');
    this.router.navigate(['/login']);
  }
}
