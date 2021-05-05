import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { ModalAdd } from './ModalAdd';
import { UserSelect } from './UserSelect';

import './Header.css';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    color: '#fff',
  },
}));

export const Header = ({
  users,
  onSorted,
  onSearch,
  setPostToAdd
}) => {
  const [user, setUser] = useState('All Users');
  const [searchText, setSearchText] = useState('');
  const [modalAdd, setModalAdd] = useState(false);
  const classes = useStyles();


  const handleModalAdd = () => {
    setModalAdd(true);
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
    console.log(user)
    if (user !== 'All Users') {
      const person = users.find(human => human.name === user);
      onSorted(person.id);
    } else {
      onSorted(user);
    }
  }, [user]);

  return (
    <header className="header">
      <div className="header__overlay">
        <div className="header__users">

          <UserSelect
            users={users}
            user={user}
            onUserSet={setUser}
          />

          <div className="header__search">

            <TextField
              onChange={handleSearch}
              value={searchText}
              label="Text search"
              className="text-field"
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: 'textField__label' }}
            />
          </div>

          <span id="header__message"></span>

        </div>

        <h1 className="header__title">React-Posts</h1>
        <div className="add-user" onClick={handleModalAdd}>
          <h2 className="add-user-text">Add a New Post</h2>
          <AddIcon style={{ fontSize: '2rem' }} />
        </div>
      </div>
      <ModalAdd
        active={modalAdd}
        setActive={setModalAdd}
        users={users}
        setPostToAdd={setPostToAdd}
      />
    </header>
  )
}

Header.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onSorted: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  setPostToAdd: PropTypes.func.isRequired,
}
