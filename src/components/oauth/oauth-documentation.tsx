import { Scopes } from '@streamjar/frontend-common-core';
import * as React from 'react';
import { Link } from 'react-router-dom';

import * as blockStyles from '../block.scss';
import * as tableStyles from '../table.scss';
import * as styles from './oauth-documentation.scss';

export class OAuthDocumentation extends React.PureComponent {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<div className={blockStyles.block}>
					<p className={blockStyles.block__title}> Quick Information </p>

					<table className={tableStyles.quickTable}>
						<tbody>
							<tr>
								<td> access_token </td>
								<td> expires after <strong> 2 weeks </strong> (or once revoked)</td>
							</tr>

							<tr>
								<td> refresh_token </td>
								<td> expires once used (or revoked) </td>
							</tr>

							<tr>
								<td> implicit access_token </td>
								<td> expires after <strong> 1 year </strong> (or once revoked)</td>
							</tr>

							<tr>
								<td> Authorise endpoint </td>
								<td> https://control.streamjar.tv/oauth/authorize </td>
							</tr>

							<tr>
								<td> Token endpoint </td>
								<td> https://jar.streamjar.tv/v2/oauth/authorize </td>
							</tr>

							<tr>
								<td> API Header </td>
								<td> OAuth {'<code>'} </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className={blockStyles.block}>
					<p className={blockStyles.block__title}> Authentication with StreamJar </p>
					<p> If you would like to utilize our api, we recommend you use OAuth. It's quick and secure for our
						(and your) users. At this time we scope all OAuth requests to a channel. We don't provide access
						to viewers or account level api's at this time. </p>

					<p className={blockStyles.block__title}> Getting Started </p>
					<p>To get started with OAuth, you'll want to create your first OAuth application. You can do that here! You must provide us:</p>
					<ul className={styles.docsList}>
						<li> An application name - This must be unique to you </li>
						<li> A website URL - this must be a full URL to your website. This can be a link to information on your intergration, etc. </li>
						<li> A redirect URI - a domain to support redirecting to
							<ul className={styles.docsList}>
								<li> e.g example.com for anything such as https://example.com/login</li>
								<li> e.g app.example.com for anything such as https://app.example.com/login</li>
							</ul>
						</li>
					</ul>

					<p className={blockStyles.block__title}> The oauth flow </p>
					<p> The remainder is fairly standard, our API follows the OAuth specification. We strongly recommend that
						<strong>you don't</strong> implement this yourself. Lots of clients already exist for a
						<a href="https://oauth.net/code/"> wide range of languages</a>.
					</p>

				</div>

				<div className={blockStyles.block}>
					<p className={blockStyles.block__title}> Channels </p>
					<p>Since we scope oauth authorisation to a single channel, you'll never be linked to a single StreamJar user. Please make a call to
						our <Link to="/api/Channels/Channel%20Collection/Get%20channels">/channels endpoint</Link>. It will return a single channel which all
						subsequent api calls will use. <strong> This will never change within the life time of an authorisation</strong>.
					</p>
				</div>

				<div className={blockStyles.block}>
					<p className={blockStyles.block__title}> Scopes </p>
					<p>Our endpoints have their permissions managed based on a granular range of scopes, below is a list you may request access to.
						Note the docs for each endpoint will mention what scope is required.</p>

					<table className={tableStyles.quickTable}>
						<tbody>
							{this.getScopes()}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}

	public getScopes(): JSX.Element[] {
		const scopes = Scopes.scopesByKey();

		return Object.keys(scopes).map(key => {
			const classname: string = key.includes(':admin:') ? styles.admin : '';

			return (
				<tr key={key} className={classname}>
					<td className={tableStyles.monospace}> {key} </td>
					<td> {scopes[key]}</td>
				</tr>
			);
		});
	}
}
