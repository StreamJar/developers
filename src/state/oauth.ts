import { IOAuthApplication} from '@streamjar/frontend-common-core/models';

export interface IOAuthState {
	clients: IOAuthApplication[];
	status: {
		newClient: { saving: boolean };
		[key: string]: { saving: boolean };
	};
	isFetching: boolean;
	error: Error | null;
}
