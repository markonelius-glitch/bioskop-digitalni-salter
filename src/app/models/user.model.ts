import { Reservation } from "./reservation.model";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    favoriteGenres: string[];
    reservations: Reservation[];
  }
  