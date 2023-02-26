import { reqAuthStatus } from "../../api/reqAuthStatus";
import { reqSendMessage, reqUserDialog, reqUsersIDWithDialogs } from "../../api/reqUserDialogs";
import { reqUserProfileInfo } from "../../api/reqUserProfileInfo";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { DIALOGS, setFetching } from "../reducers/fetchingReducer";

const SET_MESSAGE_SENDER_TEXT = 'SET-MESSAGE-SENDER-TEXT';
const SET_USERS_WITH_DIALOGS = 'SET-USERS-WITH-DIALOGS';
const SET_MESSAGES = 'SET-MESSAGES';
const ADD_MESSAGE = 'ADD-MESSAGE';
const SET_MY_PROFILE = 'SET-MY-PROFILE';
const SET_COMPANION_PROFILE = 'SET-COMPANION-PROFILE';

let initialState = {
  usersMessageSenderText: {},
  usersMessages: [],
  usersWithDialogs: [],
  myProfile: {},
  companionProfile: {},
};

const usersMessagesReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_MESSAGE_SENDER_TEXT:
      return {
        ...state,
        usersMessageSenderText: {
          ...state.usersMessageSenderText,
          [state.companionProfile.id]: action.payload.text,
        }
      };
    case SET_USERS_WITH_DIALOGS:
      return {
        ...state,
        usersWithDialogs: [...action.payload.usersID],
      };
    case SET_MESSAGES:
      return {
        ...state,
        usersMessages: [...action.payload.messages],
      };
    case ADD_MESSAGE:
      return {
        ...state,
        usersMessages: [...state.usersMessages, action.payload.message],
      };
    case SET_MY_PROFILE:
      return {
        ...state,
        myProfile: { ...action.payload.profile }
      };
    case SET_COMPANION_PROFILE:
      return {
        ...state,
        companionProfile: { ...action.payload.profile }
      };
    default:
      return state;
  }
}


export const setMessageSenderText = (text) => ({
  type: SET_MESSAGE_SENDER_TEXT,
  payload: { text }
});
export const setUsersWithDialogs = (usersID) => ({
  type: SET_USERS_WITH_DIALOGS,
  payload: { usersID }
});
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: { messages },
});
export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: { message },
});
export const setMyProfile = (profile) => ({
  type: SET_MY_PROFILE,
  payload: { profile },
});
export const setCompanionProfile = (profile) => ({
  type: SET_COMPANION_PROFILE,
  payload: { profile },
});


export const getUsersWithDialogs = () => async (dispatch) => {
  const usersID = await reqUsersIDWithDialogs();
  dispatch(setUsersWithDialogs(usersID));
}
export const getUserDialog = (userID) => async (dispatch) => {
  dispatch(setFetching(DIALOGS, true));
  const messages = await reqUserDialog(userID);
  dispatch(setMessages(messages));
  dispatch(setFetching(DIALOGS, false));
}
export const getMyProfile = () => async (dispatch) => {
  const auth = await reqAuthStatus();
  const profile = {
    ...await reqUserProfileInfo(auth.data.id),
    photo: reqUsersAvatar(auth.data.id)
  }
  dispatch(setMyProfile(profile));
}
export const getCompanionProfile = (userID) => async (dispatch) => {
  const profile = {
    ...await reqUserProfileInfo(userID),
    photo: reqUsersAvatar(userID)
  }
  dispatch(setCompanionProfile(profile));
}
export const sendMessage = () => async (dispatch, getState) => {
  const id = getState().DialogsState.companionProfile.id;
  const text = getState().DialogsState.usersMessageSenderText[id];
  const res = await reqSendMessage(id, text);
  if (res.resultCode === 0) {
    dispatch(addMessage(res.data));
    dispatch(setMessageSenderText(''));
  }
}

export default usersMessagesReducer
