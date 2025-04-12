import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {ForumService} from "../../services/forum/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  @Input() type_user: any;
  @Input() element: any;
  @Output() answers = new EventEmitter<any>();
  answersLength: number = 0;

  constructor(private forumService: ForumService, private router: Router,
              private route: ActivatedRoute, private authService: AuthService){
  }
  ngOnInit() {
    this.answers.emit(this.element.answers)
    this.getLengthAnswers();
  }

  getLengthAnswers() {
    this.forumService.getAnswersByPostId(this.element.postId).subscribe(
      (data) => {
        this.answersLength = data.length;
      }
    )
  }

  getResponses(id: number) {
    this.router.navigate(['forum','responses', this.element.postId]);
  }
}
