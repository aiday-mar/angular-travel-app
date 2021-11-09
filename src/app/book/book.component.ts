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
  from: string = '';
  to: string = '';

  constructor() {}

  onChangeFrom(event) {
    this.from = event;
    console.log(this.to);
    this.flights = flightsData.filter(function (entry) {
      if (this.to !== "") {
        return entry.from.includes(event) && entry.to.includes(this.to);
      } else {
        return entry.from.includes(event);
      }
    });
  }

  onChangeTo(event) {
    this.to = event;
    this.flights = flightsData.filter(function (entry) {
      if (this.from !== '') {
        return entry.to.includes(event) && entry.from.includes(this.from);
      } else {
        return entry.to.includes(event);
      }
    });
  }

  onClickSubmit(data) {
    this.flights = flightsData.filter(function (entry) {
      return entry.from == data.from && entry.to == data.to;
    });
  }

  ngOnInit() {}
}
