import { normalize } from 'normalizr';

import { category } from './../state/api-docs';
import { IApiDocsState } from '../state/api-docs';
import { ApiDocActionTypes, ApiDocAction } from '../actions/api-doc';

export const defaultApiDocsState: IApiDocsState  = {
	entities: {
		groups: {},
		categories: {},
		endpoints: {},
	},
	result: [],
	currentGroup: null,
	isFetching: false,
	error: null,
};

export function apiDocs(state: IApiDocsState = defaultApiDocsState, action: ApiDocAction): IApiDocsState {
	switch (action.type) {
		case ApiDocActionTypes.FETCH_DOCS_REQUEST:
			return { ...state, entities: { groups: {}, categories: {}, endpoints: {} }, result: [], isFetching: true, error: null };

		case ApiDocActionTypes.FETCH_DOCS_SUCCESS:
			return { ...state, isFetching: false, ...normalize(action.payload.docs, [category])};
		}

	return state;
}
