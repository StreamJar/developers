import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './app.global.scss';
import { App } from './components/app';
import { root } from './reducers';
import { rootEpics, epics } from './epics';

const store = createStore(root, applyMiddleware(epics, () => next => action => next({ ...action })));
epics.run(rootEpics);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app'),
);
