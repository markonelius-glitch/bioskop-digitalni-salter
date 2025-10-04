import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(loginForm: NgForm) {
    if (loginForm.valid) 
    {
      if (this.userService.login(this.email, this.password)) 
      {
        this.router.navigate(['/home']);
      } 
      else 
      {
        this.errorMessage = 'Neispravno korisničko ime ili lozinka.';
      }
    }
  }
}
