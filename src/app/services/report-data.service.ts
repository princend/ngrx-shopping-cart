import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { UtilsService } from '.';
import { Report } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ReportDataService extends DefaultDataService<Report> {
  private token = '';
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    },
  };
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator
    , private utils: UtilsService) {
    super('Report', http, httpUrlGenerator);
    this.token = this.utils.getToken();
    this.httpOptions.headers.Authorization = `Bearer ${this.token}`;
  }
  getAll(): Observable<Report[]> {
    const urlPath = this.httpUrlGenerator.collectionResource('Report', '');
    return this.http.get(urlPath, this.httpOptions) as Observable<any>;
  }
}
