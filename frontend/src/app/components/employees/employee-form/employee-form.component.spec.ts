import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { CompanyService } from 'src/app/service/company.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { DatashareService } from 'src/app/service/datashare.service';
import { of } from 'rxjs';
import { Employee } from 'src/app/model/employee.model';
import { Router } from '@angular/router';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let companyService: CompanyService;
  let employeeService: EmployeeService;
  let datashareService: DatashareService;
  let router: Router;

  let employee: Employee = { 
    id: '1',
    name: 'John', 
    surname: 'Rock',
    email: 'JRock@gmail.com',
    salary: '2800',
    address: 'Test address 1',
    companyId: '0'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'create/', component: EmployeeFormComponent },
          { path: 'edit/', component: EmployeeFormComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    companyService = TestBed.inject(CompanyService);
    employeeService = TestBed.inject(EmployeeService);
    datashareService = TestBed.inject(DatashareService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.createForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.createForm.controls.name.setValue('Testname');
    component.createForm.controls.surname.setValue('Testname');
    component.createForm.controls.email.setValue('test@test.com');
    component.createForm.controls.address.setValue('Test address');
    component.createForm.controls.salary.setValue('123456');
    expect(component.createForm.valid).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.createForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue(' ');
    expect(email.hasError('trimError')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.hasError('pattern')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('name field validity', () => {
    const name = component.createForm.controls.name;
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
    expect(name.valid).toBeFalsy();

    name.setValue(' ');
    expect(name.hasError('trimError')).toBeTruthy();
    expect(name.valid).toBeFalsy();

    name.setValue('Test');
    expect(name.valid).toBeTruthy();
  });

  it('surname field validity', () => {
    const surname = component.createForm.controls.surname;
    expect(surname.valid).toBeFalsy();

    surname.setValue('');
    expect(surname.hasError('required')).toBeTruthy();
    expect(surname.valid).toBeFalsy();

    surname.setValue(' ');
    expect(surname.hasError('trimError')).toBeTruthy();
    expect(surname.valid).toBeFalsy();

    surname.setValue('Test');
    expect(surname.valid).toBeTruthy();
  });

  it('address field validity', () => {
    const address = component.createForm.controls.address;
    expect(address.valid).toBeFalsy();

    address.setValue('');
    expect(address.hasError('required')).toBeTruthy();
    expect(address.valid).toBeFalsy();

    address.setValue(' ');
    expect(address.hasError('trimError')).toBeTruthy();
    expect(address.valid).toBeFalsy();

    address.setValue('Test');
    expect(address.valid).toBeTruthy();
  });

  it('salary field validity', () => {
    const salary = component.createForm.controls.salary;
    expect(salary.valid).toBeFalsy();

    salary.setValue('123456');
    expect(salary.valid).toBeTruthy();
  });

  it('should call getEmployee on init of update form', () => {
    datashareService.setCompanyId(1);
    component.isUserCreate = false;
    fixture.detectChanges();
    spyOn(component, 'getEmployee').and.callThrough();
    spyOn(employeeService, 'getEmployeeById').and.returnValue(of([{}]));
    component.ngOnInit();
    expect(component.getEmployee).toHaveBeenCalled();
    expect(employeeService.getEmployeeById).toHaveBeenCalled();
  });

  it('should not call getEmployee on init of create form', () => {
    component.isUserCreate = true;
    fixture.detectChanges();
    spyOn(component, 'getEmployee').and.callThrough();
    component.ngOnInit();
    expect(component.getEmployee).not.toHaveBeenCalled();
  });

  it('should get employee and set form values', () => {
    spyOn(employeeService, 'getEmployeeById').and.returnValue(of(employee));
    spyOn(component, 'setFormValues').and.callThrough();
    component.getEmployee(1);
    expect(component.setFormValues).toHaveBeenCalled();
    expect(component.createForm.get('name')?.value).toBe('John');
  });

  it('should save employee when form is valid on create form ', () => {
    component.isUserCreate = true;
    component.employee = employee;
    datashareService.setCompanyId(1);
    component.setFormValues();
    fixture.detectChanges();
    spyOn(component, 'saveEmployee');
    spyOn(component, 'updateEmployee');
    component.onSubmit();
    expect(component.saveEmployee).toHaveBeenCalled();
    expect(component.updateEmployee).not.toHaveBeenCalled();
  });

  it('should update employee when form is valid on update form ', () => {
    component.isUserCreate = false;
    component.employee = employee;
    datashareService.setCompanyId(1);
    component.setFormValues();
    fixture.detectChanges();
    spyOn(component, 'saveEmployee');
    spyOn(component, 'updateEmployee');
    component.onSubmit();
    expect(component.saveEmployee).not.toHaveBeenCalled();
    expect(component.updateEmployee).toHaveBeenCalled();
  });

  it('should update employee and redirect to /list', () => {
    component.employee = employee;
    fixture.detectChanges();
    spyOn(employeeService, 'updateEmployee').and.returnValue(of(employee));
    spyOn(router, 'navigate');
    component.updateEmployee();
    expect(employeeService.updateEmployee).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should create employee and redirect to /list', () => {
    component.employee = employee;
    fixture.detectChanges();
    spyOn(employeeService, 'saveEmployee').and.returnValue(of(employee));
    spyOn(router, 'navigate');
    component.saveEmployee();
    expect(employeeService.saveEmployee).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

});