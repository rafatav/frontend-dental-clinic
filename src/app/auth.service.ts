import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../app/auth-reponse.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenUrl = 'http://localhost:8080/oauth2/token';
  private readonly clientId = 'myclientid';
  private readonly clientSecret = 'myclientsecret';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const basicAuth = btoa(`${this.clientId}:${this.clientSecret}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<AuthResponse>(this.tokenUrl, body.toString(), { headers }).pipe(
      tap((response) => {
        this.saveToken(response.access_token);
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.authorities || [];
    } catch (error) {
      return [];
    }
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }
}
