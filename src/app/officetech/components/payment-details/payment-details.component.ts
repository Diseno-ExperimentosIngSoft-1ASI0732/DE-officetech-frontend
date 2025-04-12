import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../services/payment/payment.service";

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  id: number = 0;
  type_user: string = "";
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
    // ... add the remaining months
  ];

  years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  paymentForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) {this.paymentForm = new FormGroup({
    cardHolderName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    expiratoryMonth: new FormControl('', Validators.required),
    expiratoryYear: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)]),
    user_id:  new FormControl(Math.random() * 10000)
  });}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.type_user = params["type_user"];
    });
  }

  returnSignUp() {
    this.router.navigate(['sign-up']);
  }

  async pay() {
    let response = await this.paymentService.savePayment(this.paymentForm.value);

    if(response) {
      response.subscribe(
        r=> {
          this.router.navigate(['home', this.type_user, this.id]);
        }
      )
    }
  }

  returnStart(){
    this.router.navigate(['']);
  }
}
