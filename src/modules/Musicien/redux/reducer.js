import { Map, Record } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

const MUSICIEN_CREATE_REQUEST_STARTED = 'user/MUSICIEN_CREATE_REQUEST_STARTED';
const MUSICIEN_CREATE_REQUEST_FAILED = 'user/MUSICIEN_CREATE_REQUEST_FAILED';
const MUSICIEN_CREATE_REQUEST_ENDED = 'user/MUSICIEN_CREATE_REQUEST_ENDED';

export const createMusicien = data => ({
  [CALL_API]: {
    endpoint: '/musiciens',
    method: 'POST',
    body: data,
    types: [MUSICIEN_CREATE_REQUEST_STARTED, MUSICIEN_CREATE_REQUEST_ENDED, MUSICIEN_CREATE_REQUEST_FAILED],
  },
});

const MusicienRecord = Record({
  _metadata: Map({
    fetching: false,
    fetched: Map({
      status: false,
      error: null,
    }),
  }),
});

const musicienState = new MusicienRecord();

function musicienReducer(state = musicienState, action) {
  switch (action.type) {
    default: return state;
  }
}

const initialState = Map({
  entities: Map(),
  _metadata: Map({
    fetching: false,
    fetched: Map({
      status: false,
      error: null,
    }),
  }),
});

export default function musiciensReducer(state = initialState, action) {
  switch (action.type) {
    case MUSICIEN_CREATE_REQUEST_STARTED:
    case MUSICIEN_CREATE_REQUEST_FAILED:
    case MUSICIEN_CREATE_REQUEST_ENDED:
    // .setIn(['entities', action.payload.metadata], musicienReducer(state.getIn(['entities', action.payload.metadata], action)))
      return state;

    default:
      return state;
  }
}
