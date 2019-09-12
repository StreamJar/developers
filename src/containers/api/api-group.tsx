import { IDocumentationEndpoint } from '@streamjar/frontend-common-core/models';
import { Button, Icon } from '@streamjar/ui-react';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IState } from '../../store/state';
import * as styles from './api-group.scss';

export interface IApiGroupOwnProps {
	match: {
		params: {
			category: string;
			group: string;
		};
	};
}

export interface IApiGroupProps {
	category: { name: string; groups: string[] };
	group: { name: string; endpoints: string[]; subGroup: string | null };
	endpoints: IDocumentationEndpoint[];
}

export type ApiGroupProps = IApiGroupProps & IApiGroupOwnProps;

class ApiGroupComponent extends React.Component<ApiGroupProps> {
	public render() {
		const { category, group } = this.props;

		const ep = this.props.endpoints.map(i => (
			<div key={i.name} className={`${styles.apiEndpoint} layout-column`}>
				<h4> {i.internal ? (<><Icon icon="vpn_key" /> &nbsp; </>) : null} {i.name} </h4>
				<ReactMarkdown source={i.description} />
				<div className="layout-row layout-align-end-center">
					<Link to={`/api/${category.name}/${group.name}/${i.name}`}><Button raised={true}> View Endpoint </Button></Link>
				</div>
			</div>
		));

		return (
			<React.Fragment>
				<h3 style={{ paddingLeft: 20 }}> {category.name} / {group.subGroup && `${group.subGroup} /`} {group.name} </h3>
				{ep}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IApiGroupOwnProps): IApiGroupProps {
	if (!state.apiDocs.entities.groups[props.match.params.group]) {
		return {
			endpoints: [],
			group: { name: '', endpoints: [], subGroup: null },
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
