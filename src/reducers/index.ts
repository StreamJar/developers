import { combineReducers } from 'redux';

import { apiDocs } from './api-docs';
import { oauth } from './oauth';

export const root = combineReducers({
	apiDocs,
	oauth,
});
