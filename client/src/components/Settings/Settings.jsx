import s from './Settings.module.scss';

function Settings() {
  return (
    <div className={s.Settings}>
      <div className={s.Settings__wrapper}>
        <h1 className={s.Settings__title}>
          Settings
        </h1>
        <div className={s.Settings__body}>
        </div>
      </div>
    </div>
  );
}

export default Settings;