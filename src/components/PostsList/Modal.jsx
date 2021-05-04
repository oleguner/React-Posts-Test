import React from 'react';

import './Modal.css';

export const Modal = ({ active, setActive, onDelete, postId }) => {
  const canselModalWindow = () => {
    const pages = document.querySelector('.pagination');
    pages.style.display = 'flex';
    setActive(false);
  }

  const deletePost = () => {
    setActive(false);
    onDelete(postId);
    canselModalWindow();
  }


  const handleModalWindow = (clickEvent) => {
    clickEvent.stopPropagation();
  }

  return (
    <div
      className={active ? "modal active" : 'modal'}
      onClick={canselModalWindow}
    >
      <div className="modal__content" onClick={handleModalWindow}>
        Are you sure to delete the post?
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__yes"
            onClick={deletePost}
          >
            Yes
          </button>
          <button
            type="button"
            className="modal__no"
            onClick={canselModalWindow}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};