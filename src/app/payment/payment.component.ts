import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';

interface Flight {
  id: String;
  from: String;
  to: String;
  departure: String;
  arrival: String;
  price: String;
}

@Component({
  selector: 'payment-selector',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  flightsToPay: Flight[];

  constructor(private bookingService: BookingService) {
    this.flightsToPay = bookingService.flightsToPay;
  }

  ngOnInit() {}
}
