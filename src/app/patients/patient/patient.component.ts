import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit{
  
  patients = new MatTableDataSource<Patient>([]);
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'phoneNumber', 'actions'];
  patientFiltered: string = '';

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private service : PatientService,
              private dialog : MatDialog
  ) {
  }

  loadPatients(page: number, size: number): void {
    this.service.getAll(page, size, this.patientFiltered).subscribe(patientList => {
      this.patients.data = patientList.content; 
      this.totalElements = patientList.totalElements; 
    });
  }

  ngOnInit(): void {
    this.loadPatients(this.pageIndex, this.pageSize);
  }

  openDialog(patient?: Patient): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '450px',
      data: patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPatients(this.pageIndex, this.pageSize);
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPatients(this.pageIndex, this.pageSize);
  }

  filter() {
    this.pageIndex = 0;
    this.loadPatients(this.pageIndex, this.pageSize);
  }
}
