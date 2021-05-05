import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

export const UserSelect = ({
  users,
  onUserSet,
  user,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    onUserSet(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        id="demo-simple-select-label"
        style={{ color: '#fff' }}
      >
        Users
    </InputLabel>

      <Select
        value={user}
        onChange={handleChange}
        style={{ color: '#fff' }}
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
  );
};

UserSelect.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.string.isRequired,
  onUserSet: PropTypes.func.isRequired,
}
