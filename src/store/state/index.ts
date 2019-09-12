import { IApiDocsState } from './api-docs';
import { IOAuthState } from './oauth';

export interface IState {
	apiDocs: IApiDocsState;
	oauth: IOAuthState;
}
