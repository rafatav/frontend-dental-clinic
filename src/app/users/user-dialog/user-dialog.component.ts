import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Role } from '../user'; 
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-user-dialog',
  standalone: false,
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss' 
})
export class UserDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  availableRoles = [
    { id: 1, authority: 'ROLE_ADMIN', label: 'Administrador' },
    { id: 2, authority: 'ROLE_DENTIST', label: 'Dentista / Profissional' }
  ];

  constructor(private formBuilder: FormBuilder,
              private service: UserService,
              private dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    const currentRoles = this.data?.roles?.map(r => r.authority) || [];

    this.form = this.formBuilder.group({
      id: [this.data?.id || null],
      name: [this.data?.name || '', [Validators.required]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      password: [this.data?.password || '', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      createdAt: [this.data?.createdAt ?? new Date().toISOString()],
      lastLogin: [this.data?.lastLogin || null], 
      active: [this.data?.active ?? true],
      selectedRoles: [currentRoles, [Validators.required]] 
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const rawValues = this.form.value;

    const formattedRoles: Role[] = rawValues.selectedRoles.map((authString: string) => {
      const match = this.availableRoles.find(r => r.authority === authString);
      return { id: match ? match.id : 0, authority: authString };
    });

    const userData: User = {
      id: rawValues.id,
      name: rawValues.name,
      cpf: rawValues.cpf,
      email: rawValues.email,
      password: rawValues.password,
      createdAt: rawValues.createdAt,
      lastLogin: rawValues.lastLogin,
      active: rawValues.active,
      roles: formattedRoles
    };

    if (this.isEditMode) {
      this.service.update(userData.id, userData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    } else {
      this.service.insert(userData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error(err)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
