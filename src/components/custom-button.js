import React from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';

import { sortDown, sortUp } from '../assets/icons';
import { selector as usersReducer } from '../pages/private/users/reducer';

const CustomButton = ({ sortUsers, filterName }) => {
    const { sortASC, sort } = useSelector(usersReducer);
    return (
        <Button
            className="text-info py-0"
            color="link"
            onClick={event => sortUsers(event)}
        >
            { sort === filterName.toLowerCase() && sortASC ? sortDown : sortUp }
            <span className="font-weight-bold">{filterName}</span>
        </Button>
    )
}

export default CustomButton;
