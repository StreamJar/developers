import { normalize } from 'normalizr';

import { ApiDocAction, ApiDocActionTypes } from '../actions/api-doc';
import { IApiDocsState } from '../state/api-docs';
import { category } from './../state/api-docs';

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
			return { ...state, isFetching: false, ...normalize(action.payload.docs, [category]) };
		}

	return state;
}
