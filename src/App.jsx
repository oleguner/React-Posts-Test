import React, { useState, useEffect, useCallback } from 'react';
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
    window.localStorage.setItem('posts', JSON.stringify(posts))
    setSortedPosts(posts);
    handleSortByUser();
  }, [posts, selectedUser]);

  const handleAddPost = (obj) => {
    const userObj = users.find(user =>user.name === obj.user);
    const allId = [];

    for (let i = 0; i < posts.length; i++) {
      allId.push(posts[i].id);
    }

    allId.sort((first, next) => first < next);
    const newPostId = allId[allId.length - 1] + 1;

    const newPost = {
      userId: userObj.id,
      id: newPostId,
      title: obj.title,
      body: obj.body,
    }

    setPosts([...posts, newPost])
  }

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortByUser = useCallback(() => {
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
  }, [posts, selectedUser]);

  const handleSearch = useCallback((text) => {
    if (document.querySelector('.warning')) {
      document.querySelector('.warning').remove();
    }

    const lowerCaseText = text.toLowerCase();

    const sortedBySearch = posts.filter(post =>
      post.body.includes(lowerCaseText)
      || post.title.includes(lowerCaseText));

    setSortedPosts(sortedBySearch);
    if (currentPage > Math.ceil(sortedBySearch.length / postPerPage)) {
      setCurrentPage(Math.trunc(sortedBySearch.length / postPerPage));
    }

    if (sortedBySearch.length === 0) {

      const zeroFound = document.createElement('div');
      const main = document.querySelector('main');

      zeroFound.className = 'warning';
      main.append(zeroFound);
      setCurrentPage(1);
    }
  }, [posts, postPerPage]);

  const handleDeleteClick = (id) => {
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
  };

  const handleEdit = (text, id) => {
    const editedPost = posts.find(post => post.id === id);
    editedPost.body = text;
    posts.splice(id - 1, 1, editedPost);
    setPosts(posts);
    window.localStorage.setItem('posts', JSON.stringify(posts))
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
        setPostToAdd={handleAddPost}
      />
      <main id="main__block">
        <PostsList
          posts={displayedPosts}
          users={users}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
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