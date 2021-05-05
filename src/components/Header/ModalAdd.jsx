import React from 'react';
import { UserSelect } from './UserSelect';
import TextField from '@material-ui/core/TextField';

import '../PostsList/ModalDelete';

export const ModalAdd = ({
  active,
  setActive,
  users,
  user,
  onUserSet,
  setPostToAdd,
}) => {
  const canselAddPost = () => {
    document.querySelector('#post-title').value = '';
    document.querySelector('#post-body').value = '';
    setActive(false);
  }

  const handleAddPost = () => {
    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    const newPost = {
      user,
      title,
      body,
    }

    setPostToAdd(newPost);

    document.querySelector('#post-title').value = '';
    document.querySelector('#post-body').value = '';
    onUserSet('All Users');

    setActive(false);
  }

  return (
    <div
      className={active ? "modal active" : 'modal'}
      onClick={canselAddPost}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <span>Please, add a new post:</span>

        <UserSelect
          users={users}
          user={user}
          onUserSet={onUserSet}
          color="#000"
        />

        <TextField
          id="post-title"
          label="Title"
          required
        />

        <TextField
          id="post-body"
          label="Post"
          fullWidth
          rows="3"
          required
        />

        <div className="modal__buttons">
          <button
            type="button"
            className="modal__no"
            onClick={handleAddPost}
          >
            save
          </button>
          <button
            type="button"
            className="modal__yes"
            onClick={canselAddPost}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};