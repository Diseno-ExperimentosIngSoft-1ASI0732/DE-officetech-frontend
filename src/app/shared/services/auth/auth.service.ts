import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  // Método de sign up con token
  async signUpWithToken(email: string, password: string, role: string) {
    const token = this.getToken(); // Obtenemos el token
    const headers = {
      'Authorization': `Bearer ${token}`, // Usamos el token dinámicamente
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };

    if (role === 'company') role = 'ROLE_COMPANY';
    else role = 'ROLE_TECHNICIAN';

    const body = {
      username: email,
      password: password,
      roles: [role]
    };

    try {
      return this.http.post<any>(`${this.baseUrl}/authentication/sign-up`, body, { headers });
    } catch (e) {
      console.log('Error to sign up with token', e);
      return null;
    }
  }

  // Método de sign in con token
  async signInWithToken(email: string, password: string) {
    const token = this.getToken(); // Obtenemos el token
    const headers = {
      'Authorization': `Bearer ${token}`, // Usamos el token dinámicamente
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };

    const body = {
      username: email,
      password: password
    };

    try {
      return this.http.post<any>(`${this.baseUrl}/authentication/sign-in`, body, { headers });
    } catch (e) {
      console.log('Error to sign in with token', e);
      return null;
    }
  }

  // Método de sign in sin token
  async signIn(email: string, password: string) {
    const headers = this.getHeadersAuthorization();
    try {
      return this.http.get<any>(`${this.baseUrl}/auth/login?email=${email}&password=${password}`, { headers });
    } catch (error) {
      console.log('Error to sign in', error);
      return null;
    }
  }

  // Método de sign up sin token
  async signUp(firstName: string, lastName: string, email: string, password: string, role: string) {
    const headers = this.getHeadersAuthorization();

    try {
      return this.http.post<any>(`${this.baseUrl}/auth/register`, {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "role": role
      }, { headers });
    } catch (e) {
      console.log('Error to sign up', e);
      return null;
    }
  }

  // Obtener usuario por ID
  getUserById(id: number) {
    const headers = this.getHeadersAuthorization();
    return this.http.get<any>(`${this.baseUrl}/auth/${id}`, { headers });
  }

  // Guardar el token en el localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Obtener el token almacenado en el localStorage
  getToken() {
    const token = localStorage.getItem('token');
    console.log("Token obtenido:", token);
    return token;
  }


  // Crear encabezados de autorización con el token
  getHeadersAuthorization() {
    const token = this.getToken(); // Obtenemos el token
    return {
      'Authorization': `Bearer ${token}`, // Usamos el token dinámicamente
      'Content-Type': 'application/json',
      'accept': 'application/json'
    };
  }
}
