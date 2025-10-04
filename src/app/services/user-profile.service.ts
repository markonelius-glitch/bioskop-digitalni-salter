import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfile: User | null = null;  

  getUserProfile() {
    return { ...this.userProfile };
  }

  updateUserProfile(updatedProfile: any) {
    this.userProfile = { ...updatedProfile };
  }
}
