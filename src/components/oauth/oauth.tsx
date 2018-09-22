import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import * as stylesApi from '../../containers/api/api-docs.scss';
import OAuthClients from '../../containers/oauth/oauth-clients';
import { OAuthDocumentation } from './oauth-documentation';
import * as styles from './oauth.scss';

export class OAuth extends React.Component {
	public render(): JSX.Element {
		return (
			<div className={`${styles.oauthClients} layout-row`}>
				<aside className={`${stylesApi.apiDocs__content} ${styles.oauth} flex-20`}>
					<h5 className={stylesApi.apiDocs__title}> OAuth </h5>
					<Link to="/oauth/clients"><Button> Your Clients </Button></Link>
					<Link to="/oauth/documentation"><Button> Documentation </Button></Link>
				</aside>

				<section className={`${styles.oauthContainer} flex-80`}>
					<Route path="/oauth/clients" component={OAuthClients} />
					<Route path="/oauth/documentation" component={OAuthDocumentation} />
				</section>
			</div>
		);
	}
}
