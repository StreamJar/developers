import { IOAuthApplication } from '@streamjar/frontend-common-core/models';
import { Button, Section, Spinner } from '@streamjar/ui-react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { OAuthAction } from '../../actions/oauth';
import { IState } from '../../state';
import ModifyOAuthClient from './modify-oauth-client';
import OAuthClient from './oauth-client';

export interface IOAuthProps {
	isFetching: boolean;
	clients: IOAuthApplication[];
	getClients(): void;
}

export interface IOAuthState {
	open: boolean;
}

class OAuthClientsComponent extends React.PureComponent<IOAuthProps, IOAuthState> {
	constructor(props: IOAuthProps) {
		super(props);

		this.state = { open: false };
	}

	public componentDidMount(): void {
		this.props.getClients();
	}

	public openDialog = (): void => {
		this.setState({
			open: true,
		});
	}

	public closeDialog = (): void => {
		this.setState({
			open: false,
		});
	}

	public render(): JSX.Element {
		return (
			<Section
				tabs={true}
				header={<React.Fragment>OAuth Clients</React.Fragment>}
				action={<div style={{ marginRight: 20 }}><Button raised={true} onClick={this.openDialog}> Create Client</Button></div>}>

				<ModifyOAuthClient show={this.state.open} onClose={this.closeDialog} />

				<div className="layout-row layout-wrap">
					{this.props.isFetching && <Spinner />}
					{this.props.clients.map(client => <OAuthClient key={client.client} client={client} />)}
				</div>
			</Section>
		);
	}
}

function mapStateToProps(state: IState, props: {}): Partial<IOAuthProps> {
	return {
		isFetching: state.oauth.isFetching,
		clients: state.oauth.clients,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: {}): Partial<IOAuthProps> {
	return {
		getClients() {
			return dispatch(OAuthAction.fetchClientsRequest());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthClientsComponent);
