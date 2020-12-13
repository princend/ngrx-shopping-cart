import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
} from '@ngrx/data';
import { combineLatest } from 'rxjs-compat/operator/combineLatest';
import { concatMap, map, merge, mergeAll, tap } from 'rxjs/operators';
import { UtilsService } from '.';
import { Report } from '../model';

@Injectable({ providedIn: 'root' })
export class ReportEntityService extends EntityCollectionServiceBase<Report> {
  token
  httpOptions
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http: HttpClient,
    private httpUrlGenerator: HttpUrlGenerator, private utils: UtilsService) {
    super('Report', serviceElementsFactory);
    this.token = this.utils.getToken()
    this.httpOptions = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };
  }

  removeAll() {
    const urlPath = this.httpUrlGenerator.entityResource('Report', '') + `/removeAll`;
    return this.http.delete(urlPath, this.httpOptions).pipe(
      tap(_ => this.entities$.pipe(tap(e => this.removeManyFromCache(e))).subscribe()),
      map(e => e['payload'])) as any;
  }

}