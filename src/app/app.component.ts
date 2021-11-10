import { Component } from '@angular/core';
import { BookingService } from './services/booking.service';


interface Flight {
  id: String;
  from: String;
  to: String;
  departure: String;
  arrival: String;
  price: String;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  flightsToPay: Flight[];

  constructor(private bookingService: BookingService) {
    this.flightsToPay = bookingService.flightsToPay;
  }
}
