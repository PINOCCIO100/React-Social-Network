import s from './PostPostedList.module.scss';
import PostPosted from './PostPosted/PostPosted';

function PostPostedList(props) {
  //TODO: Разобраться почему столько ререндера
  return (
    <div className={s.postPostedList + " scrollBar"} >
      {
        props.curUserPosts.map((post) => {
          return (<PostPosted
            key={post._id}
            post={post}
            onLike={() => props.ratePostThunk(post._id, 1)}
            onDislike={() => props.ratePostThunk(post._id, -1)}
          />)
        })
      }
    </div>
  );
}

export default PostPostedList;