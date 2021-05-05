import React from 'react';

import './ModalDelete.css';

import PropTypes from 'prop-types';

export const ModalDelete = ({
  active,
  setActive,
  onDelete,
  postId
}) => {
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

ModalDelete.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  postId: PropTypes.number,
}
