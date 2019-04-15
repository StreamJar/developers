import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IState } from '../../state';

import * as sidebarStyles from '../../components/sidebar.scss';

export interface IApiCategoryOwnProps {
	categoryName: string;
	onClick(): void;
}

export interface IApiCategoryProps {
	category: { name: string; groups: string[] };
	groups: { name: string; endpoints: string[]; internal: boolean }[];
}

export type ApiCategory = IApiCategoryOwnProps & IApiCategoryProps;

class ApiCategoryComponent extends React.Component<ApiCategory> {
	public render() {
		const { categoryName, groups } = this.props;

		return (
			<React.Fragment>
				<h5 className={sidebarStyles.sidebar__title}> {categoryName} </h5>
				{groups.map(i => <Link key={i.name} to={`/api/${categoryName}/${i.name}`}>{this.getButton(i)}</Link>)}
			</React.Fragment>
		);
	}

	private getButton = (i: { name: string; endpoints: string[]; internal: boolean }): JSX.Element => {
		return (
			<Button onClick={this.props.onClick} icon={i.internal ? 'vpn_key' : ''} colour={i.internal ? 'danger' : 'primary'}>
				{i.name}
			</Button>
		);
	}
}

function mapStateToProps(state: IState, props: IApiCategoryOwnProps): IApiCategoryProps {
	return {
		category: state.apiDocs.entities.categories[props.categoryName],
		groups: state.apiDocs.entities.categories[props.categoryName].groups
			.map(i => state.apiDocs.entities.groups[i]),
	};
}

export default connect(mapStateToProps)(ApiCategoryComponent);
