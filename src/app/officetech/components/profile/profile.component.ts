import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {UserService} from "../../services/user/user.service";
import {UserEntity} from "../../models/user-entity";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

  userData: UserEntity | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      console.log(params);
      const userId = params['id'];
      try{
        this.userService.getUserById(userId).subscribe(
          (data: any) => {
            const user = new UserEntity(data.id, data.firstName + " " + data.lastName, data.email, data.password, data.role, data.phone)
            this.userData = user;
          }
        );

      } catch(error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    });
  }
    editProfile() {
      // @ts-ignore
      this.router.navigate(["profile", this.userData["type_user"], this.userData["id"], "edit-profile"]);
    }
}


