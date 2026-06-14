import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit{
  
  patients: Patient[] = [];
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'phoneNumber', 'actions'];
  patientFiltered: string = '';

  constructor(private service : PatientService,
              private dialog : MatDialog
  ) {
  }

  loadPatients(): void {
    this.service.getAll().subscribe(patientsList => this.patients = patientsList);
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  openDialog(patient?: Patient): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '450px',
      data: patient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPatients();
      }
    })
  }

  stageDelete(patient: Patient) {
    if (confirm(`Deseja realmente excluir o paciente ${patient.name}?`)) {
      this.service.delete(patient.id).subscribe({
        next: () => this.loadPatients(),
        error: err => console.error("Erro ao deletar: ", err)
      })
    }
  }

  filter() {
    this.service.filter(this.patientFiltered).subscribe(
      {
        next: (patientFiltered) => this.patients = patientFiltered,
        error: error => console.error("Ocorreu um erro: ", error)
      }
    )
  }
}
