import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-dialog',
  standalone: false,
  templateUrl: './patient-dialog.component.html',
  styleUrl: './patient-dialog.component.scss'
})
export class PatientDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(private formBuilder : FormBuilder,
              private service : PatientService,
              private dialogRef : MatDialogRef<PatientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : Patient
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.formBuilder.group({
      id: [this.data?.id || null],
      name: [this.data?.name || '', [Validators.required]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [this.data?.phoneNumber || '', [Validators.required]],
      createdAt: [this.data?.createdAt ?? new Date().toISOString()]
    });
  }
  save(): void {
    if (this.form.invalid) return;

    const patientData = this.form.value;

    if (this.isEditMode) {
      this.service.update(patientData.id, patientData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.service.insert(patientData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
