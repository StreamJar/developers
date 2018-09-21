import { IDocumentationResponse } from '@streamjar/frontend-common-core/models';
import { Tab, Tabs } from '@streamjar/ui-react';
import * as React from 'react';
import ReactJson from 'react-json-view';

import * as styles from './endpoint-responses.scss';
import { EndpointSection } from './endpoint-section';

export interface IEndpointResponsesProps {
	responses: IDocumentationResponse[];
}

export interface IEndpointResponsesState {
	currentTab: number;
}

export class EndpointResponses extends React.PureComponent<IEndpointResponsesProps, IEndpointResponsesState> {

	constructor(props: IEndpointResponsesProps) {
		super(props);

		this.selectTab = this.selectTab.bind(this);

		this.state = { currentTab: this.props.responses[0].statusCode };
	}

	public componentDidUpdate(prev: IEndpointResponsesProps): void {
		if (prev.responses[0].statusCode !== this.props.responses[0].statusCode) {
			this.setState({ currentTab: this.props.responses[0].statusCode });
		}
	}

	public selectTab(value: number): void {
		this.setState({
			currentTab: value,
		});
	}

	public render(): JSX.Element {
		const { responses } = this.props;
		const { currentTab } = this.state;

		let body = responses
			.find(response => response.statusCode === currentTab);

		if (!body) {
			body = responses[0];
		}

		if (!responses.length) {
			return <React.Fragment />;
		}

		let output = <ReactJson src={body.body} name={null} theme="monokai" />;

		if (!body.body) {
			output = <p className="noResponse"> No Response </p>;
		}

		return (
			<EndpointSection name="Responses">
				<Tabs value={currentTab} onChange={this.selectTab}>
					{this.getTabs()}
				</Tabs>

				<div className={styles.endpointResponses}>
					{output}
				</div>
			</EndpointSection>
		);
	}

	private getTabs(): JSX.Element[] {
		return this.props.responses
			.map(tab => {
				return (
					<Tab key={tab.statusCode} value={tab.statusCode}>
						{tab.statusCode}
					</Tab>
				);
			});
	}
}
