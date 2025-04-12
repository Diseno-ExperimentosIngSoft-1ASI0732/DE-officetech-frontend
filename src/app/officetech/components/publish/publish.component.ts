import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ForumService} from "../../services/forum/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import ForumCommentEntity from "../../models/forum-comment.entity";
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class PublishComponent implements OnInit {
  forum:any
  post: ForumCommentEntity | undefined;
  messageControl = new FormControl('',[Validators.required, Validators.maxLength(256)]);
  messages: any = [];
  userId: number = 0;
  postId: number = 0;
  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private userAuth: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const postId = +params['idForum'];  // Asegúrate de que 'id' sea el nombre correcto del parámetro.
      const userId = +params['id'];
      this.postId = postId;
      this.userId = userId;
      if (!isNaN(postId)) {
        this.loadPost(postId,userId);
        this.loadAnswers(postId);
      }
    });
  }

  private loadAnswers(postId: number) {
    try {
      this.forumService.getAnswersByPostId(postId).subscribe(
        r=>{
          this.messages = r;
          this.messages.forEach((message: any) => {
            this.userAuth.getUserById(message.idTechnician).subscribe(
              user => {
                if(user) message.nameTechnician = user.firstName + " " + user.lastName;
              }
            )
          });
        }
      )
    }catch(e) {
      console.log("error", e);
    }
  }
  private loadPost(postId: number,userId:number) {
    try {
      this.forumService.getForumPostById(postId).subscribe(
        r=>{
          if(r.status_code !== 202) return;

          const post = r.resource;
          let image = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";
          let name = "Tech Company";
          this.userAuth.getUserById(post.companyId).subscribe(
            res => {
              if(res) {
                name = res.firstName + " " + res.lastName;
                this.post = new ForumCommentEntity(post.postId, image, name, post.title, post.description, []);
              }
            }
          );
        }
      )
    } catch (error) {
      console.error('Error al cargar la publicación:', error);
    }
  }

  publishMessage() {
    if (this.messageControl.value) {
      const newMessage = {
        idTechnician: this.userId,
        idPost: this.postId,
        description: this.messageControl.value,
      };
      this.forumService.saveNewAnswerByPostId(newMessage).subscribe(
        r => {
          this.loadAnswers(this.postId);
        }
      )
      this.messageControl.reset();
    }
  }
}
