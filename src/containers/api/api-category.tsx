import * as React from 'react';
import { Button } from '@streamjar/ui-react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { IState } from '../../state';

import * as docStyles from './api-docs.scss';

export interface IApiCategoryOwnProps {
	categoryName: string;
}

export interface IApiCategoryProps extends IApiCategoryOwnProps {
	category: { name: string; groups: string[] };
}

class ApiCategoryComponent extends React.Component<IApiCategoryProps> {
	public render() {
		const { categoryName, category } = this.props;

		return (
			<React.Fragment>
				<h5 className={docStyles.apiDocs__title}> {categoryName} </h5>
				{category.groups.map(i => <Link key={i} to={`/api/${categoryName}/${i}`}><Button>{i}</Button></Link>)}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IApiCategoryOwnProps): Partial<IApiCategoryProps> {
	return {
		category: state.apiDocs.entities.categories[props.categoryName],
	};
}

export default connect(mapStateToProps)(ApiCategoryComponent);
