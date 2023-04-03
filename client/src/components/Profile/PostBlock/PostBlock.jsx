import s from './PostBlock.module.scss';

import PostPostedListContainer from './PostPostedList/PostPostedListContainer/PostPostedListContainer';
import TextInputPostBlock from './TextInputPostBlock/TextInputPostBlock';


function PostBlock() {
  return (
    <div className={s.postBlock}>
      <h1 className={s.postBlock__title}>My posts</h1>
      <TextInputPostBlock
        className={s.postBlock__TextInput}
      />
      <PostPostedListContainer />
    </div>
  );
}

export default PostBlock;