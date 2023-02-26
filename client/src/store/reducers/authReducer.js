import Cookies from "js-cookie";
import { reqAuthStatus } from "../../api/reqAuthStatus";
import { reqAuthUser } from "../../api/reqAuthUser";
import { AUTH, setFetching } from "../reducers/fetchingReducer";

const SET_USER_DATA = 'SET-USER-DATA';
const SET_AUTH = 'SET-AUTH';

const initialState = {
  userData: {
    userID: null,
    email: null,
    login: null,
  },
  isAuth: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: { ...action.payload.userData },
      };
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    default:
      return state;
  }
}

export const setUserData = (userID, email) => ({
  type: SET_USER_DATA,
  payload: {
    userData: { userID, email }
  }
});
export const setIsAuth = (isAuth) => ({
  type: SET_AUTH,
  payload: { isAuth }
});

export const handleLogin = () => async (dispatch) => {
  dispatch(setFetching(AUTH, true));
  const res = await reqAuthStatus()
  if (res.resultCode === 0) {
    dispatch(setUserData(res.data.id, res.data.email));
    dispatch(setIsAuth(true));
  } else {
    dispatch(setIsAuth(false)); // TODO: нужно ли?
  }
  dispatch(setFetching(AUTH, false));
};
export const handleLogout = () => (dispatch) => {
  dispatch(setIsAuth(false));
  Cookies.remove('session');
};
export const submitUserData = (userData) => async (dispatch) => {
  const res = await reqAuthUser(userData);
  if (res.resultCode === 0) {
    dispatch(setIsAuth(true));
    dispatch(setUserData(res.data.id, res.data.email));
  }
};