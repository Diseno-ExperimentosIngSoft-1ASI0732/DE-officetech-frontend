import { Injectable } from '@angular/core';
import ForumCommentEntity from "../../models/forum-comment.entity";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  baseUrl: string = ""
  headers: any = {}
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl;
  }
  getForumPosts() {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/forum/posts`, {headers})
  }

  getForumPostById(id: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/forum/posts/${id}`, {headers})
  }

  createForumPost(id: number, post: any) {
    return this.http.post<any>(`${this.baseUrl}/forum/new-post`, post)
  }

  saveForumPost(post: any) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.post<any>(`${this.baseUrl}/forum/new-post`, post, {headers})
  }

  saveNewAnswerByPostId(newAnswer: any) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.post<any>(`${this.baseUrl}/answers`, newAnswer, {headers})
  }

  getAnswersByPostId(idPost: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/answers/post/${idPost}`, {headers})
  }
}
