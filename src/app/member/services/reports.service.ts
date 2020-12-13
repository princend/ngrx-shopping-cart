import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Report } from 'src/app/model';
import { AppConfig } from 'src/app/share';
import { UtilsService } from '../../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private utils: UtilsService
  ) { }


}
