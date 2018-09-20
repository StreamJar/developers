import { IDocumentationEndpoint} from '@streamjar/frontend-common-core/models';
import { schema } from 'normalizr';

export const endpoint = new schema.Entity('endpoints', {}, { idAttribute: 'name' });

export const group = new schema.Entity('groups', {
	endpoints: [endpoint],
},                                     { idAttribute: 'name' });

export const category = new schema.Entity('categories', {
	groups: [group],
},                                        { idAttribute: 'name' });

export interface IApiDocsState {
	entities: {
		groups: { [key: string]: { name: string; endpoints: string[]} };
		categories: { [key: string]: { name: string; groups: string[] } };
		endpoints: { [key: string]: IDocumentationEndpoint };
	};
	result: string[];
	currentGroup: string | null;
	isFetching: boolean;
	error: Error | null;
}
