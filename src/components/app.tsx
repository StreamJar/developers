import * as React from 'react';
import { Tab, Tabs, Button } from '@streamjar/ui-react';

import '../util/ApiHelper';
import { Route, Link } from 'react-router-dom';
import ApiDocs from '../containers/api/api-docs';

import * as appStyles from './app.scss';

export class App extends React.Component {
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
							<div className="flex">
								<Button> Home </Button>
								<Link to="/api/about"><Button> API </Button></Link>
								<Button> Live Events </Button>
							</div>

							<div>
								<Button icon="vpn_key"> OAuth </Button>
							</div>
						</div>
					</div>
				</header>

				<Route path="/api" component={ApiDocs} />
			</React.Fragment>
		);
	}
}
