import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  companyName: String = 'Select Company'
  companyId: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService, 
    private router: Router,
    public datashare: DatashareService) { }

  ngOnInit(): void {
    this.retrieveCompanies();
  }

  retrieveCompanies(): void {
    this.companyService.getAll()
      .subscribe(
        data => {
          this.companies = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onCompanySelect(event: any): void {
    if (this.datashare.getCompanyId() === Number(event.target.dataset.id)) { 
      return 
    }
    this.companyName = event.target.dataset.name;
    this.datashare.setCompanyId(Number(event.target.dataset.id));
  }

}
