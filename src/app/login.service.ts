import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7171/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginViewModel = { email, password };
  
    return this.http.post<any>(this.apiUrl, loginViewModel).pipe(
      tap(response => {
        if (response.token && response.token.token) {  
          localStorage.setItem('token', response.token.token);  
        }
        if (response.role) {
          localStorage.setItem('role', response.role);
        }
      })
    );
  }
  getUserById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decodedToken: any = jwtDecode(token); 
      const currentTime = Math.floor(Date.now() / 1000);
  
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }
  
}
