import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './ModalEdit.css';

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#111827 !important"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#111827 !important"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#111827 !important"
    },
  }
});

export const ModalEdit = ({ active,
  setActive,
  onEdit,
  postId,
  postText
}) => {
  const classes = useStyles();
  const [ postBody, setPostBody ] = useState();

  const canselModalWindow = () => {
    const pages = document.querySelector('.pagination');
    pages.style.display = 'flex';
    setActive(false);
  }

  const handleModalWindow = (clickEvent) => {
    clickEvent.stopPropagation();
  }

  const handleEdit = (e) => {
    if (e.key === 'Enter') {
      onEdit(postBody, postId);
      setActive(false);
    }
    if (e.key === 'Escape' || e.key === 'Esc') {
      console.log('escape')
      setActive(false);
    }
    const pages = document.querySelector('.pagination');
    pages.style.display = 'flex';
  }

  return (
    <div
      className={active ? "modal active" : 'modal'}
      onClick={canselModalWindow}
    >
      <div className="modal__content" onClick={handleModalWindow}>
        <TextField
          className={classes.root}
          rows={3}
          multiline={true}
          value={postBody}
          defaultValue={postText}
          onKeyDown={handleEdit}
          onChange={(e) => setPostBody(e.target.value)}
          variant="outlined"
          label="Post changes"
          fullWidth
          rows="10"
        />
        <div className="modal__buttons"></div>
      </div>
    </div>
  );
};
