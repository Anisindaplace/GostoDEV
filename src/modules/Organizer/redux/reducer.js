import { Map, Record } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import axios from 'axios';

const GOOGLE_MAPS_API = 'AIzaSyANBaVp0sOx7QDR4dZHmnrzqu3kbLBH5u0';

const ORGANIZER_CREATE_REQUEST_STARTED = 'user/ORGANIZER_CREATE_REQUEST_STARTED';
const ORGANIZER_CREATE_REQUEST_FAILED = 'user/ORGANIZER_CREATE_REQUEST_FAILED';
const ORGANIZER_CREATE_REQUEST_ENDED = 'user/ORGANIZER_CREATE_REQUEST_ENDED';

export const createOrganizer = data => (dispatch) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.address}&key=${GOOGLE_MAPS_API}`)
    .then((json) => {
      const results = json.data.results;
      if (results.length > 0) {
        return dispatch({
          [CALL_API]: {
            endpoint: '/organizers',
            method: 'POST',
            body: {
              ...data,
              ...results[0].geometry.location,
            },
            types: [ORGANIZER_CREATE_REQUEST_STARTED, ORGANIZER_CREATE_REQUEST_ENDED, ORGANIZER_CREATE_REQUEST_FAILED],
          },
        });
      }
      dispatch({
        type: ORGANIZER_CREATE_REQUEST_FAILED,
        payload: {
          success: false,
          errors: ['Error while getting the address location'],
        },
      });
    });
};

const OrganizerRecord = Record({
  _metadata: Map({
    fetching: false,
    fetched: Map({
      status: false,
      error: null,
    }),
  }),
});

const organizerState = new OrganizerRecord();

function organizerReducer(state = organizerState, action) {
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

export default function organizersReducer(state = initialState, action) {
  switch (action.type) {
    case ORGANIZER_CREATE_REQUEST_STARTED:
    case ORGANIZER_CREATE_REQUEST_FAILED:
    case ORGANIZER_CREATE_REQUEST_ENDED:
    // .setIn(['entities', action.payload.metadata], organizerReducer(state.getIn(['entities', action.payload.metadata], action)))
      return state;

    default:
      return state;
  }
}
