import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry
import { ReportDataService } from '../services/report-data.service';

@NgModule({
  imports: [],
  providers: [ReportDataService] // <-- provide the data service
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    reportDataService: ReportDataService,
  ) {
    entityDataService.registerService('Report', reportDataService); // <-- register it
  }
}