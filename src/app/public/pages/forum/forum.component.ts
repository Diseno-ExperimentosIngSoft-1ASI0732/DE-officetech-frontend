import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import { CommentComponent } from '../../../officetech/components/comment/comment.component';
import { ResponsesComponent } from '../../../officetech/components/responses/responses.component';
import ForumCommentEntity from "../../../officetech/models/forum-comment.entity";
import {ForumService} from "../../../officetech/services/forum/forum.service";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MonkeyNotFoundComponent} from "../../../officetech/components/monkey-not-found/monkey-not-found.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommentComponent,
    ResponsesComponent,
    NgForOf,
    NgIf,
    MatDialogContainer,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MonkeyNotFoundComponent
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  type_user: number = 1; // here will be the type of the user bringing by event input, 1: team, 0: technician
  id_user: string = "1";
  data: any[] = [];
  answers: any[] = [];
  showNewForm: boolean = false;
  dataNewForum = {
    title: "",
    description: "",
    user_owner: {
      id: 0,
      type_user: "",
      name: "",
      email: "",
      password: "",
    },
    answers: []
  };

  constructor(private forumService: ForumService, private router: Router,
              private route: ActivatedRoute, private authService: AuthService){
  }

  ngOnInit() {
    this.getTypeUser();
    this.getForumPosts();
  }

  getForumPosts() {
    this.forumService.getForumPosts().subscribe(
      result => {
        this.data = [];
        result.forEach((forum: any)=> {
          // here call the method users
          const forumPost = {
            image: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png",
            name: "Tech Company",
            title: forum.title,
            description: forum.description,
            postId: forum.postId,
            companyId: forum.companyId
          }

          let response = this.authService.getUserById(forum.companyId);
          try {
            response.subscribe(
              (user: any) => {
                forumPost.name = user.firstName + " " + user.lastName;
              }
            )
          }catch(e) {
            console.log('Not found',e )
          }

          this.data.push(forumPost);
        })
      },
      e => {
        console.log(e);
      }
    )
  }

  getTypeUser() {
    this.route.params.subscribe(params => {
      this.type_user = (params['type_user'] === "company")? 1 : 0;
      this.id_user = params['id'];
    })
  }

  receiveAnswers(answers: any[]) {
    this.answers = answers;
  }

  newAnswer(id: number) {
    this.router.navigate(['forum','technician',this.id_user,'publish', id]);
  }

  showNewForum(){
    this.showNewForm = !this.showNewForm;
  }

  saveNewPostForum() {
    let newForum = {
      idCompany: this.id_user,
      title: this.dataNewForum.title,
      description: this.dataNewForum.description
    };

    this.forumService.saveForumPost(newForum).subscribe(
      r=>{
        if(r) {
          this.showNewForm = false;
          this.getForumPosts();
          this.dataNewForum = {
            title: "",
            description: "",
            user_owner: {
              id: 0,
              type_user: "",
              name: "",
              email: "",
              password: "",
            },
            answers: []
          };
        }
      }
    )
  }
}
