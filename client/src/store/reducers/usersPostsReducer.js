import { reqMyVote, reqRate, reqVotes } from "../../api/reqRate";
import { reqAllUserPosts, reqPublishPost } from "../../api/reqUserPosts";
import { reqUsersAvatar } from "../../api/reqUsersAvatar";
import { POSTS, setFetching } from "./fetchingReducer";

const ADD_POST = 'ADD-POST';
const SET_POST_POSTER_TEXT = 'SET-POST-POSTER-TEXT';
const SET_USER_POSTS = 'SET-USER-POSTS';
const RATE_POST = 'RATE-POST';

let initialState = {
  usersPostPosterText: {},
  usersPosts: [],
};

const usersPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_POSTS:
      return {
        ...state,
        usersPosts: [...action.payload.posts],
      };
    case ADD_POST:
      return {
        ...state,
        usersPosts: [...state.usersPosts, action.payload.post],
      };
    case SET_POST_POSTER_TEXT:
      return {
        ...state,
        usersPostPosterText: {
          ...state.usersPostPosterText,
          [action.payload.userID]: action.payload.text,
        }
      };
    case RATE_POST:
      return {
        ...state,
        usersPosts: state.usersPosts.map(post => post._id === action.payload.postID ?
          {
            ...post, rating: {
              myRate: action.payload.myRate,
              likes: action.payload.likes,
              dislikes: action.payload.dislikes,
            }
          } : post
        )
      };
    default:
      return state;
  };
}

export const setPostPosterText = (userID, text) => ({
  type: SET_POST_POSTER_TEXT,
  payload: { userID, text },
});
export const addPost = (post) => ({
  type: ADD_POST,
  payload: { post },
});
export const setUserPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: { posts }
});
export const ratePost = (postID, myRate, likes, dislikes) => ({
  type: RATE_POST,
  payload: { postID, myRate, likes, dislikes },
});


export const getAllMyPosts = () => async (dispatch, getState) => {
  const id = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
  if (!id) return;
  dispatch(setFetching(POSTS, true));
  const posts = await reqAllUserPosts(id);
  for (let i = 0; i < posts.length; i++) {
    posts[i].photo = reqUsersAvatar(posts[i].senderID);
    const resVotes = await reqVotes(posts[i]._id);
    const resMyVotes = await reqMyVote(posts[i]._id);
    if (resVotes.resultCode === 0) {
      posts[i].rating.likes = resVotes.data.likes;
      posts[i].rating.dislikes = resVotes.data.dislikes;
    }
    if (resMyVotes.resultCode === 0) {
      posts[i].rating.myRate = resMyVotes.data.myRate;
    }
  }
  dispatch(setUserPosts(posts));
  dispatch(setFetching(POSTS, false));
};
export const createPost = (message) => async (dispatch, getState) => {
  const curUsID = getState().Auth.userData.userID;
  const id = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
  if (!id) return;
  // const message = getState().PostsState.usersPostPosterText[id];
  const res = await reqPublishPost(id, message);
  if (res.resultCode === 0) {
    dispatch(addPost({
      ...res.data,
      photo: reqUsersAvatar(curUsID)
    }));
    // dispatch(setPostPosterText(id, ''));
  }
}

export const setCurrentPostPosterText = (text) => (dispatch, getState) => {
  const userID = getState().ProfileState.userProfileInfo?.id; // TODO: DRY!!
  if (!userID) return;
  dispatch(setPostPosterText(userID, text));
};
export const ratePostThunk = (postID, rating) => async (dispatch) => {
  const res = await reqRate(postID, rating, 'post');
  if (res.resultCode === 0) {
    //TODO: заблокировать спам лайками
    dispatch(ratePost(postID, res.data.myRate, res.data.likes, res.data.dislikes));
  }
};

export default usersPostsReducer