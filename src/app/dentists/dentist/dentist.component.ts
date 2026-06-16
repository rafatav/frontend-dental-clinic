import { Component, OnInit } from '@angular/core';
import { Dentist } from '../dentist';
import { DentistService } from '../dentist.service';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DentistDialogComponent } from '../dentist-dialog/dentist-dialog.component';

@Component({
  selector: 'app-dentist',
  standalone: false,
  templateUrl: './dentist.component.html',
  styleUrl: './dentist.component.scss'
})
export class DentistComponent implements OnInit {
  
  dentists = new MatTableDataSource<Dentist>([]);
  displayedColumns: string[] = ['id', 'name', 'cro', 'cpf', 'active', 'actions'];
  dentistFiltered: string = '';

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private service: DentistService,
              private dialog: MatDialog) {
  }

  loadDentists(page: number, size: number): void {
    this.service.getAll(page, size, this.dentistFiltered).subscribe(dentistList => {
      this.dentists.data = dentistList.content; 
      this.totalElements = dentistList.totalElements; 
    });
  }

  ngOnInit(): void {
    this.loadDentists(this.pageIndex, this.pageSize);
  }

  openDialog(dentist?: Dentist): void {
    const dialogRef = this.dialog.open(DentistDialogComponent, {
      width: '450px',
      data: dentist
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadDentists(this.pageIndex, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDentists(this.pageIndex, this.pageSize);
  }

  filter() {
    this.pageIndex = 0;
    this.loadDentists(this.pageIndex, this.pageSize);
  }
}
