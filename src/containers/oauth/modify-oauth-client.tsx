import { IOAuthApplication } from '@streamjar/frontend-common-core/models';
import { BaseDialog, Button, Checkbox, DialogContent, DialogFooter, DialogHeader, DialogStatus, Form, Input } from '@streamjar/ui-react';
import { IDialogProps } from '@streamjar/ui-react/dist/lib/dialog/dialog';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as yup from 'yup';

import { OAuthAction } from '../../actions/oauth';
import { IState } from '../../state';

export interface IModifyOAuthClientBaseProps {
	client?: IOAuthApplication;
}

export interface IModifyOAuthClientProps extends IModifyOAuthClientBaseProps {
	saving: boolean;
	createClient(app: IOAuthApplication): void;
	saveClient(app: IOAuthApplication): void;
}

export interface IModifyOAuthClientState {
	name: string;
	website: string;
	redirect: string;
	secret: boolean;
}

class ModifyOAuthClientComponent extends BaseDialog<IModifyOAuthClientProps, IModifyOAuthClientState> {
	public validation = yup.object().shape({
		name: yup.string().required().min(4).max(24),
		website: yup.string().required().matches(/^(https?:\/\/)(.+)/, 'This must be a fully formed URL (e.g https://streamjar.tv)'),
		redirect: yup.string().required().matches(/^[a-z0-9\-_\.]+$/, 'This must be just the hostname (e.g developers.streamjar.tv)'),
		client: yup.string(),
		secret: yup.string(),
	});

	private setName: (val: string) => void;
	private setWebsite: (val: string) => void;
	private setRedirect: (val: string) => void;
	private setSecret: (val: boolean) => void;

	constructor(props: IModifyOAuthClientProps & IDialogProps) {
		super(props);

		this.submit = this.submit.bind(this);
		this.setName = this.setField.bind(this, 'name');
		this.setWebsite = this.setField.bind(this, 'website');
		this.setRedirect = this.setField.bind(this, 'redirect');
		this.setSecret = this.setField.bind(this, 'secret');

		this.setupDialog({
			width: '500px',
			state: DialogStatus.LOADED,
		});
	}

	public componentWillReceiveProps(next: IModifyOAuthClientProps): void {
		if (!next.saving && this.props.saving) {
			this.close();
		} else if (next.saving && !this.props.saving) {
			this.loading();
		}
	}

	public dialogDidOpen(): void {
		if (this.props.client) {
			this.setState({
				name: this.props.client.name,
				website: this.props.client.website,
				redirect: this.props.client.redirect,
				secret: !!this.props.client.secret,
			});
		}
	}

	public initialState(): IModifyOAuthClientState {
		return { name: '', website: '', redirect: '', secret: false };
	}

	public renderDialog(): JSX.Element {
		return (
			<React.Fragment>
					<Form validation={this.validation} onSubmit={this.submit}>
						<DialogHeader> {this.props.client ? 'Edit' : 'Create'} client </DialogHeader>
						<DialogContent>
								<Input name="name" type="text" title="Client Name" value={this.state.name} onChange={this.setName}/>
								{this.getExtraFields()}
								<div style={{ paddingTop: 15 }}>
									<Checkbox value={this.state.secret} onChange={this.setSecret}
										disabled={!!this.props.client}>This client is able to keep a secret</Checkbox>
								</div>
								<Input name="website" type="text" title="Website" value={this.state.website} onChange={this.setWebsite} />
								<Input name="redirect" type="text" title="Redirect URI" value={this.state.redirect} onChange={this.setRedirect} />
						</DialogContent>

						<DialogFooter><Button type="submit" raised={true}>Save</Button></DialogFooter>
					</Form>
				</React.Fragment>
		);
	}

	private submit(): void {
		if (this.props.client) {
			const app = {
				...this.props.client,
				name: this.state.name,
				redirect: this.state.redirect,
				website: this.state.website,
			};

			this.props.saveClient(app);
		} else {
			this.props.createClient({
				name: this.state.name,
				redirect: this.state.redirect,
				website: this.state.website,
				secret: `${this.state.secret}`,
			});
		}
	}

	private setField(name: keyof IModifyOAuthClientState, value: string): void {
		this.setState({ [name]: value } as any);
	}

	private getExtraFields(): JSX.Element {
		if (!this.props.client) {
			return <React.Fragment />;
		}

		const inputs = [
			<Input key="client" name="client" type="text" title="Client ID" readonly={true} value={this.props.client.client} />,
		];

		if (this.props.client.secret) {
			inputs.push(
				<Input key="secret" name="secret" type="text" title="Client Secret" readonly={true} value={this.props.client.secret} />,
			);
		}

		return (
			<React.Fragment>
				{inputs}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state: IState, props: IModifyOAuthClientBaseProps): Partial<IModifyOAuthClientProps> {
	return {
		saving: state.oauth.status[props.client ? props.client!.client! : 'newClient']!.saving,
	};
}

function mapDispatchToProps(dispatch: Dispatch, props: IModifyOAuthClientBaseProps): Partial<IModifyOAuthClientProps> {
	return {
		createClient(app: IOAuthApplication) {
			return dispatch(OAuthAction.createClientRequest(app));
		},
		saveClient(app: IOAuthApplication) {
			return dispatch(OAuthAction.modifyClientRequest(app));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOAuthClientComponent);
