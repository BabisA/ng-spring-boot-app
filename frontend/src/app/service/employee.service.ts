import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.API_URL}/employees`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/employee/${id}`);
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.API_URL}/employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    console.log(employee);
    return this.http.put(`${this.API_URL}/employee/${employee.id}`, employee);
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/employee/${id}`);
  }
}