import { OAuthAction, OAuthActionTypes } from '../actions/oauth';
import { IOAuthState } from '../state/oauth';

export const defaultOAuthState: IOAuthState  = {
	clients: [],
	status: { newClient: { saving: false }},
	isFetching: false,
	error: null,
};

export function oauth(state: IOAuthState = defaultOAuthState, action: OAuthAction): IOAuthState {
	switch (action.type) {
		case OAuthActionTypes.FETCH_CLIENTS_REQUEST:
			return { ...state, clients: [], isFetching: true, error: null };

		case OAuthActionTypes.FETCH_CLIENTS_SUCCESS:
			const keys: { [key: string]: { saving: boolean } } = {};

			for (const a of action.payload.clients) {
				keys[a.client!] = { saving: false };
			}

			return { ...state, isFetching: false, clients: action.payload.clients, status: {
				...keys,
				newClient: state.status.newClient,
			}};

		case OAuthActionTypes.CREATE_CLIENT_REQUEST:
			return { ...state, status: { ...state.status, newClient: { saving: true } } };

		case OAuthActionTypes.CREATE_CLIENT_SUCCESS:
			return { ...state, clients: [...state.clients, action.payload.app], status: {
				...state.status,
				newClient: { saving: false },
				[action.payload.app.client!]: { saving: false },
			} };

		case OAuthActionTypes.UPDATE_CLIENT_REQUEST:
			return { ...state, status: { ...state.status, [action.payload.app.client!]: { saving: true } } };

		case OAuthActionTypes.UPDATE_CLIENT_SUCCESS:
			const clients = state.clients.map(i => {
				if (i.client! === action.payload.app.client!) {
					return action.payload.app;
				}

				return i;
			});

			return { ...state, clients: [...clients], status: {
				...state.status,
				[action.payload.app.client!]: { saving: false },
			} };

		case OAuthActionTypes.DELETE_CLIENT_REQUEST:
			return { ...state, status: { ...state.status, [action.payload.app.client!]: { saving: true } } };

		case OAuthActionTypes.DELETE_CLIENT_SUCCESS:
			delete state.status[action.payload.appId]; // tslint:disable-line

			return { ...state, clients: [...state.clients.filter(i => (i.client! !== action.payload.appId))], status: {
				...state.status,
			} };
		}

	return state;
}
