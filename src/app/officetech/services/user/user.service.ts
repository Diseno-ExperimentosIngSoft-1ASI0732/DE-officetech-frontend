import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {UserEntity} from "../../models/user-entity";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs";
import {AuthService} from "../../../shared/services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = ""
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl=environment.baseUrl;
  }
  getUserData() {
    return this.http.get<UserEntity[]>(`${this.baseUrl}/users `).pipe(
      tap(data => console.log('Datos del usuario recibidos:', data)));
  }

  getUserDataByIdServices(id: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<UserEntity>(`${this.baseUrl}/services/user/${id}`, {headers}).pipe(
      tap(data => console.log('Datos del usuario recibidos:', data)));
  }

  getUserById(id: number) {
    const headers   = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/auth/${id}`, {headers}).pipe(
      tap(data => console.log('Datos del usuario recibidos:', data)));
  }

  editUserById(id: number, user: any) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.put<any>(`${this.baseUrl}/profiles/${id}`, user, {headers});
  }

  getSkillsByUserId(userId: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/auth/skills/${userId}`, {headers});
  }

  saveSkillByUserId(skill: any) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.post<any>(`${this.baseUrl}/auth/skills`, skill, {headers});
  }

  getAllSkills() {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/auth/skills`, {headers});
  }

  deleteSkillById(skillId: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.delete<any>(`${this.baseUrl}/auth/skills/${skillId}`, {headers});
  }
}
