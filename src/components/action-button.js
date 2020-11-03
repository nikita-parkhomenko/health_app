
// outsource dependencies
import React, { useCallback } from 'react';
import { Button } from 'reactstrap';

const ActionButton = ({ text, icon, disabled, id, clicked }) => (
    <Button
        color="link"
        disabled={disabled}
        className="text-info p-0 pr-2"
        onClick={useCallback(() => clicked(id), [clicked, id])}
    >
        {icon}
        {text}
    </Button>
);

export default ActionButton;
