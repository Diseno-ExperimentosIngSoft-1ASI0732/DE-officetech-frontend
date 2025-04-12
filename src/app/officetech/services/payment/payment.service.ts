import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl: string = "";
  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl;
  }

  async savePayment(payment: any) {
    const headers = this.authService.getHeadersAuthorization();
    console.log('Authorized: ', headers);
    try {
      return this.http.post<any>(`${this.baseUrl}/payment-details`, payment, {headers});
    }catch(e) {
      console.log('Error to save payment', e);
      return null;
    }
  }
}
