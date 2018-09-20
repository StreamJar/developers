import { ActionsUnion, action } from './../util/helpers';
import { IDocumentationCategory } from '@streamjar/frontend-common-core/models';

export enum ApiDocActionTypes {
	FETCH_DOCS_REQUEST = 'FETCH_DOCS',
	FETCH_DOCS_SUCCESS = 'FETCH_DOCS_SUCCESS',
	FETCH_DOCS_FAILURE = 'FETCH_DOCS_FAILURE',
}

export const ApiDocAction = {
	fetchDocsRequest: () => action(ApiDocActionTypes.FETCH_DOCS_REQUEST),
	fetchDocsSuccess: (docs: IDocumentationCategory[]) => action(ApiDocActionTypes.FETCH_DOCS_SUCCESS, { docs }),
	fetchDocsFailure: (error: Error) => action(ApiDocActionTypes.FETCH_DOCS_FAILURE, { error }),
};

export type ApiDocAction = ActionsUnion<typeof ApiDocAction>;
