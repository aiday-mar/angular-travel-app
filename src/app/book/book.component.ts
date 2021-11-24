import { Component, OnInit } from '@angular/core';
import flightsData from './flights.json';
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
  selector: 'app-contact',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})

export class BookComponent implements OnInit {
  flights: Flight[] = flightsData;
  //flightIdsToPay: String[] = [];

  constructor(private bookingService: BookingService) {}

  saveBooking(
    id: string,
    from: string,
    to: string,
    departure: string,
    arrival: string,
    price: string
  ) {
    const toSave: Flight = {
      id: id,
      from: from,
      to: to,
      departure: departure,
      arrival: arrival,
      price: price,
    };

    if (this.bookingService.flightIdsToPay.indexOf(id) == -1) {
      this.bookingService.flightsToPay.push(toSave);
      this.bookingService.flightIdsToPay = this.bookingService.flightsToPay.map(
        (entry) => entry.id
      );
      this.bookingService.totalFlights =
        this.bookingService.totalFlights + Number(price);
    } else {
      this.bookingService.flightsToPay =
        this.bookingService.flightsToPay.filter((entry) => entry.id !== id);
      this.bookingService.flightIdsToPay = this.bookingService.flightsToPay.map(
        (entry) => entry.id
      );
      this.bookingService.totalFlights =
        this.bookingService.totalFlights - Number(price);
    }
  }

  getColor(id: string) {
    if (this.bookingService.flightIdsToPay.indexOf(id) == -1) {
      return 'grey';
    } else {
      return 'green';
    }
  }

  onChangeFrom(event) {
    this.flights = flightsData.filter(function (entry) {
      return entry.from.toLowerCase().includes(event.toLowerCase());
    });
  }

  onChangeTo(event) {
    this.flights = flightsData.filter(function (entry) {
      return entry.to.toLowerCase().includes(event.toLowerCase());
    });
  }

  onClickSubmit(data) {
    this.flights = flightsData.filter(function (entry) {
      return entry.from == data.from && entry.to == data.to;
    });
  }

  ngOnInit() {}
}
