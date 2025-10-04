import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent {

  @Input() rating: [string, number][] = [['unknown', 0]];

  getStars(): string[] {
    const fullStar = 'assets/images/full-star.png';
    const halfStar = 'assets/images/half-star.png';
    const emptyStar = 'assets/images/empty-star.png';
  
    let stars = [];

    const totalRating = this.rating.reduce((sum, rating) => sum + rating[1], 0);
    const totalViewers = this.rating.length;
  
    let movieRating = totalRating / totalViewers;
  
    for (let i = 0; i < 5; i++) {
      if (movieRating >= i + 1) {
        stars.push(fullStar);  // Dodaj punu zvezdicu
      } else if (movieRating >= i + 0.5) {
        stars.push(halfStar);  // Dodaj polupunu zvezdicu
      } else {
        stars.push(emptyStar);  // Dodaj praznu zvezdicu
      }
    }
  
    return stars;
  }
}
