import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from 'rxjs';
import {AuthService} from "../../../shared/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  baseUrl: string = ""
  data: any[] = []
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl;
  }

  getItemCount(): Observable<number> {
    return this.getItems().pipe(
      map(items => items.length) // Utiliza el método length para obtener la cantidad de elementos en el array
    );
  }

  getItems() {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/services`, {headers})
  }

  addService(newService: any) {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.post(`${this.baseUrl}/services`, newService, {headers});
  }

  getTechnicians() {
    const headers = this.authService.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/services/users/technician`, {headers})
  }
}
