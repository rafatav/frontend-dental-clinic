import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { Page } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, filter: string = '') : Observable<Page<Patient>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (filter) {
      params = params.set('name', filter); 
    }

    return this.http.get<Page<Patient>>('http://localhost:8080/patients', { params });
  }

  filter(name: string, page: number = 0, size: number = 10) : Observable<Page<Patient>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    
    return this.http.get<Page<Patient>>('http://localhost:8080/patients', { params });
  }

  insert(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>('http://localhost:8080/patients', patient);
  }

  update(id: number | undefined, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`http://localhost:8080/patients/${id}`, patient);
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/patients/${id}`);
  }
}
