import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Header.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const Header = ({ users }) => {
  const classes = useStyles();
  const [user, setUser] = useState('All Users');

  console.log(user);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <header className="header">
      <div className="header__overlay">
        <div className="header__users">
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: '#FFF' }}
            >users</InputLabel>
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
        <span id="header__message">
        </span>
      </div>
    </header>
  )
}

