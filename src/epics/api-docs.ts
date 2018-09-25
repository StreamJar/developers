import { ApiDocs } from '@streamjar/frontend-common-core/models';
import { Epic, ofType } from 'redux-observable';
import {  map, switchMap } from 'rxjs/operators';

import { getApi } from '../util/ApiHelper';
import { ApiDocAction, ApiDocActionTypes } from './../actions/api-doc';
import { IState } from './../state/index';

export const epics: Epic<ApiDocAction, ApiDocAction, IState>[] = [
	action$ => action$.pipe(
		ofType<ApiDocAction, ReturnType<typeof ApiDocAction.fetchDocsRequest>>(ApiDocActionTypes.FETCH_DOCS_REQUEST),
		switchMap(() => getApi(ApiDocs).getDocumentation()),
		map(value => ApiDocAction.fetchDocsSuccess(value)),
	),
];
