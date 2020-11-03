
// outsource dependencies
import { Button } from 'reactstrap';
import React, { useCallback } from 'react';

const ActionButton = ({ text, icon, disabled, id, clicked }) => {
    const clickHandler = useCallback(() => clicked(id), [clicked, id]);

    return (
        <Button
            color="link"
            disabled={disabled}
            onClick={clickHandler}
            className="text-info p-0 pr-2"
        >
            {icon}
            {text}
        </Button>
    )
}

export default ActionButton;
