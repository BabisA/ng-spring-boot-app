import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:8080';
  const dummyCompanies = [
    { id: '1', name: 'Company 1' },
    { id: '2', name: 'Company 2' },
    { id: '3', name: 'Company 3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [CompanyService]
    });

    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the employees', () => {
    service.getAll().subscribe((data: any) => {
      expect(data.length).toBe(3);
      expect(data).toBe(dummyCompanies);
    });

    const req = httpMock.expectOne(`${API_URL}/companies`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(dummyCompanies);

    httpMock.verify();
  });

  it('should get company average salary', () => {
    const companyAvgSalary = '2900';

    service.getCompanyAverageSalary('1').subscribe((data: any) => {
      expect(data).toBe(companyAvgSalary);
    });

    const req = httpMock.expectOne(`${API_URL}/company/avg/1`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush(companyAvgSalary);

    httpMock.verify();
  });
});
