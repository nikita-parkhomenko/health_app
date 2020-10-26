
// outsource dependencies
import React, { useCallback } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

const Paginate = (
    { activePage, itemsPerPage = 20, onChange, totalItemsCount, displayedPages = 5 }
    ) => {
    const handleChange = useCallback(value => onChange(value - 1), [onChange]);
    return (
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            onChange={handleChange}
            activePage={activePage + 1}
            totalItemsCount={totalItemsCount}
            itemsCountPerPage={itemsPerPage}
            pageRangeDisplayed={displayedPages}
            prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
            nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
            firstPageText={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            lastPageText={<FontAwesomeIcon icon={faAngleDoubleRight} />}
        />
    );
}

export default Paginate;
