import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import '../PostsList/ModalDelete.css';
import './ModalAdd.css';

import PropTypes from 'prop-types';

export const ModalAdd = ({
  active,
  setActive,
  users,
  setPostToAdd,
}) => {
  const [user, setUser] = useState('All Users');

  const canselAddPost = () => {
    document.querySelector('#post-title').value = '';
    document.querySelector('#post-body').value = '';
    setActive(false);
  }

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleAddPost = () => {
    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    if (title === '' || body === '') {
      return;
    }

    const newPost = {
      user,
      title,
      body,
    }

    setPostToAdd(newPost);

    document.querySelector('#post-title').value = '';
    document.querySelector('#post-body').value = '';
    document.querySelector('#post-select').value = 'All Users';

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
        <form autoComplete="off" className="add-post">

          <Select
            value={user}
            onChange={handleChange}
            id="post-select"
            style={{ color: '#000' }}
            defaultValue="All Users"
          >
            <MenuItem
              key={user.id}
              value="All Users"
              style={{ color: '#111827' }}
            >
              All Users
            </MenuItem>
            {users.map(user => (
              <MenuItem
                key={user.id}
                value={user.name}
                style={{ color: '#111827' }}
              >
                {user.name}
              </MenuItem>)
            )}
          </Select>

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
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

ModalAdd.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setPostToAdd: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
}
