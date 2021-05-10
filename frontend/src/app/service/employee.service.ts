import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';
import { DatashareService } from './datashare.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private datashareService: DatashareService) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.API_URL}/employees?companyId=${this.datashareService.getCompanyId()}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/employee/${id}?companyId=${this.datashareService.getCompanyId()}`);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.API_URL}/employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.API_URL}/employee/${employee.id}`, employee);
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/employee/${id}`);
  }
}