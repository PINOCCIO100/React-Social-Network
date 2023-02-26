import { Link } from 'react-router-dom';
import s from './Sidebar.module.scss';

// TODO: переименовать Sidebar в Navbar

function Sidebar() {
  return (
    <nav className={s.sideBar}>
      <ul>
        <li>
          <Link className={s.link + " Link"} to='/profile'>Profile</Link>
        </li>
        <li>
          <Link className={s.link + " Link"} to='/dialogs'>Messages</Link>
        </li>
        <li>
          <Link className={s.link + " Link"} to='/news'>News</Link>
        </li>
        <li>
          <Link className={s.link + " Link"} to='/music'>Music</Link>
        </li>
        <li>
          <Link className={s.link + " Link"} to='/find-users'>Find users</Link>
        </li>
        <li>
          <Link className={s.link + " Link"} to='/settings'>Settings</Link>
        </li>
      </ul>
    </nav >
  );
}

export default Sidebar;