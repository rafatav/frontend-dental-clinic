import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private loginService : AuthService, 
              private router : Router) {
  }

  logout() {
    this.router.navigate(['login'])
    this.loginService.logout();
  }
}
