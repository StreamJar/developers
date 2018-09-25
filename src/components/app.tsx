import { Button, Tooltip } from '@streamjar/ui-react';
import * as React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import ApiDocs from '../containers/api/api-docs';
import '../util/ApiHelper';
import * as appStyles from './app.scss';
import { LiveEvents } from './live/live';
import { OAuth } from './oauth/oauth';

export class App extends React.Component {
	public redirectToApi: () => JSX.Element = () => <Redirect to="/api/about" />;

	public render(): JSX.Element {
		return (
			<React.Fragment>
				<header className={appStyles.header}>
					<div className="layout-row layout-align-start-center">
						<img className={appStyles.header__logo} src="/assets/jar-white.svg" alt="logo" />
						<span className={appStyles.header__lead}> Developers </span>
					</div>

					<div className={appStyles.header__navigation}>
						<div className="layout-row">
							<div className="flex layout-row">
								<Link to="/api/about"><Button> API </Button></Link>
								<Link to="/live"><Button> Live Events </Button></Link>
								<a href="https://github.com/streamjar/developers">
									<Tooltip message="Contribute to the developer site" position="top">
										<Button icon="code"> Source </Button>
									</Tooltip>
								</a>
							</div>

							<div>
								<Link to="/oauth/clients"><Button icon="vpn_key"> OAuth </Button></Link>
							</div>
						</div>
					</div>
				</header>

				<Switch>
					<Route exact={true} path="/" render={this.redirectToApi} />
					<Route path="/api" component={ApiDocs} />
					<Route path="/live" component={LiveEvents} />
					<Route path="/oauth" component={OAuth} />
					<Route render={this.redirectToApi}></Route>
				</Switch>
			</React.Fragment>
		);
	}
}
