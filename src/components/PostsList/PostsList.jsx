import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import './PostsList.css';

export const PostsList = ({ posts, users, onDelete }) => {
  if (posts.length === 0) {
    return <div className="progress">
      <CircularProgress style={{ color: '#2B62D7' }} />
    </div>
  }

  /* const handleDeleteClick = (e) => {
    const postId = e.target.closest('li').dataset.postid;
    console.log(postId, 'delete click');
  } */

  return (
    <ul>
      {posts.map(post => (
        <li
          className="post__item"
          key={post.id}
          data-postid={post.id}
        >
          <h4 className="post__user">
            <PersonIcon />
            <span className="post__user-name">
              {users.find(user => user.id === post.userId).name}
            </span>
          </h4>
          <h3 className="post__title">{post.title}</h3>
          <p className="post__body">{post.body}</p>
          <div className="post__delete" onClick={onDelete}>
            <DeleteForeverIcon />
          </div>
        </li>
      ))}
    </ul>
  );
};