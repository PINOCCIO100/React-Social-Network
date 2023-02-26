import { connect } from 'react-redux';
import { useEffect } from 'react';

import UsersList from './UsersList';
import Preloader from '../../sharedComponents/Preloader/Preloader';

import { getUsers } from '../../../store/reducers/usersPageReducer';
import { handleFollow } from '../../../store/reducers/usersPageReducer';
import { compose } from 'redux';
import { USERS_PAGE } from '../../../store/reducers/fetchingReducer';

function UsersListContainer(props) {
  useEffect(() => {
    props.getUsers()
    // eslint-disable-next-line 
  }, [props.getUsers])
  return (
    props.isFetching ?
      <Preloader /> :
      <UsersList
        users={props.users}
        followingProcess={props.followingProcess}
        handleFollow={props.handleFollow}
      />
  );
}

export default compose(
  connect(
    (state) => ({
      isFetching: state.FetchingState[USERS_PAGE],
      followingProcess: state.UsersPage.followingProcess,
      users: state.UsersPage.users,
    }),
    {
      getUsers,
      handleFollow
    }
  ),
)(UsersListContainer);
