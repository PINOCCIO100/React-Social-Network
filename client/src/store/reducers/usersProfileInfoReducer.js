import { reqUserProfileInfo } from "../../api/reqUserProfileInfo";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { reqCreateStatus } from "../../api/reqUserStatus";
import { PROFILE_INFO, setFetching } from "../reducers/fetchingReducer";

const SET_STATUS = 'SET-STATUS';
const SET_CURRENT_USER_ID = 'SET-CURRENT-USER-ID';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
  currentUserID: null,
  userProfileInfo: null,
}

const usersProfileInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserID: action.payload.userID,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfileInfo: action.payload.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        userProfileInfo: {
          ...state.userProfileInfo,
          status: action.payload.text,
        },
      };

    default:
      return state
  }
}

export const setCurrentUserID = (userID) => ({
  type: SET_CURRENT_USER_ID,
  payload: { userID },
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  payload: { profile },
});
export const setStatus = (text) => ({
  type: SET_STATUS,
  payload: { text },
});


export const getUserProfileInfo = (userID) => async (dispatch, getState) => {
  if (!getState().Auth.isAuth) return //TODO: Нужно зарефакторить 
  const res = await reqUserProfileInfo(userID);
  dispatch(setUserProfile({
    ...res,
    photo: reqUsersAvatar(userID)
  }));
  dispatch(setFetching(PROFILE_INFO, false));
}

export const setStatusThunk = (text) => async (dispatch) => {
  const res = await reqCreateStatus(text);
  if (res.resultCode === 0) {
    dispatch(setStatus(text));
  }
}

export const resetProfile = () => (dispatch) => {
  dispatch(setUserProfile(null))
  dispatch(setFetching(PROFILE_INFO, true));
}

export default usersProfileInfoReducer

