import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {RequestServiceService} from "../../services/request-service/request-service.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {PanelItemsService} from "../../services/panel/panel-items.service";
import {UserService} from "../../services/user/user.service";
import {MonkeyNotFoundComponent} from "../monkey-not-found/monkey-not-found.component";  // Adjust the path accordingly

interface Service {
  id: number;
  first: string;
  second: string;
  third: string;
  fourth: number;
}

@Component({
  selector: 'app-services-ccompany',
  templateUrl: './services-ccompany.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    MonkeyNotFoundComponent,
    NgIf
  ],
  styleUrls: ['./services-ccompany.component.css']
})
export class ServicesCompanyComponent implements OnInit {
  services: Service[] = [];
  type_user: string;
  id: string;

  constructor(
    private panelService: PanelItemsService,
    private userService: UserService,
    private router: Router
  ) {
    // Retrieve type_user and id from the URL
    this.type_user = this.router.url.split('/')[2];
    this.id = this.router.url.split('/')[3];
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.panelService.getItemsCompleted(this.type_user, parseInt(this.id)).subscribe(
      r=> {
        if(r) {
          for(let i of r) {
            this.userService.getUserDataByIdServices(i.technicianId).subscribe(
              res=>{
                this.services.push({
                  id: i.id,
                  first: i.title,
                  second : res.name,
                  third: i.createdAt.split("T")[0],
                  fourth: i.rating
                })
              },
              e=>{
                console.log("Error to obtain user id", e)
              }
            )

          }
        }
      }
    )
  }

  newComment(serviceId: number) {
    this.router.navigate(["services", this.type_user, this.id, "new_comment", serviceId]);
  }

  newRequestService() {
    // Use dynamic routing based on type_user and id
    this.router.navigate(["services", this.type_user, this.id, "new_tech_requirement"]);
  }
}
