import { IDocumentationEndpoint } from '@streamjar/frontend-common-core/models';
import * as React from 'react';

import { EndpointSection } from './endpoint-section';

export interface IEndpointPermissionsProps {
	endpoint: IDocumentationEndpoint;
}

export class EndpointPermissions extends React.PureComponent<IEndpointPermissionsProps> {
	public render(): JSX.Element {
		const { endpoint } = this.props;

		let reason = <p>This endpoint doesn't require authentication or isn't supported via oauth.</p>;

		if (endpoint.scope) {
			reason = <p>This endpoint requires the oauth scope <code>{this.props.endpoint.scope}</code>.</p>;
		}

		return (
			<EndpointSection name="Permissions">
				{reason}
			</EndpointSection>
		);
	}
}
