import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {RequestServiceService} from "../../services/request-service/request-service.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {UserService} from "../../services/user/user.service";
import {PanelItemsService} from "../../services/panel/panel-items.service";
import {MonkeyNotFoundComponent} from "../monkey-not-found/monkey-not-found.component";

interface Service {
  id: number;
  first: string;
  second: string;
  third: string;
  fourth: number;
  rating: number;
}

@Component({
  selector: 'app-services-rating',
  templateUrl: './services-rating.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    MatProgressBarModule,
    MonkeyNotFoundComponent,
    NgIf
  ],
  styleUrls: ['./services-rating.component.css']
})
export class ServicesRatingComponent implements OnInit {
  services: Service[] = [];
  type_user: string;
  id: string;

  constructor(
    private requestServiceRating: RequestServiceService,
    private userService: UserService,
    private panelService: PanelItemsService,
    private router: Router
  ) {
    // Retrieve type_user and id from the URL
    this.type_user = this.router.url.split('/')[2];
    this.id = this.router.url.split('/')[3];
  }

  ngOnInit() {
    this.loadServicesRating();
  }

  loadServicesRating() {
    this.panelService.getItemsCompleted(this.type_user, parseInt(this.id)).subscribe(
      r=> {
          if(r) {
            for(let i of r) {
              this.userService.getUserDataByIdServices(i.companyId).subscribe(
                res=>{
                  this.services.push({
                    id: i.id,
                    first: i.title,
                    second : res.name,
                    third: i.createdAt.split("T")[0],
                    fourth: i.createdAt.split("T")[0],
                    rating: i.rating
                  })
                },
                e=>{
                  console.log("Error to obtain user id", e)
                }
              )

            }
          }
      }, e=> {
        console.log(e);
      }
    )
  }

}
