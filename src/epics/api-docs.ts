import { IState } from './../state/index';
import { ApiDocAction, ApiDocActionTypes } from './../actions/api-doc';
import { Epic, ofType } from 'redux-observable';
import { getApi } from '../util/ApiHelper';
import { ApiDocs } from '@streamjar/frontend-common-core/models';
import { map, switchMap, delay } from 'rxjs/operators';

export const epics: Epic<ApiDocAction, ApiDocAction, IState>[] = [
	(action$, state$) => action$.pipe(
		ofType(ApiDocActionTypes.FETCH_DOCS_REQUEST),
		switchMap(() => getApi(ApiDocs).getDocumentation()),
		map(value => ApiDocAction.fetchDocsSuccess(value)),
	),
];
