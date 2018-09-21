import { IDocumentationEndpoint } from '@streamjar/frontend-common-core/models';
import * as React from 'react';
import { connect } from 'react-redux';

import { EndpointParams } from '../../components/api/endpoint/endpoint-params';
import { EndpointPermissions } from '../../components/api/endpoint/endpoint-permissions';
import { EndpointResponses } from '../../components/api/endpoint/endpoint-responses';
import { EndpointUrl } from '../../components/api/endpoint/endpoint-url';
import { IState } from '../../state';
import * as styles from './api-endpoint.scss';

export interface IApiEndpointOwnProps {
	match: {
		params: {
			endpoint: string;
		};
	};
}

export interface IApiEndpointProps extends IApiEndpointOwnProps {
	endpoint: IDocumentationEndpoint | null;
}

class ApiEndpointComponent extends React.Component<IApiEndpointProps> {
	public render() {
		const { endpoint } = this.props;

		if (!endpoint) {
			return <p style={{ opacity: 0.5 }}> Select an endpoint to view </p>;
		}

		return (
			<div className={`${styles.endpoint} layout-column`}>
				<EndpointUrl endpoint={endpoint} />

				<div className={`${styles.endpoint__scroller} flex`}>
					<EndpointParams name="Query Parameters" params={endpoint.urlParams} />
					<EndpointParams name="Body Parameters" params={endpoint.bodyParams} />
					<EndpointPermissions endpoint={endpoint} />
					<EndpointResponses responses={endpoint.responses} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: IState, props: IApiEndpointOwnProps): Partial<IApiEndpointProps> {
	return {
		endpoint: state.apiDocs.entities.endpoints[props.match.params.endpoint],
	};
}

export default connect(mapStateToProps)(ApiEndpointComponent);
