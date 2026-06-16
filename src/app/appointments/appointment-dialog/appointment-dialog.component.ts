import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../appointment'; 
import { AppointmentService } from '../appointment.service';
import { DentistService } from '../../dentists/dentist.service';
import { PatientService } from '../../patients/patient.service';
import { Dentist } from '../../dentists/dentist';
import { Patient } from '../../patients/patient';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-dialog',
  standalone: false,
  templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  
  dentists: Dentist[] = [];
  patients: Patient[] = [];

  backendError: string = '';

  constructor(private formBuilder: FormBuilder,
              private service: AppointmentService,
              private dentistService: DentistService,
              private patientService: PatientService,
              private dialogRef: MatDialogRef<AppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.dentistService.getAll(0, 100).subscribe(res => this.dentists = res.content);

    const formatDateTime = (isoString?: string) => isoString ? isoString.substring(0, 16) : '';

    this.form = this.formBuilder.group({
      id: [this.data?.id || null],
      patientId: [this.data?.patient?.id || '', [Validators.required]], 
      patientSearch: [this.data?.patient || '', [Validators.required]], 
      
      dentistId: [this.data?.dentist?.id || '', [Validators.required]],
      description: [this.data?.description || '', [Validators.required]],
      startTime: [formatDateTime(this.data?.startTime), [Validators.required]],
      endTime: [formatDateTime(this.data?.endTime), [Validators.required]],
      status: [this.data?.status || 'SCHEDULED', [Validators.required]]
    });

    this.form.get('patientSearch')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const filterValue = typeof value === 'string' ? value : value?.name;
        return this.patientService.getAll(0, 10, filterValue || '');
      })
    ).subscribe(res => {
      this.patients = res.content;
    });
  }

  displayPatient(patient: Patient): string {
    return patient && patient.name ? patient.name : '';
  }

  onPatientSelected(patient: Patient) {
    this.form.patchValue({ patientId: patient.id });
  }

  save(): void {
    if (this.form.invalid) return;

    this.backendError = '';

    const rawValues = this.form.value;
    const fixTime = (time: string) => time?.length === 16 ? `${time}:00` : time;

    const payload = {
      id: rawValues.id,
      patient: { id: rawValues.patientId },
      dentist: { id: rawValues.dentistId },
      description: rawValues.description,
      startTime: fixTime(rawValues.startTime),
      endTime: fixTime(rawValues.endTime),
      status: rawValues.status
    };

    if (this.isEditMode) {
      this.service.update(payload.id, payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => this.handleError(err)
      });
    } else {
      this.service.insert(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => this.handleError(err)
      });
    }
  }

  private handleError(err: any): void {
    console.error(err);
    if (err.error && err.error.error) {
      this.backendError = err.error.error; 
    } else {
      this.backendError = 'Ocorreu um erro inesperado ao salvar a consulta.';
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
