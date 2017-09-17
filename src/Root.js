import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { LocaleProvider } from 'antd';
// It's recommended to set locale in entry file globaly.
import enUS from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-ca';
import moment from 'moment';
import App from './modules/Application/App';
import PublicRoute from './modules/common/components/Routes/PublicRoute';
import { store, history } from './store';

moment.locale('en-ca');


const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <PublicRoute path="/" component={App} />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>
);

export default Root;
