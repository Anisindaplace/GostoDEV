import { Map, fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

const USER_SIGNIN_REQUEST_STARTED = 'user/USER_SIGNIN_REQUEST_STARTED';
const USER_SIGNIN_REQUEST_FAILED = 'user/USER_SIGNIN_REQUEST_FAILED';
const USER_SIGNIN_REQUEST_ENDED = 'user/USER_SIGNIN_REQUEST_ENDED';

const USER_SIGNOUT_REQUEST_STARTED = 'user/USER_SIGNOUT_REQUEST_STARTED';
const USER_SIGNOUT_REQUEST_FAILED = 'user/USER_SIGNOUT_REQUEST_FAILED';
const USER_SIGNOUT_REQUEST_ENDED = 'user/USER_SIGNOUT_REQUEST_ENDED';

const USER_PROFILE_REQUEST_STARTED = 'user/USER_PROFILE_REQUEST_STARTED';
const USER_PROFILE_REQUEST_FAILED = 'user/USER_PROFILE_REQUEST_FAILED';
const USER_PROFILE_REQUEST_ENDED = 'user/USER_PROFILE_REQUEST_ENDED';

export const signin = data => ({
  [CALL_API]: {
    endpoint: '/authentication/signin',
    method: 'POST',
    body: data,
    types: [USER_SIGNIN_REQUEST_STARTED, USER_SIGNIN_REQUEST_ENDED, USER_SIGNIN_REQUEST_FAILED],
  },
});

export const signout = () => ({
  [CALL_API]: {
    endpoint: '/authentication/signout',
    method: 'GET',
    types: [USER_SIGNOUT_REQUEST_STARTED, USER_SIGNOUT_REQUEST_ENDED, USER_SIGNOUT_REQUEST_FAILED],
  },
});

export const getProfile = () => ({
  [CALL_API]: {
    endpoint: '/authentication/profile',
    method: 'GET',
    types: [USER_PROFILE_REQUEST_STARTED, USER_PROFILE_REQUEST_ENDED, USER_PROFILE_REQUEST_FAILED],
  },
});

const initialState = Map({
  user: Map(),
  _metadata: Map({
    logging: false,
    logged: Map({
      status: false,
      error: null,
    }),
  }),
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST_STARTED:
    case USER_PROFILE_REQUEST_STARTED:
      return state
        .setIn(['_metadata', 'logging'], true)
        .setIn(['_metadata', 'logged', 'status'], false);
    case USER_SIGNIN_REQUEST_FAILED:
    case USER_PROFILE_REQUEST_FAILED:
      return state
        .setIn(['_metadata', 'logging'], false)
        .setIn(['_metadata', 'logged', 'status'], true)
        .setIn(['_metadata', 'logged', 'error'], action.payload.errors[0]);

    case USER_SIGNIN_REQUEST_ENDED:
    case USER_PROFILE_REQUEST_ENDED:
      if (!action.payload.success) {
        return state
          .setIn(['_metadata', 'logging'], false)
          .setIn(['_metadata', 'logged', 'status'], true)
          .setIn(['_metadata', 'logged', 'error'], action.payload.errors[0]);
      }
      return state
        .setIn(['_metadata', 'logging'], false)
        .setIn(['_metadata', 'logged', 'status'], true)
        .set('user', fromJS(action.payload.data));

    case USER_SIGNOUT_REQUEST_ENDED:
      if (!action.payload.success) return state;
      return initialState;

    default:
      return state;
  }
}
