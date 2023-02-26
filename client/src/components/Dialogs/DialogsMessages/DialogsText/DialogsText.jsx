import s from './DialogsText.module.scss';


function DialogsText({ messageAttributes }) {
  const { my, message, userProfileInfo } = messageAttributes;
  const signOfMe = my ? s.DialogsText__My : "";
  return (
    <div className={s.DialogsText + " " + signOfMe}>
      <div className={s.DialogsText__container}>
        <div className={s.DialogsText__column}>
          <div className={s.DialogsText__item}>
            <div className={s.DialogsText__photo}>
              <img src={userProfileInfo.photo} alt="" />
            </div>
          </div>
          <div className={s.DialogsText__item}>
            <div className={s.DialogsText__name}>{userProfileInfo.name}</div>
          </div>
        </div>
        <div className={s.DialogsText__column}>
          <div className={s.DialogsText__item}>
            <div className={s.DialogsText__text}>{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogsText;