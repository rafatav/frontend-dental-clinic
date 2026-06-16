import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardMetrics } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  metrics: DashboardMetrics = {
    totalPatients: 0,
    totalDentists: 0,
    totalAppointments: 0,
    activeUsers: 0
  };

  isLoading = true;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar métricas', err);
        this.isLoading = false;
      }
    });
  }
}
