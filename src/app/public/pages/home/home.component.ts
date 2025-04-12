import { Component } from '@angular/core';
import {PanelComponent} from "../panel-services/panel-services.component";
import {ForumComponent} from "../forum/forum.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PanelComponent,
    ForumComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){}
  goToLogin() {
    this.router.navigate(['/sign-in'])
  }

  goToSignUp() {
    this.router.navigate(['/sign-up'])
  }
}
