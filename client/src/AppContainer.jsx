import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { AUTH } from './store/reducers/fetchingReducer';
import { handleLogin } from './store/reducers/authReducer';

import { App } from './App';

import Preloader from './components/sharedComponents/Preloader/Preloader';

function AppContainer(props) {
  useEffect(() => {
    props.handleLogin()
  }, []);

  return props.isFetching ?
    <Preloader /> :
    <App />
}

export default connect((state) => {
  return {
    isAuth: state.Auth.isAuth,
    isFetching: state.FetchingState[AUTH],
  }
}, { handleLogin })(AppContainer)
