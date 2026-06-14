import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getAll() : Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:8080/patients');
  }

  filter(name: string) : Observable<Patient[]> {
    let par = new HttpParams();

    if (name) {
      par = par.set('name', name);
    }
    
    return this.http.get<Patient[]>('http://localhost:8080/patients', 
      {
        params: par
      }
    )
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
