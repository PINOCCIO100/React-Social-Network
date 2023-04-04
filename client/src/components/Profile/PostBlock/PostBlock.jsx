import { useDispatch } from 'react-redux';
import s from './PostBlock.module.scss';

import { useCallback } from 'react';
import { createPost } from '../../../store/reducers/usersPostsReducer';
import FormikTextInput from '../../sharedComponents/FormikTextInput/FormikTextInput';
import PostPostedListContainer from './PostPostedList/PostPostedListContainer/PostPostedListContainer';


function PostBlock() {
  const dispatch = useDispatch();
  const sendPost = useCallback((post) => dispatch(createPost(post)), [dispatch])
  return (
    <div className={s.postBlock}>
      <h1 className={s.postBlock__title}>My posts</h1>
      <FormikTextInput
        className={s.postBlock__TextInput}
        handleSubmit={sendPost}
      />
      <PostPostedListContainer />
    </div>
  );
}

export default PostBlock;