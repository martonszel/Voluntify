import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl2;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(userData: { email: string, password: string, type: string }): Observable<any> {
    console.log(userData);
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<Object>(`${this.baseUrl}/api/user/register`, {
      email: userData.email,
      password: userData.password,
      type: userData.type
    }, { headers });
  }

  login(userData: { email: string, password: string }): void {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');
    this.http.post<Object>(`${this.baseUrl}/api/auth/login`, {
      email: userData.email,
      password: userData.password
    }, { headers })
      .subscribe((data: { token: string, role: string }) => {
        window.localStorage.setItem('token', data.token);
        console.log(data.role);
        if (data.role === '[ROLE_COMPANY]') {
          this.router.navigate(['/comp/main']);
        } else {
          this.router.navigate(['/main']);
        }
      });
  }
}
