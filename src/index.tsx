import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

import './app.global.scss';
import { App } from './components/App';
import { epics, rootEpics } from './store/epics';
import { root } from './store/reducers';

const store = createStore(root, applyMiddleware(epics, () => next => action => next({ ...action })));
epics.run(rootEpics);

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
),              document.getElementById('app');
