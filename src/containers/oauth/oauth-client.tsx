import { IOAuthApplication } from '@streamjar/frontend-common-core/models';
import { Button, Card, CardActions, CardContent } from '@streamjar/ui-react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { OAuthAction } from '../../actions/oauth';
import { IState } from '../../state';
import ModifyOAuthClient from './modify-oauth-client';

export interface IOAuthClientBaseProps {
	client: IOAuthApplication;
}

export interface IOAuthClientProps extends IOAuthClientBaseProps {
	saving: boolean;
	delete(): void;
}

export interface IOAuthClientState {
	open: boolean;
}

class OAuthClientComponent extends React.PureComponent<IOAuthClientProps, IOAuthClientState> {
	constructor(props: IOAuthClientProps) {
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

function mapStateToProps(state: IState, props: IOAuthClientBaseProps): Partial<IOAuthClientProps> {
	return {
		saving: state.oauth.status[props.client.client!].saving,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: IOAuthClientBaseProps): Partial<IOAuthClientProps> {
	return {
		delete() {
			return dispatch(OAuthAction.deleteClientRequest(props.client));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthClientComponent);
