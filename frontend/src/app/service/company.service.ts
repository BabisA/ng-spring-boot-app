import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.API_URL}/companies`);
  }

  getCompanyAverageSalary(id: String): Observable<any> {
    return this.http.get(`${this.API_URL}/company/avg/${id}`);
  }
}
