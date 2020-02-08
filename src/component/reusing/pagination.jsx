import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {

  const { pageSize, itemCount, currentPage, onPageChange} = props;
  const pageCount = Math.ceil(itemCount / pageSize); 

  if (pageCount === 1) return null;
  // make a array using lodash, lodash didn,t include the last that's why we have to add 1
  const pages = _.range(1, pageCount + 1);

  return ( 
    <nav aria-label="Page navigation example">
      <ul className="pagination  pagination-lg">
        {pages.map(page => (
          <li className={ currentPage === page ? 'page-item active' : 'page-item'} key={page} ><a className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>
        ))}
      </ul>
    </nav>
  );
};

// type checking
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired, 
  itemCount: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;

