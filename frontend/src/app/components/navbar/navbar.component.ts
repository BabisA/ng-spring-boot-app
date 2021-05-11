import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { DatashareService } from 'src/app/service/datashare.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  companies: Company[] = [];
  companyName: String = 'Select Company';
  companyId: Number = 0;
  companyAvgSalary: String = '0';

  constructor(
    private companyService: CompanyService,
    public datashareService: DatashareService) { }

  ngOnInit(): void {
    this.retrieveCompanies();
  }

  retrieveCompanies(): void {
    this.companyService.getAll()
      .subscribe(
        (data: Company[]) => {
          this.companies = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  getCompanyAvgSalary(): void {
    this.companyService
      .getCompanyAverageSalary(String(this.datashareService.getCompanyId()))
      .subscribe(
        (data: String) => {
          this.companyAvgSalary = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  onCompanySelect(event: any): void {
    if (this.datashareService.getCompanyId() === Number(event.target.dataset.id)) {
      return
    }
    this.companyName = event.target.dataset.name;
    this.datashareService.setCompanyId(Number(event.target.dataset.id));
    this.getCompanyAvgSalary();
  }
}
