import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-subscription',
  standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatFormField,
        MatHint,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
      MatCardSubtitle
    ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{
  id: number = 0;
  type_user: string = ""
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type_user = params['type_user'];
    });
  }

  goToPaymentDetails() {
    this.router.navigate(["sign-up", "subscription", this.type_user, this.id, "payment-details"]);
  }
}
