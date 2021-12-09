# Angular travelling website

Link : https://travel-angular-aiday.web.app/

Note : This website was developed using StackBlitz, hence why some files are missing as compared to if I was developing locally on my computer. 

![alt text](https://github.com/aiday-mar/Angular-travel-app/blob/master/Angular_Picture_1.PNG?raw=true)

<br/><br/>

![alt text](https://github.com/aiday-mar/Angular-travel-app/blob/master/Angular_Picture_2.PNG?raw=true)

<b>Customer support chat window</b>

The chat window is made using the Kendo library. A div was appended to the top of the window, which can be used to close the window.

<b>Booking interface</b>

There is a booking page, where you can search for a flight (the results are filtered on typing). It is also possible to select the date range of the flight using the Material UI date calendar picker. You can select the flights of interest by clicking on the shopping cart icon. The select flights will appear in the checkout. In order to do this, I implemented a booking service as follows:

```
import { Injectable } from "@angular/core";

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
```

Then I use the booking service as follows in the booking component.

```
export class BookComponent implements OnInit {
  flights: Flight[] = flightsData;
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
      return "grey";
    } else {
      return "green";
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
```

<b>Payment with stripe</b>

Once the flights are booked it is possible to pay for them. The payment component is implemented using the Stripe library.

```
export class PaymentComponent implements OnInit {
  flightsToPay: Flight[];
  paymentHandler:any = null;

  constructor(private bookingService: BookingService) {
    this.flightsToPay = bookingService.flightsToPay;
  }

  ngOnInit() {
    this.invokeStripe();
  }
  
  makePayment(amount) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: "PK",
      locale: "auto",
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert("Stripe token generated!");
      }
    });
  
    paymentHandler.open({
      name: "Payment",
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById("stripe-script")) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: "PK",
          locale: "auto",
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert("Payment has been successfull!");
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  }
}
```
