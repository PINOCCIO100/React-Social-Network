import ProfilePhoto from '../../../sharedComponents/ProfilePhoto/ProfilePhoto';
import s from './UserInfoCard.module.scss';

function UserInfoCard({ user, isFollowingProcess, handleFollow }) {
  return (
    <div className={s.UserInfoCard}>
      <div className={s.UserInfoCard__container}>
        <div className={s.UserInfoCard__column}>
          <ProfilePhoto
            src={user.photo}
            className={s.UserInfoCard__photo}
            id={user.id}
          />
          <button
            disabled={isFollowingProcess}
            onClick={() => handleFollow(user.id, !user.followed)}
            className={[s.UserInfoCard__followButton, user.followed ? s.unfollow : s.follow].join(' ')}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
        <div className={s.UserInfoCard__column}>
          <div className={s.UserInfoCard__info}>
            <h2 className={s.UserInfoCard__name}>{user.name}</h2>
            <div className={s.UserInfoCard__status}>{user.website}</div>
            <div className={s.UserInfoCard__city}>{user.address.city}</div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserInfoCard;