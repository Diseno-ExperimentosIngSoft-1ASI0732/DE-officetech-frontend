import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserEntity} from "../../models/user-entity";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatRadioGroup,
    MatRadioButton,
    MatAnchor,
    MatButtonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  hide = true;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  password_confirm: string = "";
  type_user: string = "";

  constructor(private router: Router, private authService: AuthService,public dialog: MatDialog) {
    this.hide=true;
  }

  openDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: message}
    })
  }



  async signUp() {
    if(this.first_name === "" || this.last_name === "" || this.email === "" || this.password === "" || this.password_confirm === "" || this.type_user === "") this.openDialog("All fields are required");
    else if(this.password !== this.password_confirm) this.openDialog("Passwords do not match");
    else {

      await this.authService.signUpWithToken(this.email, this.password, this.type_user).then((response: any) => {
        console.log('response', response);
          response.subscribe(
            async (r:any) =>  {

              await this.authService.signInWithToken(this.email, this.password).then((response: any) => {
                response.subscribe(
                  (r:any) => {
                    this.authService.saveToken(r.token);
                  }
                )
              })

            }
          )
        }
      )


      let response = await this.authService.signUp(this.first_name, this.last_name, this.email, this.password, this.type_user);
      if(response) {
        response.subscribe(
          r=> {
            if(r.status_code !== 202) this.openDialog(r.message);
            else {
              this.goToSubscription(r.userInfo.id, r.userInfo.role);
            }
          }
        )
      }
    }

  }

  goToSubscription(id: number, type_user: string) {
    this.router.navigate(["sign-up", "subscription", type_user, id]);
  }

  goToSignIn() {
    this.router.navigate(["sign-in"]);
  }

  detectPassword(value: string) {
    //console.log(value)
  }

  changeTypeUser(value: string) {
    this.type_user = value;
  }
}
