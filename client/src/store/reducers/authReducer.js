import Cookies from "js-cookie";
import { reqAuthStatus } from "../../api/reqAuthStatus";
import { reqAuthUser } from "../../api/reqAuthUser";
import { AUTH, setFetching } from "../reducers/fetchingReducer";

const SET_USER_DATA = 'SET-USER-DATA';
const SET_AUTH = 'SET-AUTH';

const initialState = {
  id: null,
  email: null,
  name: null,
  isAuth: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
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

export const setUserData = (id, email, name, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, name, isAuth }
});
export const setIsAuth = (isAuth) => ({
  type: SET_AUTH,
  payload: { isAuth }
});

export const handleAuthStatus = () => async (dispatch) => {
  dispatch(setFetching(AUTH, true));
  const res = await reqAuthStatus()
  if (res.resultCode === 0) {
    dispatch(setUserData(
      res.data.id,
      res.data.email,
      res.data.name,
      true
    ));
  }
  dispatch(setFetching(AUTH, false));
};
export const handleLogout = () => (dispatch) => {
  dispatch(setUserData(null, null, null, false))
  Cookies.remove('session');
};
export const handleLogin = ({ email, password, rememberMe }) => async (dispatch) => {
  const res = await reqAuthUser({ email, password, rememberMe });
  if (res.resultCode === 0) {
    dispatch(handleAuthStatus())
  }
};