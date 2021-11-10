import { Injectable } from '@angular/core';

interface Flight {
  id: String;
  from: String;
  to: String;
  departure: String;
  arrival: String;
  price: String;
}

@Injectable()
export class BookingService {
  flightsToPay: Flight[] = [];
  flightIdsToPay: String[] = [];
  totalFlights: number = 0;

  constructor() {}
}
