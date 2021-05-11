import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:8080';
  const dummyEmployees = [
    { id: '1', name: 'John', surname: 'Rock', email: 'JRock@gmail.com', salary: '2800', address: 'Test address 1', companyId: 0 },
    { id: '2', name: 'Maria', surname: 'Hawkins', email: 'MHawk@gmail.com', salary: '2900', address: 'Test address 2', companyId: 0 },
    { id: '3', name: 'John', surname: 'Block', email: 'JBlock@gmail.com', salary: '3150', address: 'Test address 3', companyId: 0 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the correct employee', () => {
    service.getEmployeeById(1).subscribe((data: any) => {
      expect(data).toBe(dummyEmployees[0]);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1?companyId=0`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(dummyEmployees[0]);

    httpMock.verify();
  });

  it('should not find non existent employee', () => {
    service.getEmployeeById(15).subscribe((data: any) => {
      expect(data).toBe(null);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/15?companyId=0`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(null);

    httpMock.verify();
  });

  it('should get all the employees', () => {
    service.getAll().subscribe((data: any) => {
      expect(data.length).toBe(3);
      expect(data).toBe(dummyEmployees);
    });

    const req = httpMock.expectOne(`${API_URL}/employees?companyId=0`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(dummyEmployees);

    httpMock.verify();
  });

  it('should update selected employee', () => {
    const updatedEmployee = {
      id: '1',
      name: 'John',
      surname: 'Rock',
      email: 'newJRock@gmail.com',
      salary: '1111111',
      address: 'Test address 1'
    };
    service.updateEmployee(updatedEmployee).subscribe((data: any) => {
      expect(data).toBe(updatedEmployee);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1`, 'call to api');
    expect(req.request.method).toBe('PUT');

    req.flush(updatedEmployee);

    httpMock.verify();
  });

  it('should delete selected employee', () => {
    const remainingEmployees = [
      { id: '2', name: 'Maria', surname: 'Hawkins', email: 'MHawk@gmail.com', salary: '2900', address: 'Test address 2'},
      { id: '3', name: 'John', surname: 'Block', email: 'JBlock@gmail.com', salary: '3150', address: 'Test address 3'}
    ];

    service.deleteEmployeeById(1).subscribe((data: any) => {
      expect(data).toBe(remainingEmployees);
    });

    const req = httpMock.expectOne(`${API_URL}/employee/1`, 'call to api');
    expect(req.request.method).toBe('DELETE');

    req.flush(remainingEmployees);

    httpMock.verify();
  });
});
