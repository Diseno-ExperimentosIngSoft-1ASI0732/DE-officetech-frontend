import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {ForumService} from "../../services/forum/forum.service";
import {Router} from "@angular/router";
import ForumCommentEntity from "../../models/forum-comment.entity";
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MonkeyNotFoundComponent} from "../monkey-not-found/monkey-not-found.component";

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardHeader,
    NgForOf,
    NgIf,
    MonkeyNotFoundComponent
  ],
  templateUrl: './responses.component.html',
  styleUrl: './responses.component.css'
})

export class ResponsesComponent implements OnInit{
  post: ForumCommentEntity | undefined;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (!isNaN(postId)) {
        this.loadPost(postId);
        this.loadAnswersPost(postId);
      }
    });
  }

  private loadPost(postId: number, answers: any = []) {
    try {
      this.forumService.getForumPostById(postId).subscribe(
        (result) => {
          const post = result.resource;
          this.authService.getUserById(post.companyId).subscribe(
            r=> {
              this.post = new ForumCommentEntity(post.id, "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png", r.firstName + " " + r.lastName, post.title, post.description, answers);
            }
          )
        }
      );
    } catch (error) {
      console.error('Error al cargar la publicación:', error);
    }
  }
  private loadAnswersPost(postId: number) {
    try {
      this.forumService.getAnswersByPostId(postId).subscribe(
        (result) => {
          console.log('answers', result)
          let answers: any = [];
          result.forEach((answer: any) => {
            console.log('answer', answer);
            let answerFinal = {}
            this.authService.getUserById(answer.idTechnician).subscribe(
              r=> {
                answerFinal = {
                  name: r.firstName + " " + r.lastName,
                  description: answer.description
                };

                answers.push(answerFinal);
              }
            );
            console.log('ola', answers);
          });

          this.loadPost(postId, answers);
        });

    } catch (error) {
      console.error('Error al cargar la publicación:', error);
    }
  }
}
