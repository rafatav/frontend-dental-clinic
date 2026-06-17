import { Component, OnInit } from '@angular/core';
import { Appointment, Page } from '../appointment'; 
import { AppointmentService } from '../appointment.service';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  
  appointments = new MatTableDataSource<Appointment>([]);
  displayedColumns: string[] = ['id', 'patient', 'dentist', 'startTime', 'status', 'actions'];
  appointmentFiltered: string = '';

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private service: AppointmentService,
              private dialog: MatDialog) {
  }

  loadAppointments(page: number, size: number): void {
    this.service.getAll(page, size, this.appointmentFiltered).subscribe(pageData => {
      this.appointments.data = pageData.content; 
      this.totalElements = pageData.totalElements; 
    });
  }

  ngOnInit(): void {
    this.loadAppointments(this.pageIndex, this.pageSize);
  }

  openDialog(appointment?: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      data: appointment
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadAppointments(this.pageIndex, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAppointments(this.pageIndex, this.pageSize);
  }

  stageCancel(appointment: Appointment) {
    const reason = prompt(`Deseja cancelar a consulta de ${appointment.patient?.name}? Digite o motivo:`);
    
    if (reason && reason.trim() !== '') {
      this.service.cancel(appointment.id, reason).subscribe({
        next: () => {
          this.loadAppointments(this.pageIndex, this.pageSize);
        },
        error: err => console.error("Erro ao cancelar: ", err)
      });
    } else if (reason === '') {
      alert("O motivo do cancelamento é obrigatório!");
    }
  }

  filter() {
    this.pageIndex = 0;
    this.loadAppointments(this.pageIndex, this.pageSize);
  }
}
