import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardMetrics {
  totalPatients: number;
  totalDentists: number;
  totalAppointments: number;
  activeUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>('http://localhost:8080/dashboard/metrics');
  }
}
