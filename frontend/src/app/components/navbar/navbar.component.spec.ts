import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let companyService: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        HttpClientModule,
        MatMenuModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    companyService = TestBed.inject(CompanyService);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default salary info', () => {
    expect(fixture.nativeElement.querySelector('#salary').textContent).toContain('Average Salary: $ 0');
  });

  it('should have default company text', () => {
    expect(fixture.nativeElement.querySelector('#btnMenu').textContent).toContain('Select Company');
  });

  it('should call getCompanies on init', () => {
    spyOn(component, 'getCompanies');
    component.ngOnInit();
    expect(component.getCompanies).toHaveBeenCalled();
  });

  it('should update the company on new company selection', () => {
    spyOn(component, 'onCompanySelect').and.callThrough();
    spyOn(component, 'getCompanyAvgSalary').and.callThrough();
    spyOn(companyService, 'getCompanyAverageSalary').and.returnValue(of(2500));
    component.onCompanySelect({ id: '2', name: 'Company 2' });
    fixture.detectChanges();
    expect(component.onCompanySelect).toHaveBeenCalledWith({ id: '2', name: 'Company 2' });
    expect(component.getCompanyAvgSalary).toHaveBeenCalled();
    expect(companyService.getCompanyAverageSalary).toHaveBeenCalled();
    expect(component.datashareService.getCompanyId()).toBe(2);
    expect(component.companyName).toBe('Company 2');
  });

  it('should not update info if same company is selcted', () => {
    component.datashareService.setCompanyId(2);
    spyOn(component, 'onCompanySelect');
    spyOn(component, 'getCompanyAvgSalary');
    component.onCompanySelect({ id: '2', name: 'Company 2' });
    fixture.detectChanges();
    expect(component.onCompanySelect).toHaveBeenCalledWith({ id: '2', name: 'Company 2' });
    expect(component.getCompanyAvgSalary).not.toHaveBeenCalled();
  });
});
