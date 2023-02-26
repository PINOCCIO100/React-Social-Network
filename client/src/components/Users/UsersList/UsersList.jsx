import React from 'react';
import s from './UsersList.module.scss';

import UserInfoCard from './UserInfoCard/UserInfoCard';

let key = Date.now();

const UsersList = (props) => {
  return (
    < div className={s.UsersList} >
      <div className={s.UserList__users + " scrollBar"}>
        {
          props.users.map(user => {
            return (
              <UserInfoCard
                key={key++}
                user={user}
                isFollowingProcess={props.followingProcess.some(id => id === user.id)}
                handleFollow={props.handleFollow}
              />
            )
          })
        }
      </div>
    </div >
  )
}

export default UsersList;
