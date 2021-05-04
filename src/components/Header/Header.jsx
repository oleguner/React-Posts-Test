import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import './Header.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    color: '#fff',
  },
  cssLabel: {
    color: "#fff",
    "&.Mui-focused": {
      color: "#fff"
    }
  },
}));

export const Header = ({ users, onSorted, onSearch }) => {
  const classes = useStyles();
  const [user, setUser] = useState('All Users');
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
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

          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: '#FFF' }}
            >
              Users
            </InputLabel>

            <Select
              value={user}
              onChange={handleChange}
              style={{ color: '#FFF' }}
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
          </FormControl>

        </div>
        <h1 className="header__title">React-Posts</h1>
        <span id="header__message"></span>
        <div className="header__search">

          <TextField
            onChange={handleSearch}
            label="Text search"
            InputProps={{ className: classes.input }}
            InputLabelProps={{ classes: { root: classes.cssLabel, } }}
          />

        </div>
      </div>
    </header>
  )
}

