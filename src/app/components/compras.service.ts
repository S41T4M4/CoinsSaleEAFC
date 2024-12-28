import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompraRequest {
  idUsuario: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private baseUrl = 'https://localhost:7171/api/v1/compras/'; 

  constructor(private http: HttpClient) {}

  comprar(request: CompraRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}comprar`, request, { headers });
  }
}
