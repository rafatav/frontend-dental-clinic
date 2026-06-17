import { Component, OnInit } from '@angular/core';
import { Specialty } from '../specialty';
import { SpecialtyService } from '../specialty.service';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SpecialtyDialogComponent } from '../specialty-dialog/specialty-dialog.component';

@Component({
  selector: 'app-specialty',
  standalone: false,
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit {
  
  specialties = new MatTableDataSource<Specialty>([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  specialtyFiltered: string = '';

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private service: SpecialtyService,
              private dialog: MatDialog) {
  }

  loadSpecialties(page: number, size: number): void {
    this.service.getAll(page, size, this.specialtyFiltered).subscribe(specialtyList => {
      this.specialties.data = specialtyList.content; 
      this.totalElements = specialtyList.totalElements; 
    });
  }

  ngOnInit(): void {
    this.loadSpecialties(this.pageIndex, this.pageSize);
  }

  openDialog(specialty?: Specialty): void {
    const dialogRef = this.dialog.open(SpecialtyDialogComponent, {
      width: '450px',
      data: specialty
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadSpecialties(this.pageIndex, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSpecialties(this.pageIndex, this.pageSize);
  }

  filter() {
    this.pageIndex = 0;
    this.loadSpecialties(this.pageIndex, this.pageSize);
  }
}
