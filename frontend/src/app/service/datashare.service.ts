import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  companyIdUpdated: EventEmitter<Number> = new EventEmitter();
  
  private companyId: Number = 0;

  constructor() { }

  setCompanyId(id: Number): void {
    this.companyId = id;
    this.companyIdUpdated.emit(this.companyId);
  }

  getCompanyId(): Number {
    return this.companyId;
  }
}
