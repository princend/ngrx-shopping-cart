import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Report } from '../model';

@Injectable({ providedIn: 'root' })
export class ReportEntityService extends EntityCollectionServiceBase<Report> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Report', serviceElementsFactory);
  }
}