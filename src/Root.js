import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './modules/Application/App';
import PublicRoute from './modules/common/components/Routes/PublicRoute';
import { store, history } from './store';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PublicRoute path="/" component={App} />
    </ConnectedRouter>
  </Provider>
);

export default Root;
