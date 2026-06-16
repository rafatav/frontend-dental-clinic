import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty, Page } from './specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private readonly API_URL = 'http://localhost:8080/specialties';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, filter: string = '') : Observable<Page<Specialty>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (filter) {
      params = params.set('name', filter); 
    }

    return this.http.get<Page<Specialty>>(this.API_URL, { params });
  }

  filter(name: string, page: number = 0, size: number = 10) : Observable<Page<Specialty>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    
    return this.http.get<Page<Specialty>>(this.API_URL, { params });
  }

  insert(specialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(this.API_URL, specialty);
  }

  update(id: number | undefined, specialty: Specialty): Observable<Specialty> {
    return this.http.put<Specialty>(`${this.API_URL}/${id}`, specialty);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
