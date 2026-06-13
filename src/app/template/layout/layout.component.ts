import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  isAdmin: boolean = false;

  constructor(private loginService : AuthService, 
              private router : Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.router.navigate(['login'])
    this.loginService.logout();
  }
}
