import { NavLink } from 'react-router-dom';
import s from './FriendCard.module.scss';

import ProfilePhoto from '../../../sharedComponents/ProfilePhoto/ProfilePhoto';
import { reqUsersAvatar } from '../../../../api/reqUsersAvatar';
import { useEffect, useState } from 'react';
import { reqUserProfileInfo } from '../../../../api/reqUserProfileInfo';

function FriendCard({ userID }) {
  // const { ProfileState: { usersProfileInfo } } = store.getState();
  // const userProfileInfo = usersProfileInfo[userID]
  const [name, setName] = useState('');
  useEffect(() => {
    reqUserProfileInfo(userID).then(user => setName(user.name))
  })
  const navLinkStyle = ({ isActive }) =>
    [(isActive ? s.active : ""), s.NavLink, 'Link'].join(" ");
  return (
    <div className={s.FriendCard}>
      <ProfilePhoto className={s.FriendCard__photo} src={reqUsersAvatar(userID)} />
      <NavLink className={navLinkStyle} to={"user/" + userID}>
        <div className={s.FriendCard__name}>{name}</div>
      </NavLink>
    </div>
  );
}

export default FriendCard;