import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './useStyles';

import './Pagination.css';

import PropTypes from 'prop-types';

export const Pagination = ({
  postsPerPage,
  postsLength,
  onClick,
  page
}) => {
  const pageNumbers = [];
  const classes = useStyles();

  for (let i = 1; i <= Math.ceil(postsLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (e) => {
    if (e.target.closest('Button').name === 'left') {
      const pageDecrease = page - 1 >= 1 ? page - 1 : 1;
      onClick(pageDecrease);
    } else {
      const pageIncrease = page + 1 <= pageNumbers.length - 1
        ? page + 1
        : pageNumbers.length;
      onClick(pageIncrease);
    }
  }

  const renderArrowButton = (name, isDisable = false) => {
    if (isDisable) {
      return (
        <Button
          disabled
          className={classes.buttonStyles}
          variant="outlined"
          color="primary"
          name={name}
          onClick={(e) => changePage(e)}
        >
          <span className={name}>&#x3009;</span>
        </Button>

      )
    }

    return (
      <Button
        variant="outlined"
        className={classes.buttonStyles}
        color="primary"
        name={name}
        onClick={(e) => changePage(e)}
      >
        <span className={name}>&#x3009;</span>
      </Button>
    )
  }

  return (

    <nav>
      <div className="pagination">

        <div className="pagination__arrow">
          {(pageNumbers.length > 0) && ((page === 1 &&
            renderArrowButton('left', true)) ||
            (renderArrowButton('left')))}
        </div>

        {pageNumbers.map((number, index) => (
          (index === 0
            || index === page - 2
            || index === page - 1
            || index === page
            || index === pageNumbers.length - 1
          ) &&
          <div key={number}>
            {(number === page - 1 && page > 3)
              && <span className="dots">&nbsp;. . .&nbsp;</span>}
            <Button
              size="small"
              className={number === page
                ? classes.buttonActive
                : classes.buttonStyles}
              variant={number === page ? 'contained' : 'outlined'}
              onClick={() => onClick(number)}>
              {number}
            </Button>
            {(number === page + 1 && page < pageNumbers.length - 2)
              && <span className="dots">&nbsp;. . .&nbsp;</span>}
          </div>
        ))}

        <div className="pagination__arrow">
          {pageNumbers.length > 0 && ((page === pageNumbers.length &&
            renderArrowButton('right', true))
            || renderArrowButton('right'))}
        </div>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  postsLength: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
