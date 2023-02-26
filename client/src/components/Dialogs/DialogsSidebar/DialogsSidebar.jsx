import s from './DialogsSidebar.module.scss';

import FriendCard from './FriendCard/FriendCard';

function DialogsSidebar(props) {
  const usersCards = props.usersID.map((friendID) => <FriendCard key={friendID} userID={friendID} />);
  return (
    <div className={s.DialogsSidebar}>
      <ul className={s.DialogsSidebar__container}>
        <li className={s.DialogsSidebar__item}>
          {usersCards}
        </li>
      </ul>
    </div>
  );
}

export { DialogsSidebar };