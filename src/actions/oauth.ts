import { IOAuthApplication } from '@streamjar/frontend-common-core/models';

import { action, ActionsUnion } from '../util/helpers';

export enum OAuthActionTypes {
	FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS',
	FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS',
	FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE',

	CREATE_CLIENT_REQUEST = 'CREATE_CLIENT',
	CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS',
	UPDATE_CLIENT_REQUEST = 'UPDATE_CLIENT',
	UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS',
	DELETE_CLIENT_REQUEST = 'DELETE_CLIENT',
	DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS',
}

export const OAuthAction = {
	fetchClientsRequest: () => action(OAuthActionTypes.FETCH_CLIENTS_REQUEST),
	fetchClientsSuccess: (clients: IOAuthApplication[]) => action(OAuthActionTypes.FETCH_CLIENTS_SUCCESS, { clients }),
	fetchClientsFailure: (error: Error) => action(OAuthActionTypes.FETCH_CLIENTS_FAILURE, { error }),

	createClientRequest: (app: IOAuthApplication) => action(OAuthActionTypes.CREATE_CLIENT_REQUEST, { app }),
	createClientSuccess: (app: IOAuthApplication) => action(OAuthActionTypes.CREATE_CLIENT_SUCCESS, { app }),

	modifyClientRequest: (app: IOAuthApplication) => action(OAuthActionTypes.UPDATE_CLIENT_REQUEST, { app }),
	modifyClientSuccess: (app: IOAuthApplication) => action(OAuthActionTypes.UPDATE_CLIENT_SUCCESS, { app }),

	deleteClientRequest: (app: IOAuthApplication) => action(OAuthActionTypes.DELETE_CLIENT_REQUEST, { app }),
	deleteClientSuccess: (appId: string) => action(OAuthActionTypes.DELETE_CLIENT_SUCCESS, { appId }),
};

export type OAuthAction = ActionsUnion<typeof OAuthAction>;
