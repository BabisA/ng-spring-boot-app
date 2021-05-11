import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from 'src/app/model/employee.model';
import { DatashareService } from 'src/app/service/datashare.service';
import { EmployeeService } from 'src/app/service/employee.service';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let datashareService: DatashareService;
  let employeeService: EmployeeService;

  let employees: Employee[] = [{ 
    id: '1',
    name: 'John', 
    surname: 'Rock',
    email: 'JRock@gmail.com',
    salary: '2800',
    address: 'Test address 1',
    companyId: '0'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    datashareService = TestBed.inject(DatashareService);
    employeeService = TestBed.inject(EmployeeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployees if company is set', () => {
    datashareService.setCompanyId(1);
    fixture.detectChanges();
    spyOn(component, 'getEmployees').and.callThrough();
    component.ngOnInit();
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should call getEmployees on company id change', () => {
    spyOn(component, 'getEmployees').and.callThrough();
    datashareService.setCompanyId(1);
    fixture.detectChanges();
    expect(component.getEmployees).toHaveBeenCalled();
  });

  it('should call employee service on getEmployees', () => {
    datashareService.setCompanyId(1);
    fixture.detectChanges();
    spyOn(employeeService, 'getAll').and.returnValue(of(employees));
    component.getEmployees();
    expect(employeeService.getAll).toHaveBeenCalled();
    expect(component.employees).toBe(employees);
  });

  it('should delete employee and then get all employees', () => {
    spyOn(employeeService, 'deleteEmployeeById').and.returnValue(of({}));
    spyOn(component, 'getEmployees');
    component.deleteEmployee(1);
    expect(employeeService.deleteEmployeeById).toHaveBeenCalled();
    expect(component.getEmployees).toHaveBeenCalled();
  });
});
