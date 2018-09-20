import * as React from 'react';
import { IDocumentationParam } from '@streamjar/frontend-common-core/models';

import { EndpointSection } from './endpoint-section';

import * as styles from './endpoint-params.scss';

export interface IEndpointParamsProps {
	name: string;
	params: IDocumentationParam[];
}

export class EndpointParams extends React.PureComponent<IEndpointParamsProps> {
	public render(): JSX.Element {
		const { name, params } = this.props;

		if (!params.length) {
			return <React.Fragment />;
		}

		return (
			<EndpointSection name={name}>
				<table className={styles.endpointParams}>
					<tbody>
						{params.map(param => this.getTableRow(param))}
					</tbody>
				</table>
			</EndpointSection>
		);
	}

	private getTableRow(parameter: IDocumentationParam): JSX.Element {
		return (
			<tr key={parameter.key}>
				<td style={{ width: '20%', paddingRight: 15 }}> {`\{${parameter.key}\}`} </td>
				<td> {parameter.description} </td>
				<td style={{ width: '15%', paddingLeft: 15 }}> {parameter.value.type} </td>
			</tr>
		);
	}
}
