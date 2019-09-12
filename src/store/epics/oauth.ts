import { OAuthApplication } from '@streamjar/frontend-common-core/models';
import { Toasts } from '@streamjar/ui-react';
import { Epic, ofType } from 'redux-observable';
import { map, switchMap, tap } from 'rxjs/operators';

import { getApi } from '../../util/ApiHelper';
import { IState } from '../state';
import { OAuthAction, OAuthActionTypes } from './../actions/oauth';

export const epics: Epic<OAuthAction, OAuthAction, IState>[] = [
	action$ => action$.pipe(
		ofType(OAuthActionTypes.FETCH_CLIENTS_REQUEST),
		switchMap(() => getApi(OAuthApplication).getAll()),
		map(value => OAuthAction.fetchClientsSuccess(value)),
	),

	action$ => action$.pipe(
		ofType<OAuthAction, ReturnType<typeof OAuthAction.createClientRequest>>(OAuthActionTypes.CREATE_CLIENT_REQUEST),
		switchMap((action) => getApi(OAuthApplication).create(action.payload.app)),
		tap(() => { Toasts.success('OAuth Application created'); }),
		map(value => OAuthAction.createClientSuccess(value)),
	),

	action$ => action$.pipe(
		ofType<OAuthAction, ReturnType<typeof OAuthAction.modifyClientRequest>>(OAuthActionTypes.UPDATE_CLIENT_REQUEST),
		switchMap((action) => getApi(OAuthApplication).update(action.payload.app, action.payload.app)),
		tap((app) => { Toasts.success(`OAuth Application ${app.name} updated`); }),
		map(value => OAuthAction.modifyClientSuccess(value)),
	),

	action$ => action$.pipe(
		ofType<OAuthAction, ReturnType<typeof OAuthAction.deleteClientRequest>>(OAuthActionTypes.DELETE_CLIENT_REQUEST),
		switchMap((action) => {
			return getApi(OAuthApplication).delete(action.payload.app)
				.pipe(
					tap(() => { Toasts.success(`OAuth Application ${action.payload.app.name} deleted`); }),
					map(() => OAuthAction.deleteClientSuccess(action.payload.app.client!)),
				);
		}),
	),
];
