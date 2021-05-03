import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './PostsList.css';

export const PostsList = ({ posts }) => {
  if (posts.length === 0) {
    return <div className="progress">
      <CircularProgress style={{color: '#2B62D7'}}/>
    </div>
  }

  return (
    <ul>
      {posts.map(post => (
        <li className="list__item" key={post.id}>
          <h3 className="list__title">{post.title}</h3>
          <p className="list__body">{post.body}</p>
        </li>
      ))}
    </ul>
  );
};