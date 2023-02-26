import s from './Header.module.scss';
import logo from './apple.png';

function Header({ isAuth, handleLogout }) {
  return (
    <header className={[s.Header, isAuth ? null : s.Header__notAuth].join(' ')}>
      <div className={s.Header__logo}>
        <img src={logo} alt="ico" />
      </div>
      {
        isAuth ?
          <div className={s.Header__logout} onClick={() => handleLogout()}>Logout</div> :
          <div className={s.Header__login}>Login</div>
      }
    </header >
  );
}

export default Header;
