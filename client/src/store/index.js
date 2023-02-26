import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from "redux";

import usersMessagesReducer from './reducers/usersMessagesReducer';
import usersPostsReducer from './reducers/usersPostsReducer';
import usersProfileInfoReducer from "./reducers/usersProfileInfoReducer";
import usersPageReducer from './reducers/usersPageReducer';
import authReducer from "./reducers/authReducer";
import fetchingReducer from './reducers/fetchingReducer';
// TODO: перейти на redux-toolkit

let reducers = combineReducers({
  PostsState: usersPostsReducer,
  DialogsState: usersMessagesReducer,
  ProfileState: usersProfileInfoReducer,
  UsersPage: usersPageReducer,
  FetchingState: fetchingReducer,
  Auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// TODO: потом удалить
window.store = store

export default store;