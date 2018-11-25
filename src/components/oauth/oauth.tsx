import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import OAuthClients from '../../containers/oauth/oauth-clients';
import * as sidebarStyles from '../sidebar.scss';
import { OAuthDocumentation } from './oauth-documentation';

export interface IOAuthState {
	sidebarVisible: boolean;
}

export class OAuth extends React.Component<{}, IOAuthState> {

	constructor(props: {}) {
		super(props);
		this.state = { sidebarVisible: false };
	}

	public toggleSidebar = (): void => {
		this.setState(state => ({
			sidebarVisible: !state.sidebarVisible,
		}));
	}
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<div className={`hide-sm hide-md layout-row layout-align-center-center ${sidebarStyles.sidebarBtn}`}>
					<Button raised={true} icon="menu" onClick={this.toggleSidebar}></Button>
				</div>

				<div className="flex layout-column-xs layout-row-sm layout-row-md">
					<aside className={`${sidebarStyles.sidebar} flex-20-md ${this.state.sidebarVisible ? 'force-show' : ''}`}>
						<div className="hide-element-desktop"><Button round={true} raised={true} icon="close" onClick={this.toggleSidebar}></Button></div>
						<h5 className={sidebarStyles.sidebar__title}> OAuth </h5>
						<Link to="/oauth/clients"><Button onClick={this.toggleSidebar}> Your Clients </Button></Link>
						<Link to="/oauth/documentation"><Button onClick={this.toggleSidebar}> Documentation </Button></Link>
					</aside>

					<section className={`${sidebarStyles.centerPanel} flex-100`}>
						<Route path="/oauth/clients" component={OAuthClients} />
						<Route path="/oauth/documentation" component={OAuthDocumentation} />
					</section>
				</div>
			</React.Fragment>
		);
	}
}
