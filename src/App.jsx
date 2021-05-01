import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const getPosts = async () => {
    const response = await fetch('http://dummy.restapiexample.com/api/v1/employees')

    if (response.ok) {
      const json = await response.json();
      setPosts(json.data);
    } else {
      console.log("HTTP error: " + response.status);
    }
  }

  useEffect(() => {
    getPosts()

  }, []);

  console.log(posts, 'posts');

  return (
    <>
      <h1>React-Posts</h1>
      <PostsList posts={posts} />
    </>
  )
}
