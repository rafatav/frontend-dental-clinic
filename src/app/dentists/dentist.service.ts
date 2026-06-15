import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dentist, Page } from './dentist';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  private readonly API_URL = 'http://localhost:8080/dentists';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, filter: string = '') : Observable<Page<Dentist>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (filter) {
      params = params.set('name', filter); 
    }

    return this.http.get<Page<Dentist>>(this.API_URL, { params });
  }

  insert(dentist: Dentist): Observable<Dentist> {
    return this.http.post<Dentist>(this.API_URL, dentist);
  }

  update(id: number | undefined, dentist: Dentist): Observable<Dentist> {
    return this.http.put<Dentist>(`${this.API_URL}/${id}`, dentist);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
