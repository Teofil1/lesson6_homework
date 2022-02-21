import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://reqres.in/api/users?page=1');
  }

  addUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>('https://reqres.in/api/users', newUser);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>('https://reqres.in/api/users/' + user.id, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.httpClient.delete<User>('https://fakestoreapi.com/users/' + user.id);
  }

}
