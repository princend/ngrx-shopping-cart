import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReportEffects } from './report.effects';

describe('ReportEffects', () => {
  let actions$: Observable<any>;
  let effects: ReportEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReportEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ReportEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
