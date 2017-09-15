import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../modules/User/redux/authReducer';
import musiciens from '../modules/Musicien/redux/reducer';
import organizers from '../modules/Organizer/redux/reducer';

export default combineReducers({
  routing,
  auth,
  musiciens,
  organizers,
  form: formReducer,
});
