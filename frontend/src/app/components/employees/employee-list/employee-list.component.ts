import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatashareService } from 'src/app/service/datashare.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  displayedColumns = ['name', 'surname', 'email', 'address', 'salary', 'actions'];

  constructor(
    private route: ActivatedRoute, 
    private employeeService: EmployeeService,
    private datashareService: DatashareService) { }

  ngOnInit(): void {
    if (this.datashareService.getCompanyId()) {
      this.getEmployees();
    }
    
    this.datashareService.companyIdUpdated.subscribe(
      () => {
        this.getEmployees();
        console.log(this.datashareService.getCompanyId())
      }
    )
  }

  getEmployees(): void {
    this.employeeService.getAll()
      .subscribe(
        data => {
          this.employees = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployeeById(id).subscribe(
      () => {
        this.getEmployees();
      },
      error => {
        console.log(error);
      });
  }
}
