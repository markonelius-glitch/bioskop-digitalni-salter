import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  private user: User | null = null;
  
  allGenres = ['Action', 'Comedy', 'Drama', 'Adventure', 'Sci-Fi', 'Romance'];

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
 //   this.user = this.userProfileService.getUserProfile();
  }

  saveProfile(): void {
    this.userProfileService.updateUserProfile(this.user);
    alert('Profil uspešno sačuvan!');
  }
}
