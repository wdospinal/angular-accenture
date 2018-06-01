import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Response } from './response';
import { Observable, of } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl = 'https://us-central1-accenture-api.cloudfunctions.net';
  userPath = 'user';
  constructor(private http: HttpClient) { }

  addUser(user: User) {
    const body = JSON.stringify(user);
    const url = `${this.serverUrl}/${this.userPath}`;
    return this.http.post(url, body, httpOptions);
  }

getUser(): Observable <User> {
  const url = `${this.serverUrl}/${this.userPath}`;
  return this.http.get<User>(url, httpOptions);
}
}
