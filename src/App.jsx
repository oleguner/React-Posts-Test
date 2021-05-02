import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);

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

  const handleClick = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  const lastIndexPostOnThePage = currentPage * postPerPage;
  const firstIndexPostOnThePage = lastIndexPostOnThePage - postPerPage;
  const displayedPosts = posts.slice(firstIndexPostOnThePage, lastIndexPostOnThePage);

  return (
    <>
      <h1>React-Posts</h1>
      <PostsList posts={displayedPosts} />
      <Pagination
        postsPerPage={postPerPage}
        postsLength={posts.length}
        onClick={handleClick}
        page={currentPage}
      />
    </>
  )
}
