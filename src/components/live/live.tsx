import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import Highlight from 'react-highlight';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';

import * as stylesApi from '../../containers/api/api-docs.scss';
import * as stylesOAuth from '../oauth/oauth-documentation.scss';
import * as styles from './live.scss';

const events: { [key: string]: any } = {
	Follow: {
		user: 20742,
		name: 'StreamJar',
		avatar: 'https://mixer.com/api/v1/users/20742/avatar?w=256&h=256',
		platform: 'mixer',
	},
	Sub: {
		user: 20742,
		name: 'StreamJar',
		avatar: 'https://mixer.com/api/v1/users/20742/avatar?w=256&h=256',
		platform: 'mixer',
	},
	Resub: {
		user: 20742,
		name: 'StreamJar',
		avatar: 'https://mixer.com/api/v1/users/20742/avatar?w=256&h=256',
		platform: 'mixer',
		months: 2,
	},
	Tip: {
		channelId: 0,
		email: 'test@streamjar.tv',
		name: 'Tipper Name',
		amount: 15.99,
		currency: 'USD',
		message: 'This is a test tip,!',
		method: 'test',
	},
	Goal: {
		id: 0,
		type: 'followers',
		current: 50,
		total: 100,
		completed: false,
	},
	Chat: {
		msg: '@StreamJarDev is now following.',
		ex: ['@StreamJarDev', 'is', 'now', 'following.'],
		raw: [
				{ data: '', text: '', type: 'text' },
				{ type: 'tag', username: 'StreamJarDev', text: '@StreamJarDev', id: 220888 },
				{ data: ' is now following.', text: ' is now following.', type: 'text' },
		],
		id: '780f0370-b7f1-11e6-a9f7-c3cdc8c706a6',
		user: {
				id: 20742,
				name: 'StreamJar',
				roles: ['Mod', 'User'],
		},
		platform: 'mixer',
	},
	Tweet: {
		username: 'StreamJar',
	},
	Host: {
		user: 20742,
		name: 'StreamJar',
		avatar: 'https://mixer.com/api/v1/users/20742/avatar?w=256&h=256',
	},
	Song: {
		name: 'Never Gonna Give You Up',
		artist: 'Rick Astley',
		artwork: 'https://i.scdn.co/image/15ac2c9091d9b74e841b281ceb23ca8208321444',
		id: '4uLU6hMCjMI75M1A2tKUQC',
		source: 'spotify',
	},
};

const code: string = `
import io from 'socket.io-client';

const socket = io.connect('https://jar.streamjar.tv', {
	transports: ['websocket'],
});

socket.on('connect', () => {
	socket.emit('authenticate', { oauth: 'b899s3b6s9sab67521c6fc9c55955ezv' });
});
`;

const codeConnected: string = `
// connection code
socket.on('connect', () => {
	// -> authenticate event

	const channelId = 192;

	socket.emit('subscribe', { event: \`channel:\${channelId}:follow\` });
	socket.on(\`channel:\${channelId}:follow\`, (event) => {
		console.log(\`I was just followed by \${event.name} on \${event.platform}\`);
	});
});
`;

export class LiveEvents extends React.PureComponent {
	public render(): JSX.Element {
		return (
			<React.Fragment>
				<div className={`layout-row`}>
					<aside className={`${styles.leftPanel} ${stylesApi.apiDocs__content} ${styles.oauth} flex-20`}>
						<h5 className={stylesApi.apiDocs__title}> Live Events </h5>
						<a href="/live#quick"><Button> About </Button></a>
						<a href="/live#ex-conn"><Button> Connecting </Button></a>
						<a href="/live#ex-evts"><Button> Subscribing to events </Button></a>
						<h5 className={stylesApi.apiDocs__title}> Available Events </h5>
						{Object.keys(events).map(key => <a key={key} href={`/live#evt-${key}`}><Button> {key} </Button></a>)}
					</aside>

					<section className={`${styles.rightPanel} flex-80`}>
						<div className={styles.block} id="quick">
							<p className={styles.block__title}> Quick Information </p>
							<p> We provide a websocket service which utilizes socket.io, which allows you to receive any events we emit in real time.
								Below you can find a list of all events you can subscribe to and an example payload you should expect to receive. </p>

							<table className={stylesOAuth.quickTable}>
								<tbody>
									<tr>
										<td> Hostname </td>
										<td> https://jar.streamjar.tv </td>
									</tr>
									<tr>
										<td> Authentication </td>
										<td> Emit an event <code>authenticate</code> with payload <code>{'{ oauth: \'token\'}'}</code>. The authentication
											token is the one you obtained from the OAuth flow. </td>
									</tr>
									<tr>
										<td> Subscribe </td>
										<td> Emit an event <code>subscribe</code> with payload <code>{'{ event: \'channel:1:tip\'}'}</code>, where
											<code>1</code> is the <strong>channelId</strong>.</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className={`${styles.block} ${styles.codeBlock}`} id="ex-conn">
							<p className={`${styles.block__title}`}> Connection Example </p>

							<p> Connecting to our websocket is super easy if you use javascript with the socket.io library. You should ensure you force socket.io
								to use websockets, else you may run into unexpected issues! </p>
							<Highlight className="typescript">
								{code.trim()}
							</Highlight>
						</div>

						<div className={`${styles.block} ${styles.codeBlock}`} id="ex-evts">
							<p className={`${styles.block__title}`}> Subscribing to events</p>

							<p> Once connected to our websocket, you need to subscribe to some events! This can be done as follows: </p>

							<Highlight className="typescript">
								{codeConnected.trim()}
							</Highlight>
						</div>

						{this.getEvents()}
					</section>
				</div>
			</React.Fragment>
		);
	}

	private getEvents() {
		return Object.keys(events).map(i => {
			return (
				<div key={i} className={styles.block} id={`evt-${i}`}>
					<p className={`${styles.block__title} ${styles.block__lower}`}> channel:{`{id}`}:{i} </p>
					<ReactJson src={events[i]} name={null} theme="monokai" />
				</div>
			);
		});
	}
}
