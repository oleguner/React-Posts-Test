import React from 'react';

export const Pagination = ({
  postsPerPage,
  postsLength,
  onClick
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(postsLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button hred="#" onClick={() => onClick(number)}>
              {number}
            </button>
          </li>

        ))}
      </ul>
    </nav>
  );
};