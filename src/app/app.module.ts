import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieService } from './services/movie.service';
import { ReservationService } from './services/reservation.service';
import { UserService } from './services/user.service';
import { SearchComponent } from './components/search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieDetailComponent } from './components/movie-details/movie-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { ReservationItemComponent } from './components/reservation-item/reservation-item.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MovieReviewComponent } from './components/movie-review/movie-review.component';
import { MovieReviewListComponent } from './components/movie-review-list/movie-review-list.component'; 

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    MovieListComponent,
    UserProfileComponent,
    HomeComponent,
    HeaderComponent,
    MovieItemComponent,
    MovieDetailComponent,
    RatingStarsComponent,
    ReservationItemComponent,
    MyReservationsComponent,
    MovieReviewComponent,
    MovieReviewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [MovieService, ReservationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

