import s from './DialogsMessages.module.scss';

import { TextInputDialogsMessagesContainer } from './TextInputDialogsMessagesContainer/TextInputDialogsMessagesContainer';
import { DialogsMessagesListContainer } from './DialogsMessagesListContainer/DialogsMessagesListContainer';
import { useParams } from 'react-router-dom';

export function DialogsMessages() {
  return (
    <div className={s.DialogsMessages}>
      <div className={s.DialogsMessages__container + " scrollBar"}>
        <DialogsMessagesListContainer/>
      </div>
      <TextInputDialogsMessagesContainer
        userID={useParams().userID}
        className={s.DialogsMessages__TextInput}
      />
    </div >
  );
}
