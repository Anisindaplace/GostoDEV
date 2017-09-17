import { Map, Record, fromJS, List } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { each, map, forEach } from 'lodash';
import { normalize } from 'normalizr';

import concertSchema from './schema';

const CONCERT_CREATE_REQUEST_STARTED = 'concert/CONCERT_CREATE_REQUEST_STARTED';
const CONCERT_CREATE_REQUEST_FAILED = 'concert/CONCERT_CREATE_REQUEST_FAILED';
const CONCERT_CREATE_REQUEST_ENDED = 'concert/CONCERT_CREATE_REQUEST_ENDED';

const CONCERTS_GET_REQUEST_STARTED = 'concert/CONCERTS_GET_REQUEST_STARTED';
const CONCERTS_GET_REQUEST_FAILED = 'concert/CONCERTS_GET_REQUEST_FAILED';
const CONCERTS_GET_REQUEST_ENDED = 'concert/CONCERTS_GET_REQUEST_ENDED';

const CONCERT_INTEREST_REQUEST_STARTED = 'concert/CONCERT_INTEREST_REQUEST_STARTED';
const CONCERT_INTEREST_REQUEST_FAILED = 'concert/CONCERT_INTEREST_REQUEST_FAILED';
const CONCERT_INTEREST_REQUEST_ENDED = 'concert/CONCERT_INTEREST_REQUEST_ENDED';

function formatFormData(data) {
  const formData = new FormData();
  forEach(data, (value, key) => {
    if (key === 'images') {
      forEach(value, (image) => {
        formData.append('images', image);
      });
    } else {
      formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    }
  });
  return formData;
}

export const createConcert = (data) => {
  const values = {};
  each(data, (value, key) => {
    const isImage = key === 'images';
    if (isImage && value) {
      values.images = map(value, 'originFileObj');
    } else {
      values[key] = value;
    }
  });

  return {
    [CALL_API]: {
      endpoint: '/concerts',
      method: 'POST',
      body: formatFormData(values),
      types: [CONCERT_CREATE_REQUEST_STARTED, CONCERT_CREATE_REQUEST_ENDED, CONCERT_CREATE_REQUEST_FAILED],
    },
  };
};

export const sendInterestInConcert = (concertId) => {
  return {
    [CALL_API]: {
      endpoint: `/concerts/${concertId}/interest`,
      method: 'POST',
      types: [CONCERT_INTEREST_REQUEST_STARTED, CONCERT_INTEREST_REQUEST_ENDED, CONCERT_INTEREST_REQUEST_FAILED],
    },
  };
};

export const fetchConcerts = () => {
  return {
    [CALL_API]: {
      endpoint: '/concerts',
      method: 'GET',
      types: [CONCERTS_GET_REQUEST_STARTED, {
        type: CONCERTS_GET_REQUEST_ENDED,
        payload: (action, state, res) => {
          return res.json().then((response) => {
            if (!response.success) {
              return response;
            }

            const result = normalize(response.data, [concertSchema]);
            return {
              ...response,
              concerts: result.entities.concerts,
            };
          });
        },
      }, CONCERTS_GET_REQUEST_FAILED],
    },
  };
};

const ConcertRecord = Record({
  id: 1,
  concertId: null,
  shortTitle: null,
  description: null,
  images: List(),
  concertDate: null,
  time: null,
  duration: 7,
  artisteCategories: List(),
  musicalStyles: List(),
  groupSize: null,
  minPay: null,
  maxPay: null,
  isMaterial: true,
  advantages: null,
  remarks: null,
  organizerId: null,
  Organizer: Map(),
  _metadata: Map({
    fetching: false,
    fetched: Map({
      status: false,
      error: null,
    }),
  }),
});

const concertState = new ConcertRecord();

function concertReducer(state = concertState, action) {
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

export default function concertsReducer(state = initialState, action) {
  switch (action.type) {
    case CONCERT_CREATE_REQUEST_STARTED:
    case CONCERT_CREATE_REQUEST_FAILED:
    case CONCERT_CREATE_REQUEST_ENDED:
    // .setIn(['entities', action.payload.metadata], concertReducer(state.getIn(['entities', action.payload.metadata], action)))
      return state;

    case CONCERTS_GET_REQUEST_STARTED:
      return state
        .setIn(['_metadata', 'fetched', 'status'], false)
        .setIn(['_metadata', 'fetching'], false);

    case CONCERTS_GET_REQUEST_FAILED:
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'fetched', 'status'], true)
        .setIn(['_metadata', 'fetched', 'error'], action.payload.errors);

    case CONCERTS_GET_REQUEST_ENDED:
      if (!action.payload.success || !action.payload.concerts) return state;
      return state
        .setIn(['_metadata', 'fetching'], false)
        .setIn(['_metadata', 'fetched', 'status'], true)
        .mergeIn(['entities'], fromJS(action.payload.concerts).map((concert) => {
          const existingConcert = state.getIn(['entities', concert.get('concertId')]);
          return existingConcert ? existingConcert.merge(concert) : new ConcertRecord(concert);
        }));

    default:
      return state;
  }
}
