import { Button, Spinner } from '@streamjar/ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ApiDocAction } from '../../actions/api-doc';
import { ApiUsingApiPage } from '../../components/api/pages/using-api';
import { IState } from '../../state';
import ApiCategory from './api-category';
import ApiEndpoint from './api-endpoint';
import ApiGroupComponent from './api-group';

import * as sidebarStyles from '../../components/sidebar.scss';
// import * as styles from './api-docs.scss';

export interface IApiDocsDispatchProps {
	getApiDocs(): void;
}

export interface IApiDocsProps {
	isFetching: boolean;
	categories: string[];
}

export interface IApiDocsOwnProps {
	thing: string;
}

export type ApiDocsProps = IApiDocsOwnProps & IApiDocsDispatchProps & IApiDocsProps;

export interface IApiDocsState {
	sidebarVisible: boolean;
}

class ApiDocsComponent extends React.Component<ApiDocsProps, IApiDocsState> {
	constructor(props: ApiDocsProps) {
		super(props);

		this.state = { sidebarVisible: false };
	}

	public toggleSidebar = (): void => {
		this.setState(state => ({
			sidebarVisible: !state.sidebarVisible,
		}));
	}

	public componentDidMount() {
		this.props.getApiDocs();
	}

	public render() {
		const { categories } = this.props;

		const ui = (
			<React.Fragment>
				<section className={`flex-50-md flex-50-sm ${sidebarStyles.centerPanel}`}>
					<Route path="/api/about" component={ApiUsingApiPage} />
					<Route path="/api/:category/:group" component={ApiGroupComponent} />
				</section>

				<section className={`flex-30-sm flex-30-md layout-column layout-align-center-center ${sidebarStyles.sidebar}`} style={{ padding: 0 }}>
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
			<React.Fragment>
				<div className={`hide-sm hide-md layout-row layout-align-center-center ${sidebarStyles.sidebarBtn}`}>
					<Button raised={true} icon="menu" onClick={this.toggleSidebar}></Button>
				</div>

				<div className="flex layout-row layout-column-xs layout-row-sm layout-row-md" style={{ height: '100%'}}>
					<aside className={`${sidebarStyles.sidebar} flex-20-md ${this.state.sidebarVisible ? 'force-show' : ''}`}>
						<div className="hide-element-desktop"><Button round={true} raised={true} icon="close" onClick={this.toggleSidebar}></Button></div>
						<h5 className={sidebarStyles.sidebar__title}> About </h5>
						<Link to="/api/about"><Button onClick={this.toggleSidebar}> Using our api </Button></Link>

						{categories.map(c => <ApiCategory key={c} categoryName={c} onClick={this.toggleSidebar} />)}
					</aside>

					{this.props.isFetching ? loading : ui}
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IApiDocsOwnProps): IApiDocsProps {
	return {
		isFetching: state.apiDocs.isFetching,
		categories: state.apiDocs.result,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: IApiDocsOwnProps): IApiDocsDispatchProps {
	return {
		getApiDocs() {
			return dispatch(ApiDocAction.fetchDocsRequest());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiDocsComponent);
