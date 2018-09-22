import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './styles.scss';

export class ApiUsingApiPage extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<div className={styles.block}>
					<h4> StreamJar API </h4>
					<p> StreamJar provides an API which enables you to interact with streamers channels.
						Our API is served from <code>https://jar.streamjar.tv/v2</code>.
					</p>
				</div>

				<div className={styles.block}>
					<p className={styles.block__title}> Authentication </p>
					<p> Using our API requires you to use OAuth to gain permissions to any channel. Be aware that only
						users with both <code>channel:settings:admin</code> and the scopes you're requesting can grant permissions.
					</p>

					<div className="layout-row layout-align-end-center">
						<Link to="/oauth/documentation"><Button raised={true}> OAuth Documentation</Button></Link>
					</div>

				<p className={styles.block__title}> Breaking changes </p>
					<p>
						We rarely have to make changes to our API and where possible we will do so in a backwards compatible way.
						This does not apply to internal or private (undocumented) apis we utilise.
					</p>
				</div>

				<div className={styles.block}>
					<p className={styles.block__title}> Using our documentation</p>
					<p>
						The API we provide is restful. Throughout the documentation you will find a lot of endpoints have collections as well as separate
						routes. Collections refer to interacting with a single element (GET/PATCH/DELETE).
					</p>

					<p className={styles.block__title} style={{marginTop: 25}}> Getting Help </p>
					<p> If you're ever stuck while using our API, there's a good chance we use it in one of our frontends. You can use developer
						tools to inspect the API calls we make, please don't use private APIs you may discover though. </p>
					<p> We also provide a discord channel which we have a dedicated #developers channel, feel free to ask questions and one of us
						will get back to you ASAP. </p>

					<p>If you have questions, concerns, feedback or anything else you can contact us at developers@streamjar.tv </p>

					<div className="layout-row layout-align-start-center" style={{marginTop: 25}}>
						<a href="https://streamjar.tv/discord"><Button raised={true}> Discord </Button></a>
						<a href="https://github.com/StreamJar/developers"><Button raised={true}> GitHub </Button></a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
