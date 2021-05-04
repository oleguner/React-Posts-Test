import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { Pagination } from './components/Pagination/Pagination';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { message } from './main';
import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  const getPosts = async () => {
    const posts = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    ).then(resp => resp.json());
    const users = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then(resp => resp.json());

    const retrieveAll = async function () {
      const result = await Promise.all([posts, users]);
      setPosts(result[0]);
      setUsers(result[1]);
      localStorage.setItem('posts', JSON.stringify(result[0]))
      localStorage.setItem('users', JSON.stringify(result[1]))
    };

    retrieveAll();
  }

  useEffect(() => {
    if (window.localStorage.posts) {
      setPosts(JSON.parse(localStorage.posts));
      setUsers(JSON.parse(localStorage.users));
    } else {
      getPosts();
    }
  }, []);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const lastPostIndexOnThePage = currentPage * postPerPage;
  const firstPostIndexOnThePage = lastPostIndexOnThePage - postPerPage;
  const displayedPosts = posts.slice(
    firstPostIndexOnThePage,
    lastPostIndexOnThePage
  );

  return (
    <>
      <Header users={users} />
      <main id="main__block">
        <PostsList posts={displayedPosts} users={users} />

      </main>
      <Footer
        postsPerPage={postPerPage}
        postsLength={posts.length}
        onClick={handleClick}
        page={currentPage}
      >
      </Footer>
    </>
  )
}

message();