import { EntityActionFactory, EntityActionPayload, EntityOp, MergeStrategy } from "@ngrx/data";
import { Action } from "@ngrx/store";
import { Report } from "src/app/model";

export interface EntityAction<P = any> extends Action {
  readonly type: string;
  readonly payload: EntityActionPayload<P>;
}



export const removeAllAction = new EntityActionFactory().create<Report>(
  'Report',
  EntityOp.REMOVE_ALL,
  null,
  { mergeStrategy: MergeStrategy.PreserveChanges, isOptimistic: true }
);


export const undoManyAction = new EntityActionFactory().create<Report>(
  'Report',
  EntityOp.UNDO_MANY,
  null,
  { mergeStrategy: MergeStrategy.PreserveChanges, isOptimistic: true }
);

