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
}
