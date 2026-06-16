import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, Page } from './appointment'; 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly API_URL = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, filter: string = '') : Observable<Page<Appointment>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (filter) {
      params = params.set('name', filter); 
    }

    return this.http.get<Page<Appointment>>(this.API_URL, { params });
  }

  insert(appointment: any): Observable<Appointment> {
    return this.http.post<Appointment>(this.API_URL, appointment);
  }

  update(id: number | undefined, appointment: any): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.API_URL}/${id}`, appointment);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  cancel(id: number | undefined, reason: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/cancel`, { reason });
  }
}
