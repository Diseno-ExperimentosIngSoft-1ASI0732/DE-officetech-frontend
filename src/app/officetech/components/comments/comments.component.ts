import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup,MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {RatingComponent, StarRatingColor} from "../rating/rating.component";
import {PanelItemsService} from "../../services/panel/panel-items.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    NgOptimizedImage,
    MatCardModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    NgForOf,
    RatingComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  type_user: string = "";
  id_user: string = "";
  id_service: string = "";
  comment: string = "";
  service: any = {};
  technician: string = "";
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private panelService: PanelItemsService, private userService: UserService){}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.type_user = p['type_user'];
      this.id_user = p['id'];
      this.id_service = p['serviceId'];
    })

    this.getService();
  }

  getService() {
    this.panelService.getServicesByID(parseInt(this.id_service)).subscribe(
      r => {
        this.service = r;
        console.log(this.service)
        this.userService.getUserDataByIdServices(this.service.technicianId).subscribe(
          r => {
            this.technician = r.name;
          },
          e => {
            console.log(e);
          }
        )
      },
      e => {
        console.log(e);
      }
    )

  }

  addComment() {
    this.panelService.addCommentAndRating(parseInt(this.id_service), this.rating, this.comment).subscribe(
      r => {
        console.log(r);
        this.router.navigate([`/services/${this.type_user}/${this.id_user}`])
      },
      e => {
        console.log(e);
      }
    )
  }

  onRatingChanged(rating: number){
    console.log(rating);
    this.rating = rating;
  }

}

