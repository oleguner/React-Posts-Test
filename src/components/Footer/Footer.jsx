import React from 'react';
import { Pagination } from '../Pagination/Pagination';
import './Footer.css';

import PropTypes from 'prop-types';

export const Footer = ({
  postsPerPage,
  postsLength,
  onClick,
  page
}) => (
  <footer className="footer">
    <div className="footer__overlay">
      <Pagination
        postsPerPage={postsPerPage}
        postsLength={postsLength}
        onClick={onClick}
        page={page}
      />
    </div>
  </footer>
)

Footer.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  postsLength: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}