import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, Location, NgIf} from "@angular/common";
import {CardComponent} from "../../../officetech/components/card/card.component";
import {CardHeaderComponent} from "../../../officetech/components/card-header/card-header.component";
import {PanelItemsService} from "../../../officetech/services/panel/panel-items.service";
import {filter} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../../officetech/services/user/user.service";
import {MonkeyNotFoundComponent} from "../../../officetech/components/monkey-not-found/monkey-not-found.component";

@Component({
  selector: 'app-panel-services',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    NgForOf,
    NgIf,
    MonkeyNotFoundComponent
  ],
  templateUrl: './panel-services.component.html',
  styleUrl: './panel-services.component.css'
})
export class PanelComponent implements OnInit {
  header_titles: string[] = []
  title: string = ""
  data: any[] = []
  id_user: number = 0
  type_user: string = ""

  constructor(private router: Router, private route: ActivatedRoute, private panelService: PanelItemsService, private location: Location, private userService: UserService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getTypeUser();
    });
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.panelService.getItems(this.type_user, this.id_user).subscribe(
      r=>{

        if(r) {
          for(let i of r) {
            if(this.type_user == "technician") { // if the user is technician, recover his services with the company name
              this.userService.getUserDataByIdServices(i.companyId).subscribe(
                res=>{
                  this.data.push({
                    id: i.id,
                    first: i.title,
                    second : res.name,
                    third: i.status,
                    fourth: i.date
                  })
                },
                e=>{
                  console.log("Error to obtain user id", e)
                }
              )
            }else {
              this.userService.getUserDataByIdServices(i.technicianId).subscribe(
                res=>{
                  this.data.push({
                    id: i.id,
                    first: i.title,
                    second : res.name,
                    third: i.status,
                    fourth: i.date
                  })
                },
                e=>{
                  console.log("Error to obtain user id", e)
                }
              )
            }

          }
        }
      },
      e=>{
        console.log("Error to obtain services", e)
      }
    )
  }

  getTypeUser() {
    if (this.location.path().includes('technician')) {
      this.header_titles = ["Tech Service", "Company", "Status", "Due"];
      this.title = "Your current projects";
      this.type_user = "technician";
    }else if(this.location.path().includes('company')){
      this.header_titles = ["Service", "Technician", "Status", "Due"];
      this.title = "Your current tech services";
      this.type_user = "company";
    }

    try {
      this.route.params.subscribe(params => {
        this.id_user = params['id']
      });
    } catch(e) {
      this.id_user = 1
    }

  }
}
