
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import createHistory from 'history/createBrowserHistory';
import apiTokenInjector from '../middlewares/apiMiddleware';
import rootReducer from './reducers';

export const history = createHistory({
  basename: '/',
});

export default function configureStore(initialState) {
  const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, apiTokenInjector, apiMiddleware, routerMiddleware(history))(create);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export const store = configureStore();
