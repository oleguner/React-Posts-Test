import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Modal } from './Modal';
import { ModalEdit } from './ModalEdit';


import './PostsList.css';

export const PostsList = ({ posts, users, onDelete, onEdit }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [postId, setPostId] = useState();
  const [postText, setPostText] = useState();

  const handleDelete = (e) => {
    setModalDelete(true);
    const pages = document.querySelector('.pagination');
    pages.style.display = 'none';

    const postNum = Number(e.target.closest('li').dataset.postid);

    setPostId(postNum);
  }

  const handleEdit = (e) => {
    setModalEdit(true);

    const pages = document.querySelector('.pagination');
    pages.style.display = 'none';

    const text = e.target.closest('li').querySelector('p').textContent;
    const postNum = Number(e.target.closest('li').dataset.postid);
    setPostId(postNum);
    setPostText(text);
  }

  if (posts.length === 0) {
    return <div className="progress">
      <CircularProgress style={{ color: '#2B62D7' }} />
    </div>
  }

  return (
    <ul>
      {posts.map(post => (
        <li
          className="post__item"
          key={post.id}
          data-postid={post.id}
        >
          <h4 className="post__user">
            <PersonIcon />
            <span className="post__user-name">
              {users.find(user => user.id === post.userId).name}
            </span>
          </h4>
          <h3 className="post__title">{post.title}</h3>
          <p className="post__body">{post.body}</p>

          <div
            className="post__delete"
            onClick={(e) => handleDelete(e)}
          >
            <DeleteForeverIcon />
          </div>

          <div
            className="post__edit"
            onClick={(e) => handleEdit(e)}
          >
            <EditIcon />
          </div>

        </li>
      ))}
      <Modal
        active={modalDelete}
        setActive={setModalDelete}
        onDelete={onDelete}
        postId={postId}
      />
      <ModalEdit
        active={modalEdit}
        setActive={setModalEdit}
        onEdit={onEdit}
        postId={postId}
        postText={postText}
      />
    </ul>
  );
};