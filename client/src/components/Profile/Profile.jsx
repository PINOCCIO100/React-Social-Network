import s from './Profile.module.scss';
import banner from './banner.jpg';

import PostBlock from './PostBlock/PostBlock';
import UserCard from './UserCard/UserCard';

function Profile(props) {
  return (
    <div className={s.profile}>
      <div className={s.profileWrapper}>
        <div className={s.banner}>
          <img src={banner} alt="banner" />
        </div>
        <UserCard {...props} />
        <PostBlock />
      </div>
    </div>
  );
}

export default Profile;