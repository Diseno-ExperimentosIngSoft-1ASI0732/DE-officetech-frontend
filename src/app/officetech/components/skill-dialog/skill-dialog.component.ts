import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent, MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-skill-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogContainer,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatButtonToggle,
  ],
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.css'
})
export class SkillDialogComponent{
  public skill: string = '';
  private userId: any;
  constructor(public userService: UserService, private dialogRef: MatDialogRef<SkillDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private route: ActivatedRoute){
    this.userId = data.userId;
  }

  saveSkill() {
    this.userService.getAllSkills().subscribe(skills => {
      const body = {
        userId: this.userId,
        skillDescription: this.skill
      }
      this.userService.saveSkillByUserId(body).subscribe(data => {
        console.log('data', skills)
        const body = {
          id: skills.length + 1,
          userId: this.userId,
          name: this.skill
        }
        this.dialogRef.close(body);
      });
    });
  }

  cancelSkill() {
    this.dialogRef.close();
  }


}
