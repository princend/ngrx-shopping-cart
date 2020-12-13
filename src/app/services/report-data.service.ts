
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Report } from '../model';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })
export class ReportDataService extends DefaultDataService<Report> {
  token
  httpOptions
  constructor(http: HttpClient, httpUrl: HttpUrlGenerator, private utils: UtilsService) {
    super('Report', http, httpUrl);
    this.token = this.utils.getToken()
    this.httpOptions = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };
  }
  getAll(): Observable<Report[]> {
    // const token = this.utils.getToken()
    // const httpOptions = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    const urlPath = this.httpUrlGenerator.collectionResource('Report', '');
    return this.http.get(urlPath, this.httpOptions).pipe(
      map(e => e['payload'])
    ) as any;
  }

  add(request: Report): Observable<Report> {
    const urlPath = this.httpUrlGenerator.entityResource('Report', '') + '/addReport';
    return this.http.post(urlPath, request, this.httpOptions).pipe(map(e => e['payload'])) as any;
  }


  delete(key: string): Observable<number> {
    const urlPath = this.httpUrlGenerator.entityResource('Report', '') + `/removeReport?id=${key}`;
    return this.http.delete(urlPath, this.httpOptions).pipe(map(e => e['payload'])) as any;
  }

  removeAll(): Observable<any> {

    const urlPath = this.httpUrlGenerator.entityResource('Report', '') + `/removeAll`;
    return this.http.delete(urlPath, this.httpOptions).pipe(map(e => e['payload'])) as any;
  }
}