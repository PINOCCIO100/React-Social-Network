import s from './ButtonRating.module.scss';

function ButtonRating({ like, dislike, action, active }) {
  let ratingType, votes;
  if (like !== undefined) {
    ratingType = s.btnLike
    votes = like;
  } else {
    ratingType = s.btnDislike;
    votes = dislike;
  }

  return (
    <div className={s.ButtonRating}>
      <button
        onClick={action}
        className={[ratingType, active ? s.active : null].join(' ')}>
        {(like !== undefined ? "Like" : "Dislike")}{votes > 0 ? <span>{votes}</span> : ""}</button>
    </div>
  );
}


export default ButtonRating;