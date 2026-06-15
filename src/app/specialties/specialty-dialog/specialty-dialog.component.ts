import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Specialty } from '../specialty';
import { SpecialtyService } from '../specialty.service';

@Component({
  selector: 'app-specialty-dialog',
  standalone: false,
  templateUrl: './specialty-dialog.component.html',
  styleUrl: './specialty-dialog.component.scss'
})
export class SpecialtyDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder,
              private service: SpecialtyService,
              private dialogRef: MatDialogRef<SpecialtyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Specialty
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.formBuilder.group({
      id: [this.data?.id || null],
      name: [this.data?.name || '', [Validators.required]]
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const specialtyData = this.form.value;

    if (this.isEditMode) {
      this.service.update(specialtyData.id, specialtyData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.service.insert(specialtyData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}