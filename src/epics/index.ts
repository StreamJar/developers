import { IState } from './../state/index';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { epics as apiDocsEpics } from './api-docs';

export const rootEpics = combineEpics(
	...apiDocsEpics,
	...[],
	...[],
);

export const epics = createEpicMiddleware<any, any, IState>();
