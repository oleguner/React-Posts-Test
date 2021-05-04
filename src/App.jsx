import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList/PostsList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { message } from './main';

import './App.css';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortedUser, setSortedUser] = useState(0);
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

  useEffect(() => {
    setSortedPosts(posts);
    setSortedUser(users);
  }, [posts, users]);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (e) => {
    const postId = Number(e.target.closest('li').dataset.postid);
    const newPosts = posts.filter(post => post.id !== postId);
    console.log(newPosts, 'delete click');
    setPosts(newPosts);
  }

  const handleSortByUser = (user) => {
    if (typeof user === 'string') {
      setSortedPosts(posts);

      return;
    } else {
      const sortedByUserName = posts.filter(post => {
        if (post.userId === user) return post;
      });

      setCurrentPage(1);
      setSortedPosts(sortedByUserName);
      setSortedUser(user);
      console.log(user);
    }
  };

  const lastPostIndexOnThePage = currentPage * postPerPage;
  const firstPostIndexOnThePage = lastPostIndexOnThePage - postPerPage;
  const displayedPosts = sortedPosts.slice(
    firstPostIndexOnThePage,
    lastPostIndexOnThePage
  );

  return (
    <>
      <Header users={users} onSorted={handleSortByUser} />
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