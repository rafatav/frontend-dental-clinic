import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dentist } from '../dentist';
import { DentistService } from '../dentist.service';

@Component({
  selector: 'app-dentist-dialog',
  standalone: false,
  templateUrl: './dentist-dialog.component.html',
  styleUrl: './dentist-dialog.component.scss'
})
export class DentistDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder,
              private service: DentistService,
              private dialogRef: MatDialogRef<DentistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dentist
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.formBuilder.group({
      id: [this.data?.id || null],
      name: [this.data?.name || '', [Validators.required]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      cro: [this.data?.cro || '', [Validators.required]],
      createdAt: [this.data?.createdAt ?? new Date().toISOString()],
      active: [this.data?.active ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const dentistData = this.form.value;

    if (this.isEditMode) {
      this.service.update(dentistData.id, dentistData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.service.insert(dentistData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
