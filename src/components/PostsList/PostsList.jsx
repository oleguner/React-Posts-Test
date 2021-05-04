import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';

import './PostsList.css';

export const PostsList = ({ posts, users }) => {
  if (posts.length === 0) {
    return <div className="progress">
      <CircularProgress style={{ color: '#2B62D7' }} />
    </div>
  }

  return (
    <ul>
      {posts.map(post => (
        <li className="list__item" key={post.id}>
          <h4 className="list__user">
            <PersonIcon />
            <span className="list__user-name">
              {users.find(user => user.id === post.userId).name}
            </span>
          </h4>
          <h3 className="list__title">{post.title}</h3>
          <p className="list__body">{post.body}</p>
        </li>
      ))}
    </ul>
  );
};