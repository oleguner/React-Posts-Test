import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './Pagination.css';

export const Pagination = ({
  postsPerPage,
  postsLength,
  onClick,
  page
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(postsLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (e) => {
    if (e.target.closest('button').name === 'left') {
      const pageDecrease = page - 1 >= 1 ? page - 1 : 1;
      onClick(pageDecrease);
    } else {
      const pageIncrease = page + 1 <= pageNumbers.length - 1
        ? page + 1
        : pageNumbers.length;
      onClick(pageIncrease);
    }
  }

  const renderArrowButton = (name, arrow, isDisable = false) => {
    if (isDisable) {
      return (
        <Button
          disabled
          variant="outlined"
          color="primary"
          name={name}
          onClick={(e) => changePage(e)}
          startIcon={arrow}
        >
        </Button>
      )
    }

    return (
      <Button
        variant="outlined"
        color="primary"
        name={name}
        onClick={(e) => changePage(e)}
        startIcon={arrow}
      >
      </Button>
    )
  }

  return (
    <nav>
      <div className="pagination">

        {(page === 1 &&
          renderArrowButton('left', <ArrowBackIosIcon />, true)) ||
          renderArrowButton('left', <ArrowBackIosIcon />)}

        {pageNumbers.map((number, index) => (
          (index === 0
            || index === page - 2
            || index === page - 1
            || index === page
            || index === pageNumbers.length - 1
          ) &&
          <div key={number}>
            {(number === page - 1 && page > 3) && <span>...</span>}
            <Button
              variant={number === page ? 'contained' : 'outlined'}
              color={number === page ? 'secondary' : 'primary'}
              onClick={() => onClick(number)}>
              {number}
            </Button>
            {(number === page + 1 && page < pageNumbers.length - 2) && <span>&nbsp;. . .&nbsp;</span>}
          </div>
        ))}
        {(page === pageNumbers.length &&
          renderArrowButton('right', <ArrowForwardIosIcon />, true)) ||
          renderArrowButton('right', <ArrowForwardIosIcon />)}
          }
      </div>
    </nav>
  );
};