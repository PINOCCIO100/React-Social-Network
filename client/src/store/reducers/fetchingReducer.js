const initialState = {
  'AUTH': true,
  'DIALOGS': true,
  'USERS-PAGE': true,
  'PROFILE-INFO': true,
  'POSTS': true,
}

const SET_FETCHING = 'SET-FETCHING';

export const AUTH = 'AUTH';
export const DIALOGS = 'DIALOGS';
export const USERS_PAGE = 'USERS-PAGE';
export const PROFILE_INFO = 'PROFILE-INFO';
export const POSTS = 'POSTS';


export default function fetchingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FETCHING:
      return {
        ...state,
        [action.payload.event]: action.payload.isFetching,
      };
    default:
      return state;
  }
}

export const setFetching = (event, isFetching) => ({
  type: SET_FETCHING,
  payload: { event, isFetching }
});