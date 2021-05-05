import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { ModalDelete } from './ModalDelete';
import { ModalEdit } from './ModalEdit';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import './PostsList.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const PostsList = ({ posts, users, onDelete, onEdit }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [postId, setPostId] = useState();
  const [postText, setPostText] = useState();
  const classes = useStyles();

  const handleDelete = (e) => {
    setModalDelete(true);
    const pages = document.querySelector('.pagination');
    pages.style.display = 'none';

    const postNum = Number(e.target.closest('li').dataset.postid);

    setPostId(postNum);
  }

  const handleEdit = (e) => {
    setModalEdit(true);

    document.querySelector('#edit').focus();
    const pages = document.querySelector('.pagination');
    pages.style.display = 'none';

    const text = e.target.closest('li')
      .querySelector('.post__body').textContent;

    const postNum = Number(e.target.closest('li').dataset.postid);

    console.log(postNum, text);

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

          <Card className={classes.root}>
            <CardContent>

              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                <span className="post__user">
                  <PersonIcon />
                  <span className="post__user-name">
                    {users.find(user => user.id === post.userId).name}
                  </span>
                </span>
              </Typography>

              <Typography variant="h5" component="h2">
                <span className="post__title">{post.title}</span>
              </Typography>

              <Typography variant="body2" component="p">
                <span className="post__body">{post.body}</span>
              </Typography>

            </CardContent>
            <CardActions>
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
            </CardActions>
          </Card>

        </li>))}

      <ModalDelete
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