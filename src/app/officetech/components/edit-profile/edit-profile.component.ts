import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatActionList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";
import {NgFor} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEntity} from "../../models/user-entity";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatActionList,
    MatButtonModule,
    MatIcon,
    NgFor,
    MatDialogModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  public skills: any[] = [];
  firstName: string= "";
  lastName: string= "";
  email: string= "";
  phone: string= "";
  password: string= "";
  type_user: string = "";
  id_user: string = "";
  user_data: UserEntity = new UserEntity();

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
              private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type_user = params['type_user'];
      this.id_user = params['id'];
    });
    this.getUser();
    this.getSkills();
  }

  getSkills() {
    this.userService.getSkillsByUserId(parseInt(this.id_user)).subscribe(
      (data: any) => {
        console.log('skills', data)
        this.skills = data;
      }
    );
  }
  getUser() {
    this.userService.getUserById(parseInt(this.id_user)).subscribe(
      (data: any) => {
        const user = new UserEntity(data.id, data.firstName + " " + data.lastName, data.email, data.password, data.role, data.phone)
        this.user_data = user;
      }
    );
  }

  openDialog(): void {
    // send the user id to the dialog
    const dialogRef = this.dialog.open(SkillDialogComponent, {
      width: '250px',
      data: {userId: this.id_user}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.skills.push(result);
      }
    });
  }

  saveProfile() {
    const bodyUserEdit = {
      id: parseInt(this.id_user),
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      password: this.password
    }
    this.userService.editUserById(parseInt(this.id_user), bodyUserEdit).subscribe(
      (data: any) => {
        this.router.navigate(['profile', this.type_user, this.id_user])
      }
    );
  }

  cancelProfile() {
    this.router.navigate(['profile', this.type_user, this.id_user])
  }

  deleteSkill(skillId: number) {
    this.userService.deleteSkillById(skillId).subscribe(
      (data: any) => {
        this.skills = this.skills.filter(skill => skill.id !== skillId);
      }
    )
  }
}
