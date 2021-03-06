import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { epics as apiDocsEpics } from './api-docs';
import { epics as oauthEpics } from './oauth';

export const rootEpics = combineEpics(
	...apiDocsEpics,
	...oauthEpics,
);

export const epics = createEpicMiddleware();
