import { combineReducers } from 'redux';

import { apiDocs } from './api-docs';

export const root = combineReducers({
	apiDocs,
});
