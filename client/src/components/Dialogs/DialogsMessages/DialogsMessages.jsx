import { useDispatch } from 'react-redux';
import FormikTextInput from '../../sharedComponents/FormikTextInput/FormikTextInput';
import styles from './DialogsMessages.module.scss';

import { useCallback } from 'react';
import { createMessage } from '../../../store/reducers/usersMessagesReducer';
import { DialogsMessagesListContainer } from './DialogsMessagesListContainer/DialogsMessagesListContainer';

export function DialogsMessages() {
  const dispatch = useDispatch();
  const sendMessage = useCallback((message) => dispatch(createMessage(message)), [dispatch]);
  return (
    <div className={styles.DialogsMessages}>
      <div className={styles.DialogsMessages__container + " scrollBar"}>
        <DialogsMessagesListContainer />
      </div>
      <FormikTextInput
        className={styles.DialogsMessages__TextInput}
        handleSubmit={sendMessage}
      />
    </div >
  );
}
