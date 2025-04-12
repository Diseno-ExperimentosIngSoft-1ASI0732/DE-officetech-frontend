import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatFormField, MatHint, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserEntity} from "../../models/user-entity";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatCardTitle,
    MatLabel,
    MatIconButton,
    MatIcon,
    MatSuffix,
    MatHint,
    FormsModule,
    DialogComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  hide = true;
  email: string = "";
  pass: string = "";
  data: any = {
    status_code: 0,
    message: "",
    user: {}
  };
  showDialog: boolean = false;
  constructor(private router: Router, private authService: AuthService,
              public dialog: MatDialog) {
    this.hide=true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  openDialog(message: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: message}
    })
  }

  goToSignUp() {
    this.router.navigate(["sign-up"]);
  }

  async signIn() {
    if(this.email === "" || this.pass === "") this.openDialog("The email and password are required.")
    else {
      await this.authService.signInWithToken(this.email, this.pass).then((r: any)=>{
        r.subscribe(async(data:any)=>{
            console.log(data);
          if (data.message) this.openDialog(data.message);
          else {
            this.authService.saveToken(data.token);

            const response: any = await this.authService.signIn(this.email, this.pass);
            if (response) {
              response.subscribe(
                (r: any)=>{
                  console.log(r);
                  this.data = r;

                  if(r.status_code !== 202) this.openDialog(r.message);
                  else this.router.navigate(["home", r.user.role, r.user.id])
                }
              )
            }
          }


        },
        (e: any)=>{
          this.openDialog(e.error.message);
        })
      });

      /*
      const response: any = await this.authService.signIn(this.email, this.pass);
      if (response) {
        response.subscribe(
          (r: any)=>{
            console.log(r);
            this.data = r;

            if(r.status_code !== 202) this.openDialog(r.message);
            else this.router.navigate(["home", r.user.role, r.user.id])
          }
        )
      }*/
    }
  }
}
