import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardMetrics } from '../dashboard.service';
import { AppointmentService } from '../../appointments/appointment.service';
import { Appointment } from '../../appointments/appointment';

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

  recentAppointments: Appointment[] = [];
  
  isAdmin: boolean = false; 
  isLoading = true;

  constructor(private service: DashboardService,
              private appointmentService: AppointmentService
  ) {}

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
    this.appointmentService.getAll(0, 5, '').subscribe({
      next: (page) => {
        this.recentAppointments = page.content.sort((a, b) => 
          new Date(b.startTime || '').getTime() - new Date(a.startTime || '').getTime()
        );
      },
      error: (err) => console.error('Erro ao carregar consultas', err)
    });
    const userRole = localStorage.getItem('user_role');
    this.isAdmin = userRole?.includes('ROLE_ADMIN') ?? false;
  }
}