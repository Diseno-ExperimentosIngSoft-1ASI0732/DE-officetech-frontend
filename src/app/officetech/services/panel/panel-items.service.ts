import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PanelItemsService {
  baseUrl: string = ""
  data: any[] = []
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl;
  }

  getItems(type_user: string, id_user: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/services/${type_user}/active/${id_user}`, {headers})
  }

  getItemsCompleted(type_user: string, id_user: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/services/${type_user}/completed/${id_user}`, {headers})
  }

  editStatusService(id_service: number, status: string) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.put<any>(`${this.baseUrl}/services/change-status/${id_service}?status=${status}`, {}, {headers})
  }

  addCommentAndRating(id_service: number, rating: number, comment: string) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.put<any>(`${this.baseUrl}/services/${id_service}?comment=${comment}&rating=${rating}`, {}, {headers} )
  }

  getServicesByID(id_service: number) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/services/${id_service}`, {headers})
  }

}
