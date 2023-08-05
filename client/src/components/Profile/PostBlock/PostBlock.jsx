import { useDispatch } from 'react-redux';
import styles from './PostBlock.module.scss';

import { useCallback } from 'react';
import { createPost } from '../../../store/reducers/usersPostsReducer';
import FormikTextInput from '../../sharedComponents/FormikTextInput/FormikTextInput';
import PostPostedListContainer from './PostPostedList/PostPostedListContainer';


function PostBlock() {
  const dispatch = useDispatch();
  const sendPost = useCallback((post) => dispatch(createPost(post)), [dispatch])
  return (
    <div className={styles.postBlock}>
      <h1 className={styles.postBlock__title}>My posts</h1>
      <FormikTextInput
        className={styles.postBlock__TextInput}
        handleSubmit={sendPost}
      />
      <PostPostedListContainer />
    </div>
  );
}

export default PostBlock;