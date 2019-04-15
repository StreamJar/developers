import { IDocumentationParam } from '@streamjar/frontend-common-core/models';
import * as React from 'react';

import * as styles from './endpoint-params.scss';
import { EndpointSection } from './endpoint-section';

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
				{params.map(param => this.getTableRow(param))}
			</EndpointSection>
		);
	}

	private getTableRow(parameter: IDocumentationParam): JSX.Element {
		const values = parameter.values ? (
			<div className="layout-row layout-align-start-center">
				<p className={styles.paramValues}> Values:</p>
				{parameter.values.map(val => <div className={styles.paramValue} key={val}>{val}</div>)}
			</div>
		) : null;

		const defaultVal = parameter.defaultValue ? (
			<div className="layout-row layout-align-start-center">
				<p className={styles.paramValues}> Default: </p>
				<div style={{ paddingLeft: 5 }}> {parameter.defaultValue} </div>
			</div>
		) : null;

		return (
			<div className={styles.param} key={parameter.name}>
				<div className="layout-row layout-align-between-center">
					<div className="layout-row layout-align-start-center">
						<code className={styles.paramName}> {parameter.name} </code>
						{!parameter.optional && <p className={styles.paramRequired}>REQUIRED</p>}
					</div>
					<div className="jar-tag">{parameter.kind}</div>
				</div>

				{defaultVal}
				{values}

				<p className={styles.paramDescription}>{parameter.description}</p>
			</div>
		);
	}
}
