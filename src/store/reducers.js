import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from '../modules/User/redux/authReducer';
import musiciens from '../modules/Musicien/redux/reducer';

export default combineReducers({
  routing,
  auth,
  musiciens,
});