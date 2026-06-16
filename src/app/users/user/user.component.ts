import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  
  users = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'lastLogin', 'active', 'actions'];
  userFiltered: string = '';

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private service: UserService,
              private dialog: MatDialog) {
  }

  loadUsers(page: number, size: number): void {
    this.service.getAll(page, size, this.userFiltered).subscribe(userList => {
      this.users.data = userList.content; 
      this.totalElements = userList.totalElements; 
    });
  }

  ngOnInit(): void {
    this.loadUsers(this.pageIndex, this.pageSize);
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers(this.pageIndex, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.pageIndex, this.pageSize);
  }

  stageDelete(user: User) {
    if (confirm(`Deseja realmente excluir o usuário ${user.name}?`)) {
      this.service.delete(user.id).subscribe({
        next: () => this.loadUsers(this.pageIndex, this.pageSize),
        error: err => console.error("Erro ao deletar: ", err)
      });
    }
  }

  filter() {
    this.pageIndex = 0;
    this.loadUsers(this.pageIndex, this.pageSize);
  }
}
