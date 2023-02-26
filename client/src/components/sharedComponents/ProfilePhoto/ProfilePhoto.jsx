import { NavLink } from 'react-router-dom';
import s from './ProfilePhoto.module.scss';

function ProfilePhoto({ src, className, id }) {
  className = typeof (className) == 'boolean' ? "" : className;
  return (
    <div className={[s.ProfilePhoto, className].join(' ')}>
      <div className={s.ProfilePhoto__container}>
        <NavLink to={`/profile/${id}`}>
          <img src={src} alt="avatar" />
        </NavLink>
      </div>
    </div>
  );
}

export default ProfilePhoto;