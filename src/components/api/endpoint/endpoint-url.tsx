import { IDocumentationEndpoint } from '@streamjar/frontend-common-core/models';
import { Icon } from '@streamjar/ui-react';
import * as React from 'react';

export interface IEndpointUrlProps {
	endpoint: IDocumentationEndpoint;
}

import * as styles from './endpoint-url.scss';

export class EndpointUrl extends React.PureComponent<IEndpointUrlProps> {
	public render(): JSX.Element {
		const { endpoint } = this.props;

		return (
			<div className={styles.endpointUrl}>
				<Icon icon="lock" />
				<div className={styles.endpointUrl__method}> {endpoint.method} </div>
				{endpoint.url.map(i => this.getPart(i))}
			</div>
		);
	}

	private getPart(part: { type: string; value: string }): JSX.Element {
		return (
			<span key={part.value} className={styles[`endpointUrl__${part.type}`]}>
				{part.value}
			</span>
		);
	}
}
