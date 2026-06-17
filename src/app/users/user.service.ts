import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Page } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, filter: string = '') : Observable<Page<User>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (filter) {
      params = params.set('name', filter); 
    }

    return this.http.get<Page<User>>(this.API_URL, { params });
  }

  insert(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  update(id: number | undefined, user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${id}`, user);
  }
}
