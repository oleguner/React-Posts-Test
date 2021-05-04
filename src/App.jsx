import React, { useState, useEffect, useMemo } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { message } from './main';

import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
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
      setSortedPosts(posts);
    } else {
      getPosts();
    }
  }, []);

  useEffect(() => {
    setSortedPosts(posts);
    handleSortByUser();
  }, [posts, selectedUser]);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortByUser = () => {
    if (typeof selectedUser === 'string' || selectedUser === 0) {
      setSortedPosts(posts);

      return;
    } else {
      const sortedByUser = posts.filter(post =>
        post.userId === selectedUser);

      if (currentPage > Math.ceil(sortedByUser.length / postPerPage)) {
        setCurrentPage(Math.trunc(sortedByUser.length / postPerPage));
      }
      setSortedPosts(sortedByUser);
      setSelectedUser(selectedUser);
    };
  };

  const handleSearch = (text) => {
    const lowerCaseText = text.toLowerCase();

    const sortedBySearch = posts.filter(post =>
      post.body.includes(lowerCaseText)
      || post.title.includes(lowerCaseText));

    setSortedPosts(sortedBySearch);

    if (currentPage > Math.ceil(sortedBySearch.length / postPerPage)) {
      setCurrentPage(Math.trunc(sortedBySearch.length / postPerPage));
    }
  };

  const handleDeleteClick = (id) => {
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
  };

  const lastPostIndexOnThePage = currentPage * postPerPage;
  const firstPostIndexOnThePage = lastPostIndexOnThePage - postPerPage;
  const displayedPosts = sortedPosts.slice(
    firstPostIndexOnThePage,
    lastPostIndexOnThePage
  );

  return (
    <>
      <Header
        users={users}
        onSorted={setSelectedUser}
        onSearch={handleSearch}
      />
      <main id="main__block">
        <PostsList
          posts={displayedPosts}
          users={users}
          onDelete={handleDeleteClick}
        />

      </main>
      <Footer
        postsPerPage={postPerPage}
        postsLength={sortedPosts.length}
        onClick={handleClick}
        page={currentPage}
      >
      </Footer>
    </>
  )
}

message();