import { Button, Link, Tooltip } from '@streamjar/ui-react';
import * as React from 'react';
import { Link as RouterLink, Redirect, Route, Switch } from 'react-router-dom';

import '../util/ApiHelper';
import * as appStyles from './app.scss';
// import ApiDocs from '../containers/api/api-docs';
import { LiveEvents } from './live/live';
// import { OAuth } from './oauth/oauth';

const redirectToApi: () => JSX.Element = () => <Redirect to="/api/about" />;

export const App: React.FC = () => {
	return (
		<React.Fragment>
			<header className={appStyles.header}>
				<div className="layout-row layout-align-start-center">
					<img className={appStyles.header__logo} src="/assets/jar-white.svg" alt="logo" />
					<span className={appStyles.header__lead}> Developers </span>
				</div>

				<div className={appStyles.header__navigation}>
					<div className="layout-row layout-wrap">
						<div className="flex layout-row layout-wrap">
							<RouterLink to="/api/about"><Button> API </Button></RouterLink>
							<RouterLink to="/live"><Button> Live Events </Button></RouterLink>
							<Tooltip message="Contribute to the developer site" axis="vertical">
								<Link href="https://github.com/streamjar/developers" icon="code"> Source </Link>
							</Tooltip>
						</div>

						<div>
							<RouterLink to="/oauth/clients"><Button icon="vpn_key"> OAuth </Button></RouterLink>
						</div>
					</div>
				</div>
			</header>

			<Switch>
				<Route exact={true} path="/" render={redirectToApi} />
				{/* <Route path="/api" component={ApiDocs} /> */}
				<Route path="/live" component={LiveEvents} />
				{/* <Route path="/oauth" component={OAuth} /> */}
				<Route render={redirectToApi}></Route>
			</Switch>

		</React.Fragment>
	);
}
