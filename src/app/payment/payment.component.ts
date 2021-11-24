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
  paymentHandler: any = null;

  constructor(private bookingService: BookingService) {
    this.flightsToPay = bookingService.flightsToPay;
  }

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JuGPUETqlXqcNbHQoJB3ZzDzeoNENAtAl8zabUCyif8ZLTtPFPq0a2GRCvJYliNSDb6fKzDRBwYng40So42mQP500Cy1ROssB',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Payment',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JuGPUETqlXqcNbHQoJB3ZzDzeoNENAtAl8zabUCyif8ZLTtPFPq0a2GRCvJYliNSDb6fKzDRBwYng40So42mQP500Cy1ROssB',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
