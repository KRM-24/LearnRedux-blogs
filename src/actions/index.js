import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  
  // // same thing as the chained call below
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  // using lodash 'chain'
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// // using lodash's memoize function to ensure network request only gets called once...ever...
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// // using explicit function convention but example to show it doesn't work
// export const fetchUser = function(id) { 
//   return _.memoize(async function(dispatch) {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
//   });
// };
