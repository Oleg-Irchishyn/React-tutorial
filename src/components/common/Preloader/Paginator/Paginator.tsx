import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

type PropTypes = {
  totalUsersCount: number;
  pageSize: number;
  onPageChanged?: (pageNumber: number) => void;
  currentPage?: number;
  portionSize?: number;
};

let Paginator: React.FC<PropTypes> = ({
  totalUsersCount,
  pageSize,
  onPageChanged = () => {},
  currentPage = 1,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState<number>(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={cn(styles.paginationWrapper)}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          Prev
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p, index) => {
          return (
            <span
              key={index}
              className={cn(currentPage === p && styles.selectedPage)}
              onClick={(e) => {
                onPageChanged(p);
              }}>
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
