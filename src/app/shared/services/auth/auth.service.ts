import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = ""
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  async signUpWithToken(email: string, password: string, role: string) {
    // headers with authorization bearer
    const headers = {
      'Authorization': 'Bearer 8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb',
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
    if(role === 'company') role = 'ROLE_COMPANY'
    else role = 'ROLE_TECHNICIAN'
    const body = {
      username: email,
      password: password,
      roles: [role]
    }
    try {
      return this.http.post<any>(`${this.baseUrl}/authentication/sign-up`, body, {headers});
    }catch(e) {
      console.log('Error to sign up with token', e);
      return null;
    }
  }

  async signInWithToken(email: string, password: string) {
    const headers = {
      'Authorization': 'Bearer 8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb',
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };
    const body = {
      username: email,
      password: password
    };

    try {
      return this.http.post<any>(`${this.baseUrl}/authentication/sign-in`, body, {headers});
    }catch(e) {
      console.log('Error to sign in with token', e);
      return null;
    }
  }

  async signIn(email: string, password: string) {
    const headers = this.getHeadersAuthorization();
    try {
      return this.http.get<any>(`${this.baseUrl}/auth/login?email=${email}&password=${password}`, {headers});
    } catch (error) {
      console.log('Error to sign in', error);
      return null;
    }
  }

  async signUp(firstName: string, lastName: string, email: string, password: string, role: string) {
    console.log('token', this.getToken());
    const headers = this.getHeadersAuthorization();

    try {
      return this.http.post<any>(`${this.baseUrl}/auth/register`, {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "role": role
      }, {headers});
    }catch(e) {
      console.log('Error to sign up', e);
      return null;
    }
  }

  getUserById(id: number) {
    const headers = this.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/auth/${id}`, {headers});

  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getHeadersAuthorization() {
    return {
      "Authorization": `Bearer ${this.getToken()}`,
      "Content-Type": "application/json",
      "accept": "application/json"
    }
  }
}
