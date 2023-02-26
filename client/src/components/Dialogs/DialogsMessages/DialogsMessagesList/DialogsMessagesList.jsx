import DialogsText from '../DialogsText/DialogsText';
import s from './DialogsMessagesList.module.scss';

function DialogsMessagesList({ myProfile, companionProfile, curUserMessages }) {
  let key = Date.now();
  return (
    <div className={s.DialogsMessagesList + ' scrollBar'}>
      {
        curUserMessages.map(mes => {
          const messageAttributes = {
            my: myProfile.id === mes.senderID,
            message: mes.message,
            userProfileInfo: myProfile.id === mes.senderID ? myProfile : companionProfile,
          }
          return <DialogsText key={key++} messageAttributes={messageAttributes} />
        })
      }
    </div>
  );
}

export default DialogsMessagesList;