import { Button, Spinner } from '@streamjar/ui-react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { ApiDocAction } from '../../actions/api-doc';
import { ApiUsingApiPage } from '../../components/api/pages/using-api';
import { IState } from '../../state';
import ApiCategory from './api-category';
import * as styles from './api-docs.scss';
import ApiEndpoint from './api-endpoint';
import ApiGroupComponent from './api-group';

export interface IApiDocsProps {
	isFetching: boolean;
	categories: string[];

	getApiDocs(): void;
}

class ApiDocsComponent extends React.Component<IApiDocsProps> {
	public componentDidMount() {
		this.props.getApiDocs();
	}

	public render() {
		const { categories } = this.props;

		const ui = (
			<React.Fragment>
				<section className={`${styles.apiDocs__page} flex-50`}>
					<Route path="/api/about" component={ApiUsingApiPage} />
					<Route path="/api/:category/:group" component={ApiGroupComponent} />
				</section>

				<section className={`${styles.apiDocs__endpoint} flex-30 layout-column layout-align-center-center`}>
					<Route path="/api/:category/:group/:endpoint?" component={ApiEndpoint} />
				</section>
			</React.Fragment>
		);

		const loading = (
			<div className="layout-column layout-align-center-center" style={{ width: '100%' }}>
				<Spinner />

				<p style={{ fontWeight: 500, opacity: 0.2, marginTop: 10 }}> Fetching API Documentation </p>
			</div>
		);

		return (
			<div className={`${styles.apiDocs} layout-row`}>
				<aside className={`${styles.apiDocs__content} flex-20`}>
					<h5 className={styles.apiDocs__title}> About </h5>
					<Link to="/api/about"><Button> Using our api </Button></Link>

					{categories.map(c => <ApiCategory key={c} categoryName={c} />)}
				</aside>

				{this.props.isFetching ? loading : ui}
			</div>
		);
	}
}

function mapStateToProps(state: IState, props: {}): Partial<IApiDocsProps> {
	return {
		isFetching: state.apiDocs.isFetching,
		categories: state.apiDocs.result,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: {}): Partial<IApiDocsProps> {
	return {
		getApiDocs() {
			return dispatch(ApiDocAction.fetchDocsRequest());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiDocsComponent);
