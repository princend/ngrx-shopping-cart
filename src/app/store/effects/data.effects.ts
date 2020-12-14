import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import {
    tap,
    filter,
    map,
    distinctUntilChanged,
    switchMap
} from "rxjs/operators";
import {
    ofEntityOp,
    EntityAction,
    OP_SUCCESS,
    EntityOp,
    ofEntityType
} from "@ngrx/data";
import { of } from "rxjs";
import { EntityCacheDispatcher } from "@ngrx/data";

import {
    EntityActionFactory,
    EntityActionOptions,
    MergeStrategy
} from "@ngrx/data";
import { AppState } from "..";
import { ReportDataService } from "src/app/services/report-data.service";


export interface State {
    entityCache: {};
}

@Injectable()
export class RootEffects {
    constructor(
        private actions$: Actions,
        private reportDataService:ReportDataService
    ) {
    }

    removeAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofEntityType("Report"),
            ofEntityOp([EntityOp.REMOVE_ALL]),
            // tap(a => console.log("Effect lol", a)),
            map(action => {
                this.reportDataService.removeAll().subscribe();
                return action
            })
        );
    },{ dispatch: false });
}
