import { IOAuthApplication } from '@streamjar/frontend-common-core/models';
import { Button, Card, CardActions, CardContent } from '@streamjar/ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { OAuthAction } from '../../store/actions/oauth';
import { IState } from '../../store/state';
import ModifyOAuthClient from './modify-oauth-client';

export interface IOAuthClientOwnProps {
	client: IOAuthApplication;
}

export interface IOAuthClientDispatchProps {
	delete(): void;
}

export interface IOAuthClientProps {
	saving: boolean;
}

export interface IOAuthClientState {
	open: boolean;
}

export type OAuthClientProps = IOAuthClientProps & IOAuthClientDispatchProps & IOAuthClientOwnProps;

class OAuthClientComponent extends React.PureComponent<OAuthClientProps, IOAuthClientState> {
	constructor(props: OAuthClientProps) {
		super(props);

		this.state = { open: false };
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
		const { client } = this.props;

		return (
			<div className="flex-50 flex-100-xs flex-50-sm">
				<ModifyOAuthClient show={this.state.open} client={this.props.client} onClose={this.closeDialog} />

				<Card>
					<CardContent icon={''}>
						<h3> {client.name} </h3>
						<p style={{ color: '#FFF', paddingTop: 5, opacity: 0.7 }}> Client ID: {client.client} </p>
					</CardContent>

					<CardActions>
						<Button raised={true} onClick={this.openDialog}> Edit </Button>
						<Button disabled={this.props.saving} onClick={this.props.delete} round={true} raised={true} colour="danger" icon="delete" />
					</CardActions>
				</Card>
			</div>
		);
	}
}

function mapStateToProps(state: IState, props: IOAuthClientOwnProps): IOAuthClientProps {
	return {
		saving: state.oauth.status[props.client.client!].saving,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: IOAuthClientOwnProps): IOAuthClientDispatchProps {
	return {
		delete() {
			return dispatch(OAuthAction.deleteClientRequest(props.client));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthClientComponent);
