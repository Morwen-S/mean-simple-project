import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    // const urlApi = 'http://localhost:3000/profile/reg'
    const urlApi = 'profile/reg'
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      urlApi,
      user,
      {headers: headers}).pipe(map((response: any) => response));
  }

  authorizationUser(user) {
    // const urlApi = 'http://localhost:3000/profile/auth'
    const urlApi = 'profile/auth'
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      urlApi,
      user,
      {headers: headers}).pipe(map((response: any) => response));
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logoutUser() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

}
