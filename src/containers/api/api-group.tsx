import * as React from 'react';
import { Button } from '@streamjar/ui-react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import * as ReactMarkdown from 'react-markdown';
import { IState } from '../../state';
import { IDocumentationEndpoint } from '@streamjar/frontend-common-core/models';

export interface IApiGroupOwnProps {
	match: {
		params: {
			category: string;
			group: string;
		};
	};
}

export interface IApiGroupProps extends IApiGroupOwnProps {
	category: { name: string; groups: string[] };
	group: { name: string; endpoints: string[] };
	endpoints: IDocumentationEndpoint[];
}

import * as styles from './api-group.scss';

class ApiGroupComponent extends React.Component<IApiGroupProps> {
	public render() {
		const { category, group } = this.props;

		const ep = this.props.endpoints.map(i => (
			<div key={i.name} className={`${styles.apiEndpoint} layout-column`}>
				<h4> {i.name} </h4>
				<ReactMarkdown source={i.description} />
				<div className="layout-row layout-align-end-center">
					<Link to={`/api/${category.name}/${group.name}/${i.name}`}><Button raised={true}> View Endpoint </Button></Link>
				</div>
			</div>
		));

		return (
			<React.Fragment>
				<h3 style={{ paddingLeft: 20 }}> {category.name} / {group.name} </h3>
				{ep}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IApiGroupOwnProps): Partial<IApiGroupProps> {
	if (!state.apiDocs.entities.groups[props.match.params.group]) {
		return {
			endpoints: [],
			group: { name: '', endpoints: [] },
			category: { name: '', groups: [] },
		};
	}

	return {
		endpoints: state.apiDocs.entities.groups[props.match.params.group].endpoints.map(i => state.apiDocs.entities.endpoints[i]),
		group: state.apiDocs.entities.groups[props.match.params.group],
		category: state.apiDocs.entities.categories[props.match.params.category],
	};
}

export default connect(mapStateToProps)(ApiGroupComponent);