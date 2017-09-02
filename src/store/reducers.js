import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import authReducer from '../modules/User/redux/authReducer';

export default combineReducers({
  routing,
  auth: authReducer,
});
