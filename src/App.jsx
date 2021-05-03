import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);

  const getPosts = async () => {
    const posts = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json').then(resp => resp.json());
    const users = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json').then(resp => resp.json());

    const retrieveAll = async function() {
      const result = await Promise.all([posts, users]);
      console.log(result);
      setPosts(result[0]);
      setPosts(result[1]);
    };

    retrieveAll();
  }

  useEffect(() => {
    getPosts()
  }, []);

  const handleClick = (page) => {
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
