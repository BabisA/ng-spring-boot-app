import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { ValidatorHelper } from 'src/app/helpers/validatorHelper';
import { DatashareService } from 'src/app/service/datashare.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  isUserCreate = (this.router.url === '/create');
  employee: Employee = new Employee();
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  title = (this.isUserCreate) ? 'New User' : 'Update User';

  public createForm = this.formBuilder.group({
    name: ['', [Validators.required, ValidatorHelper.cannotBeSpace]],
    surname: ['', [Validators.required, ValidatorHelper.cannotBeSpace]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegx), ValidatorHelper.cannotBeSpace]],
    address: ['', [Validators.required, ValidatorHelper.cannotBeSpace]],
    salary: ['', [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar,
    private datashareService: DatashareService) { }

  ngOnInit(): void {
    if (!this.datashareService.getCompanyId()) {
      this.router.navigate(['/list']);
    }
    if (!this.isUserCreate) {
      this.getEmployee(this.route.snapshot.params.id);
    }

    this.datashareService.companyIdUpdated.subscribe(
      () => {
        this.router.navigate(['/list']);
      }
    )
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (data: Employee) => {
        this.employee = data;
        this.setFormValues();
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar();
      });
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      return;
    }

    // this.employee = this.createForm.value;
    // this.employee.id = this.route.snapshot.params.id || '';
    this.employee.companyId = String(this.datashareService.getCompanyId());
    this.employee.id = this.route.snapshot.params.id;
    this.employee.name = this.createForm.get('name')?.value.trim();
    this.employee.surname = this.createForm.get('surname')?.value.trim();
    this.employee.email = this.createForm.get('email')?.value.trim();
    this.employee.address = this.createForm.get('address')?.value.trim();
    this.employee.salary = this.createForm.get('salary')?.value;

    if (this.isUserCreate) {
      this.saveEmployee();
    } else {
      this.updateEmployee();
    }
  }

  setFormValues(): void {
    this.createForm.setValue({
      name: this.employee.name,
      surname: this.employee.surname,
      email: this.employee.email,
      address: this.employee.address,
      salary: this.employee.salary
    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(
      (data: any) => {
        this.router.navigate(['/list']);
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar();
      });
  }

  saveEmployee(): void {
    this.employeeService.saveEmployee(this.employee).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/list']);
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar();
      });
  }

  openSnackBar(): void {
    this.snackbar.open('Something went wrong!', 'End now', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}