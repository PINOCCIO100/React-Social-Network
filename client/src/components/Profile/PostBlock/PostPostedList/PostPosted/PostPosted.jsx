import ProfilePhoto from '../../../../sharedComponents/ProfilePhoto/ProfilePhoto';
import ButtonRating from './ButtonRating/ButtonRating';
import s from './PostPosted.module.scss';

function PostPosted({ post, onLike, onDislike }) {
  return (
    <div className={s.postPosted}>
      {/* <div className={s.postPosted__userProfilePhoto}>
        <img src={post.photo} alt="postPosted__userProfilePhoto" />
      </div> */}
      < ProfilePhoto
        id={post.senderID}
        src={post.photo}
        className={s.postPosted__userProfilePhoto}
      />
      <div className={s.postPosted__msgAndBtnsCont}>
        <div className={s.postPosted__message}>
          <p>
            {post.post}
          </p>
        </div>
        <div className={s.postPosted__ratingButtons}>
          <ButtonRating
            active={post.rating.myRate === 1 ? true : false}
            like={post.rating.likes}
            action={onLike}
          />
          <ButtonRating
            active={post.rating.myRate === -1 ? true : false}
            dislike={post.rating.dislikes}
            action={onDislike}
          />
        </div>
      </div>
    </div>
  );
}

export default PostPosted;