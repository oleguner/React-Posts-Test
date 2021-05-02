import React from 'react';
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
    if (e.target.name === 'left') {
      const pageDicriment = page - 1 >= 1 ? page - 1 : 1;
      onClick(pageDicriment);
    } else {
      const pageIncriment = page + 1 <= pageNumbers.length - 1
        ? page + 1
        : pageNumbers.length;
      onClick(pageIncriment);
    }
  }

  return (
    <nav>
      <div className="pagination">
        <button name="left" onClick={(e) => changePage(e)}>
          &#10092;
        </button>
        {pageNumbers.map((number, index) => (
          (index === 0
            || index === page - 2
            || index === page - 1
            || index === page
            || index === pageNumbers.length - 1
          ) &&
          <div key={number}>
            {(number === page - 1 && page > 3) && '...'}
            <button
              className={number === page ? 'active' : ''}
              onClick={() => {
                console.log(number, ' - number');
                console.log(page, ' - page');
                return onClick(number)
              }}>
              {number}
            </button>
            {(number === page + 1 && page < pageNumbers.length - 2) && '...'}
          </div>
        ))}
        <button name="right" onClick={(e) => changePage(e)}>
          &#10093;
        </button>
      </div>
    </nav>
  );
};