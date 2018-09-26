import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import OAuthClients from '../../containers/oauth/oauth-clients';
import * as sidebarStyles from '../sidebar.scss';
import { OAuthDocumentation } from './oauth-documentation';

export class OAuth extends React.Component {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<aside className={`${sidebarStyles.sidebar} flex-20`}>
					<h5 className={sidebarStyles.sidebar__title}> OAuth </h5>
					<Link to="/oauth/clients"><Button> Your Clients </Button></Link>
					<Link to="/oauth/documentation"><Button> Documentation </Button></Link>
				</aside>

				<section className={`${sidebarStyles.centerPanel} flex-80`}>
					<Route path="/oauth/clients" component={OAuthClients} />
					<Route path="/oauth/documentation" component={OAuthDocumentation} />
				</section>
			</React.Fragment>
		);
	}
}
