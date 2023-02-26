import { connect } from "react-redux";
import { setMessageSenderText, sendMessage } from "../../../../store/reducers/usersMessagesReducer";
import TextInput from "../../../sharedComponents/TextInput/TextInput";


function TextInputDialogsMessagesWrapper(props) {
  return (
    <TextInput
      {...props}
      getTextFromBLL={() => props.curUsersMessageSenderText ?? ''}
      setTextToBLL={(text) => props.setMessageSenderText(text)}
      sendText={() => props.sendMessage()}
      labels={{
        placeholder: 'Text your message...',
        button: 'Send',
      }}
    />
  );
}

export const TextInputDialogsMessagesContainer = connect(
  (state) => {
    const companionID = state.DialogsState.companionProfile.id;
    return {
      curUsersMessageSenderText: state.DialogsState.usersMessageSenderText[companionID],
    }
  },
  { setMessageSenderText, sendMessage },
)(TextInputDialogsMessagesWrapper);
