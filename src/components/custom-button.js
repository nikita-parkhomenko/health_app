import React from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selector as usersReducer } from '../pages/private/users/reducer';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

const CustomButton = ({ sortUsers, name, filterName }) => {
    const { sortASC, sort } = useSelector(usersReducer);
    return (
        <Button
            className="text-info py-0"
            color="link"
            onClick={() => sortUsers(name)}
        >
            { sort === name && sortASC
                ? <FontAwesomeIcon transform="left-4" icon={faSortAmountDown} className="text-muted" />
                : <FontAwesomeIcon transform="left-4" icon={faSortAmountUp} className="text-muted" /> }
            <span className="font-weight-bold">{filterName}</span>
        </Button>
    )
}

export default CustomButton;
