import { TestBed } from '@angular/core/testing';

import { DatashareService } from './datashare.service';

describe('DatashareService', () => {
  let service: DatashareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatashareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit on setting company id', () => {
    spyOn(service.companyIdUpdated, 'emit');
    service.setCompanyId(1);
    expect(service.companyIdUpdated.emit).toHaveBeenCalled();
    expect(service.companyIdUpdated.emit).toHaveBeenCalledWith(1);
  });

  it('should set and get company id', () => {
    service.setCompanyId(2);
    expect(service.getCompanyId()).toBe(2);
  });
});
