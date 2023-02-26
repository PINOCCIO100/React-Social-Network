import { reqFollowStatus, reqToggleFollowUser } from "../../api/reqFollow";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { reqUsersList } from "../../api/reqUsersList";
import { setFetching, USERS_PAGE } from "../reducers/fetchingReducer";

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW';
const TOGGLE_FOLLOWING_PROCESS = 'TOGGLE-FOLLOWING-PROCESS';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_PAGE_SIZE = 'SET-PAGE-SIZE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';

let initialState = {
  users: [],
  pageSize: 5,
  currentPage: 1,
  totalUsersCount: 0,
  followingProcess: [],
}

const usersPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: action.payload.isFollow ?
          state.users.map(user => user.id !== action.payload.userID ? user : { ...user, followed: true }) :
          state.users.map(user => user.id !== action.payload.userID ? user : { ...user, followed: false }),
      };
    case TOGGLE_FOLLOWING_PROCESS:
      return {
        ...state,
        followingProcess: action.payload.isFollowingProcess ?
          [...state.followingProcess, action.payload.userID] :
          state.followingProcess.filter(id => id !== action.payload.userID)
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.payload.totalCount,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };
    default:
      return state;
  }
}


export const toggleFollow = (userID, isFollow) => ({
  type: TOGGLE_FOLLOW,
  payload: { userID, isFollow }
});
export const toggleFollowingProcess = (userID, isFollowingProcess) => ({
  type: TOGGLE_FOLLOWING_PROCESS,
  payload: { userID, isFollowingProcess }
});
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: { users }
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: { page }
});
export const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  payload: { totalCount }
});
export const setPageSize = (pageSize) => ({
  type: SET_PAGE_SIZE,
  payload: { pageSize }
});


export const getUsers = () => async (dispatch, getState) => {
  dispatch(setFetching(USERS_PAGE, true));
  // const isAuth = getState().Auth.isAuth;
  // Rus89.92@mail.ru
  // if (!isAuth) return;
  const { pageSize, currentPage } = getState().UsersPage
  const { usersList, totalCount } = await reqUsersList(pageSize, currentPage)
  dispatch(setTotalCount(totalCount));
  const avatars = reqUsersAvatar(usersList.map(p => p.id));
  for (let i = 0; i < usersList.length; i++) {
    usersList[i].photo = avatars[i];
    usersList[i].followed = await reqFollowStatus(usersList[i].id);
  }
  dispatch(setUsers(usersList));
  dispatch(setFetching(USERS_PAGE, false));
}

export const handleFollow = (userID, isFollow) => async (dispatch) => {
  dispatch(toggleFollowingProcess(userID, true));
  const res = await reqToggleFollowUser(userID, isFollow);
  if (res.resultCode === 0) {
    dispatch(toggleFollow(userID, isFollow));
    dispatch(toggleFollowingProcess(userID, false));
  }
}

export default usersPageReducer;