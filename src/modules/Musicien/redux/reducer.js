import { Map, Record, fromJS, List } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { each, head, forEach } from 'lodash';
import { normalize } from 'normalizr';

import musicienSchema from './schema';

const MUSICIEN_CREATE_REQUEST_STARTED = 'musicien/MUSICIEN_CREATE_REQUEST_STARTED';
const MUSICIEN_CREATE_REQUEST_FAILED = 'musicien/MUSICIEN_CREATE_REQUEST_FAILED';
const MUSICIEN_CREATE_REQUEST_ENDED = 'musicien/MUSICIEN_CREATE_REQUEST_ENDED';

const MUSICIENS_GET_REQUEST_STARTED = 'musicien/MUSICIENS_GET_REQUEST_STARTED';
const MUSICIENS_GET_REQUEST_FAILED = 'musicien/MUSICIENS_GET_REQUEST_FAILED';
const MUSICIENS_GET_REQUEST_ENDED = 'musicien/MUSICIENS_GET_REQUEST_ENDED';

function formatFormData(data) {
  const formData = new FormData();
  forEach(data, (value, key) => {
    formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
  });
  return formData;
}

export const createMusicien = (data) => {
  const values = {};
  each(data, (value, key) => {
    const isImage = key === 'images';
    if (isImage && value) {
      values.image = head(value).originFileObj;
    } else {
      values[key] = value;
    }
  });

  return {
    [CALL_API]: {
      endpoint: '/musiciens',
      method: 'POST',
      body: formatFormData(values),
      types: [MUSICIEN_CREATE_REQUEST_STARTED, MUSICIEN_CREATE_REQUEST_ENDED, MUSICIEN_CREATE_REQUEST_FAILED],
    },
  };
};

export const fetchMusiciens = () => {
  return {
    [CALL_API]: {
      endpoint: '/musiciens',
      method: 'GET',
      types: [MUSICIENS_GET_REQUEST_STARTED, {
        type: MUSICIENS_GET_REQUEST_ENDED,
        payload: (action, state, res) => {
          return res.json().then((response) => {
            if (!response.success) {
              return response;
            }

            const result = normalize(response.data, [musicienSchema]);
            return {
              ...response,
              musiciens: result.entities.musiciens,
            };
          });
        },
      }, MUSICIENS_GET_REQUEST_FAILED],
    },
  };
};

const MusicienRecord = Record({
  id: null,
  musicienId: null,
  type: null,
  sceneName: null,
  website: null,
  biography: null,
  musicalStyles: List(),
  repository: null,
  inspirations: null,
  instruments: List(),
  songs: null,
  userId: null,
  user: Map(),
  interestedIn: List(),
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

    case MUSICIENS_GET_REQUEST_STARTED:
      return state
        .setIn(['_metadata', 'fetched', 'status'], false)
        .setIn(['_metadata', 'fetching'], false);

    case MUSICIENS_GET_REQUEST_FAILED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'fetched', 'status'], true)
        .setIn(['_metadata', 'fetched', 'error'], action.payload.errors);

    case MUSICIENS_GET_REQUEST_ENDED:
      if (!action.payload.success || !action.payload.musiciens) return state;
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'fetched', 'status'], true)
        .mergeIn(['entities'], fromJS(action.payload.musiciens).map((musicien) => {
          const existingMusicien = state.getIn(['entities', musicien.get('musicienId')]);
          return existingMusicien ? existingMusicien.merge(musicien) : new MusicienRecord(musicien);
        }));

    default:
      return state;
  }
}
