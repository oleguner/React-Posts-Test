import React from 'react';
import { Pagination } from '../Pagination/Pagination';
import './Footer.css';

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