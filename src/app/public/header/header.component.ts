import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass, NgForOf, NgIf, Location} from "@angular/common";
import {ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //navbar_list: string[] = [];
  routes_navbar: any[] = [];
  start_home: boolean = false;
  type_user: string = "";
  id: string = "";

  constructor(public router: Router, private route: ActivatedRoute, private location: Location) {
    this.titlesNavbar();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Llama a la función que deseas ejecutar cuando la ruta cambie
      this.titlesNavbar();

    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  titlesNavbar() {
    if (this.location.path()=== '/start' || this.location.path()==='/sign-in'|| this.location.path()==='/log-in'|| this.location.path()==='/sign-up'|| this.location.path()==='/sign-up/subscription'|| this.location.path()==='/sign-up/subscription/payment-details') {
      this.start_home = true;
      //this.navbar_list = ["Start","Sign-in"];
      this.routes_navbar = [["/start"], ["/sign-in"]];
    }
    else{
      this.start_home = false;
      //this.navbar_list = ["Home", "Forum", "Services", "Profile", "Sign Out"];
      //console.log(this.router.url);
      this.type_user = this.router.url.split('/')[2];
      this.id = this.router.url.split('/')[3];
      //console.log(this.type_user);

      this.routes_navbar = [["/home", this.type_user, this.id], ["/forum", this.type_user, this.id], ["/services", this.type_user, this.id], ["/profile", this.type_user, this.id], ["/sign-in"]];
    }
  }

  isActualRoute(title: string) {
    return this.router.url === title
  }

  toggleNavbar() {
    const navbar = document.querySelector('#toolbar__content-list');
    const navbar_toggleIcon = document.querySelector('.toolbar__content-toggle i');

    if (navbar && navbar_toggleIcon) {
      if (navbar.classList.contains('toolbar__content-list-active')) {
        navbar.classList.remove('toolbar__content-list-active');
        navbar.classList.add('toolbar__content-list')
        navbar_toggleIcon.classList.remove('fa-times');
        navbar_toggleIcon.classList.add('fa-bars');
      } else {
        navbar.classList.remove('toolbar__content-list');
        navbar.classList.add('toolbar__content-list-active');
        navbar_toggleIcon.classList.remove('fa-bars');
        navbar_toggleIcon.classList.add('fa-times');
      }
    }
  }

}
