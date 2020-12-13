import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { sortByTitle } from './store/reducers/report.reducer';

const entityMetadata: EntityMetadataMap = {
  Report: {
    sortComparer: sortByTitle
  }
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
