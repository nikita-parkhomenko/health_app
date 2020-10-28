
// outsource dependencies
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

const Paginate = ({ activePage, onChange, totalItemsCount, ...attr }) => {
    const handleChange = useCallback(value => onChange(value - 1), [onChange]);
    return <Pagination
            onChange={handleChange}
            activePage={activePage + 1}
            totalItemsCount={totalItemsCount}
            {...attr}
        />
}

Paginate.defaultProps = {
    itemClass: 'page-item',
    linkClass: 'page-link',
    itemsCountPerPage: 10,
    pageRangeDisplayed: 5,
    prevPageText: <FontAwesomeIcon icon={faAngleLeft} />,
    nextPageText: <FontAwesomeIcon icon={faAngleRight} />,
    firstPageText: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    lastPageText: <FontAwesomeIcon icon={faAngleDoubleRight} />,
}

Paginate.propTypes = {
    itemClass: PropTypes.string,
    linkClass: PropTypes.string,
    prevPageText: PropTypes.node,
    nextPageText: PropTypes.node,
    lastPageText: PropTypes.node,
    firstPageText: PropTypes.node,
    itemsCountPerPage: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    pageRangeDisplayed: PropTypes.number,
    activePage: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
}

export default Paginate;
