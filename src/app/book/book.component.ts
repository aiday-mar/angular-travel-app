import { Component, OnInit } from '@angular/core';
import flightsData from './flights.json';

interface Flight {
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

  constructor() {}

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
