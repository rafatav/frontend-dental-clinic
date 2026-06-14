import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

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

  constructor(private service : PatientService) {
  }


  ngOnInit(): void {
    this.service.getAll().subscribe(patientsList => this.patients = patientsList);
  }

  stageUpdate(id: string) {
    console.log(id);
  }

  stageDelete(patient: Patient) {
    console.log(patient);
  }

  deleteObject(patient: Patient) {
    console.log(patient);
  }

  filter() {
    this.service.filter(this.patientFiltered).subscribe(
      {
        next: (patientFiltered) => this.patients = patientFiltered,
        error: error => console.error("Ocorreu um erro: ", error)
      }
    )
  }

  insert() {
  }
}
