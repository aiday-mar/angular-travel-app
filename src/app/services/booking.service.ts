import { Injectable } from '@angular/core';

interface Flight {
  from: String;
  to: String;
  departure: String;
  arrival: String;
  price: String;
}

@Injectable()
export class BookingService {

  flightsToPay: Flight[] = [];

  constructor() {}
}
