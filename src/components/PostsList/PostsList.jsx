import React from 'react';

export const PostsList = ({ posts }) => {
  if (posts.length === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <ul>
      {posts.map(post =>(
        <li key={post.id}>{post.snippet}</li>
      ))}
    </ul>
  );
};