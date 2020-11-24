import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

// TODO router step1
// create "[router] go" Action, payload is {payload:Route}
// export const sampleAction = createAction(
//   '[source] event',
//   props<{ data: any }>()
// );
export const go = createAction('[router] go', props<{ route: Route }>());

// TODO router step2
// create "[router] back" Action
export const back = createAction('[router] back');

// TODO router step3
// create "[router] forward" Action
export const forward = createAction('[router] forward');

export interface Route {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
