import TextInput from '../../../sharedComponents/TextInput/TextInput';
import { setCurrentPostPosterText, publishPost } from '../../../../store/reducers/usersPostsReducer';
import { connect } from 'react-redux';

function TextInputPostsWrapper(props) {
  return (
    <TextInput
      {...props}
      getTextFromBLL={() => props.curUserPostPosterText ?? ''}
      setTextToBLL={(text) => props.setCurrentPostPosterText(text)}
      sendText={() => props.publishPost()}
      labels={{
        placeholder: 'Text your post...',
        button: 'Post',
      }}
    />
  );
}

export default connect(
  (state) => {
    const curUserID = state.ProfileState.userProfileInfo?.id;
    return {
      curUserPostPosterText: state.PostsState.usersPostPosterText[curUserID],
    }
  },
  { setCurrentPostPosterText, publishPost },
)(TextInputPostsWrapper);
