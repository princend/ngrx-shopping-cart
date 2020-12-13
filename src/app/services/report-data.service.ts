
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Report } from '../model';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })
export class ReportDataService extends DefaultDataService<Report> {
  constructor(http: HttpClient, httpUrl: HttpUrlGenerator, private utils: UtilsService) {
    super('Report', http, httpUrl);
  }
  getAll(): Observable<Report[]> {
    const token = this.utils.getToken()
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const urlPath = this.httpUrlGenerator.collectionResource('Report', '');
    return this.http.get(urlPath, httpOptions).pipe(
      map(e=>e['payload'])
    ) as any;
  }
}