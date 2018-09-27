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
}

export type ApiCategory = IApiCategoryOwnProps & IApiCategoryProps;

class ApiCategoryComponent extends React.Component<ApiCategory> {
	public render() {
		const { categoryName, category } = this.props;

		return (
			<React.Fragment>
				<h5 className={sidebarStyles.sidebar__title}> {categoryName} </h5>
				{category.groups.map(i => <Link key={i} to={`/api/${categoryName}/${i}`}><Button onClick={this.props.onClick}>{i}</Button></Link>)}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IApiCategoryOwnProps): IApiCategoryProps {
	return {
		category: state.apiDocs.entities.categories[props.categoryName],
	};
}

export default connect(mapStateToProps)(ApiCategoryComponent);
