import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

const LEFT_PAGE = "LEFT";
const LEFT_PAGE_DISABLE = "LEFT_DISABLE";
const RIGHT_PAGE = "RIGHT";
const RIGHT_PAGE_DISABLE = "RIGHT_DISABLE";

const FIRST_PAGE = "FIRST";
const FIRST_PAGE_DISABLE = "FIRST_DISABLE";
const LAST_PAGE = "LAST";
const LAST_PAGE_DISABLE = "LAST_DISABLE";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = props => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage,
    className
  } = props;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
    // eslint-disable-next-line
  }, [currentPage, totalRecords]);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours //  * 2 + 3;
    // const totalBlocks = totalNumbers + 2;

    // if (totalPages > totalBlocks) {
    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);

    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    const btnLeft = currentPage > 1 ? LEFT_PAGE : LEFT_PAGE_DISABLE
    const btnRight = currentPage < totalPages ? RIGHT_PAGE : RIGHT_PAGE_DISABLE

    const btnFirst = currentPage > 1 ? FIRST_PAGE : FIRST_PAGE_DISABLE
    const btnLast = currentPage < totalPages ? LAST_PAGE : LAST_PAGE_DISABLE

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [btnFirst, btnLeft, ...extraPages, ...pages, btnRight, btnLast];
        break;
      }
      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [btnFirst, btnLeft, ...pages, btnRight, btnLast];
        break;
      }
    }
    return [...pages];
    // }
    // return [FIRST_PAGE_DISABLE, LEFT_PAGE_DISABLE, ...(range(1, totalPages)), RIGHT_PAGE_DISABLE, LAST_PAGE_DISABLE];
  };

  const clickPageChanged = (e, page) => {
    e.preventDefault()
    if (page < 1 || page > totalPages || page === currentPage) {
      return
    }
    onPageChanged(page)
  }

  const pages = fetchPageNumbers() || [];

  return (
    <ul className={`pagination pagination-style-one justify-content-center ${className || 'pt-50'}`}>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE || page === LEFT_PAGE_DISABLE)
          return (
            <li key={index} className={`page-item page-arrow${page === LEFT_PAGE_DISABLE ? ' disabled' : ''}`}>
              <a
                href="#"
                className="page-link"
                aria-label="Previous"
                onClick={e => clickPageChanged(e, currentPage - 1)}
              >
                prev
                {/*<i className="m-r-10 mdi mdi-chevron-left"></i>*/}
                {/*<span aria-hidden="true">&laquo;</span>*/}
                {/*<span className="sr-only">Previous</span>*/}
              </a>
            </li>
          );

        if (page === RIGHT_PAGE || page === RIGHT_PAGE_DISABLE)
          return (
            <li key={index} className={`page-item page-arrow${page === RIGHT_PAGE_DISABLE ? ' disabled' : ''}`}>
              <a
                href="#"
                className="page-link"
                aria-label="Next"
                onClick={e => clickPageChanged(e, currentPage + 1)}
              >
                next
                {/*<i className="m-r-10 mdi mdi-chevron-right"></i>*/}
                {/*<span aria-hidden="true">&raquo;</span>*/}
                {/*<span className="sr-only">Next</span>*/}
              </a>
            </li>
          );
        if (page === FIRST_PAGE || page === FIRST_PAGE_DISABLE)
          return (
            <li key={index} className={`page-item page-arrow${page === FIRST_PAGE_DISABLE ? ' disabled' : ''}`}>
              <a
                href="#"
                className="page-link"
                aria-label="Previous"
                onClick={e => clickPageChanged(e, 1)}
              >
                first
                {/*<i className="m-r-10 mdi mdi-chevron-left"></i>*/}
                {/*<span aria-hidden="true">&laquo;</span>*/}
                {/*<span className="sr-only">Previous</span>*/}
              </a>
            </li>
          );

        if (page === LAST_PAGE || page === LAST_PAGE_DISABLE)
          return (
            <li key={index} className={`page-item page-arrow${page === LAST_PAGE_DISABLE ? ' disabled' : ''}`}>
              <a
                href="#"
                className="page-link"
                aria-label="Next"
                onClick={e => clickPageChanged(e, totalPages)}
              >
                last
                {/*<i className="m-r-10 mdi mdi-chevron-right"></i>*/}
                {/*<span aria-hidden="true">&raquo;</span>*/}
                {/*<span className="sr-only">Next</span>*/}
              </a>
            </li>
          );

        return (
          <li
            key={index}
            className={`page-item page-arrow${
              currentPage === page ? " active" : ""
            }`}
          >
            <a
              href="#"
              className="page-link"
              onClick={e => clickPageChanged(e, page)}
            >
              {page}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;

Pagination.defaultProps = {
  totalRecords: 0,
  pageLimit: 0,
  pageNeighbours: 0,
  onPageChanged: () => {},
  currentPage:0,
}

Pagination.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
  currentPage: PropTypes.number,
  className: PropTypes.string
}
